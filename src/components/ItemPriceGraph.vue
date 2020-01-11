<template>
  <div>
    <FetchspanButtons></FetchspanButtons>
    <div style="height: 60vh">
      <canvas id="priceChart"></canvas>
    </div>
    <ion-item class="ionitem">
      <ion-label class="ionlabel">Average Price</ion-label>
      <ion-badge slot="end" color="light">{{ average_price }}</ion-badge>
    </ion-item>
    <ion-item class="ionitem">
      <ion-label class="ionlabel">Average Price (no outliers)</ion-label>
      <ion-badge slot="end" color="light">{{ average_nou_display }}</ion-badge>
    </ion-item>
    <ion-item class="ionitem">
      <ion-label class="ionlabel">Growth Trend</ion-label>
      <ion-badge slot="end" style="backgroundColor: white" v-bind:style="growthTrend > 0 ? {color: 'green'} : {color: 'red'}">{{ growthTrend }}%</ion-badge>
    </ion-item>
    <ion-item class="ionitem">
      <ion-label class="ionlabel">Deviation</ion-label>
      <ion-badge slot="end" style="backgroundColor: white" v-bind:style="variance < 100 ? {color: 'green'} : {color: 'red'}">{{ variance * 2 }}%</ion-badge>
    </ion-item>
    <ion-item class="ionitem">
      <ion-label class="ionlabel">Buy Price</ion-label>
      <ion-badge slot="end" color="light">{{ buyPrice }}</ion-badge>
    </ion-item>
    <ion-item class="ionitem">
      <ion-label class="ionlabel">Sell price</ion-label>
      <ion-badge slot="end" color="light">{{ sellPrice }}</ion-badge>
    </ion-item>
    <a href="/reference/">
      <ion-item class="ionitemwide" text-center>
        <ion-label class="ionlabel">About</ion-label>
      </ion-item>
    </a>
  </div>
</template>

<style>
  @media only screen and (max-width: 699px) {
    .ionitem {
      width: 100%;
    }
  }
  @media only screen and (max-width: 1000px) {
    .ionitem {
      width: 50%;
      display: inline-block;
    }
  }
  @media only screen and (min-width: 1000px) {
    .ionitem {
      width: 33%;
      display: inline-block;
    }
  }
  .ionitemwide {
    width: 100%;
    text-align: center !important;
  }
</style>

<script>
import { WebSocketRequest } from "@/utils/websocket";
import { bus } from "../main";
import { numberFormat } from "highcharts";
import FetchspanButtons from "./FetchspanButtons";
import Chart from "chart.js";
export default {
  name: "ItemPriceGraph",
  components: {
    FetchspanButtons
  },
  data() {
    return {
      fetchspan: undefined,
      item: {},
      average_price: 0,
      average_price_blank: 0,
      average_no_outliers: 0,
      average_nou_display: 0,
      growthTrend: 0,
      variance: 0,
      buyPrice: 0,
      sellPrice: 0,
      cached_data: [],
      cached_no_outliers: [],
      priceChart: undefined
    };
  },
  mounted() {
    this.priceChart = this.createChart("priceChart", {
      type: "line",
      data: {
        datasets: [
          {
            label: "price",
            borderColor: "#22A7F0",
            fill: false
          },
          {
            label: "no outliers",
            borderColor: "#FF0000",
            fill: false
          }
        ]
      },
      options: {
        spanGaps: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Item price"
        },
        tooltips: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function(tooltipItem, data) {
              return numberFormat(tooltipItem.value, 0);
            },
            title: function(tooltipItem, data) {
              let d = new Date(tooltipItem[0].label);
              return d.toLocaleTimeString() + ", " + d.toLocaleDateString();
            }
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero: true,
              callback: function(value,index,values){
                return numberFormat(value,0);
              }
            }
          }],
          xAxes:[{
            type: 'time'
          }]
        }
      }
    });
    bus.$on("search-changed", oToSearch => {
      this.item = oToSearch;
      this.getChartData(oToSearch);
    });
    bus.$on("fetchspan-changed", newFetchspan => {
      this.fetchspan = newFetchspan;
      if (this.item) {
        this.getChartData(this.item);
      }
    });
    bus.$on("initialize-fetchspan", newFetchspan => {
      this.fetchspan = newFetchspan;
    });
  },
  methods: {
    getChartData(oToSearch) {
      let sRequestType = "";
      let oRequestBody = {};
      if (oToSearch.type !== "item") {
        return;
      }
      sRequestType = "itemPrices";
      oRequestBody.name = oToSearch.data.name;
      oRequestBody.start = Math.round(this.fetchspan / 1000);
      oRequestBody = JSON.stringify(oRequestBody);
      this.$ws.send(
        new WebSocketRequest(
          sRequestType,
          oRequestBody,
          resp => {
            if (resp.type == "itemResponse") {
              let data = JSON.parse(resp.data);
              data.map(item => new Date(item.end));
              data = data.sort((a, b) => {
                return a.end > b.end ? 1 : -1;
              });
              // console.log("Data: ");
              // console.log(data);
              this.cached_data = data;
              let nPriceSum = 0;
              this.priceChart.options.title.text = "Price for 1 " + oToSearch.data.name;
              this.priceChart.data.labels = data.map(item => item.end);
              this.priceChart.data.datasets[0].data = data.map(item => {
                nPriceSum += item.price;
                return item.price;
              });
              this.priceChart.update();
              this.average_price_blank = Math.round(nPriceSum / data.length);
              this.average_price = numberFormat(
                Math.round((nPriceSum / data.length) * 100.0) / 100.0,
                0
              );
              this.getPriceNoOutliers("regular");
              this.getVariance("regular");
              this.growthTrend = this.getGrowthTrend(oToSearch);
              if (this.variance > 100) {
                this.getVariance("outlier");
                this.getPriceNoOutliers("varied");
                this.getVariance("outlier");
              } else {
                this.getPriceNoOutliers("varied");
                this.getVariance("outlier");
              }
              this.buyPrice = this.getBuyPrice();
              this.sellPrice = this.getSellPrice();
            }
          },
          err => {
            // console.log("err callback");
            // console.log(err);
          }
        )
      );
    },
    getPriceNoOutliers(type) {
      this.cached_no_outliers = [];
      let nPriceSum = 0;
      let nItems = 0;
      let outliercap = 0;
      let outlierbottom = 0;
      if (type == "regular") {
        outliercap = this.average_price_blank * 1.5;
        outlierbottom = this.average_price_blank / 2;
        // console.log(outliercap + "|-|" + outlierbottom);
      } else if (type == "varied") {
        // console.log("Multiplier: " + (1 - (this.variance / 8)) + "|" + this.average_price_blank + "|" + ((1 - (this.variance / 8)) * this.average_price_blank));
        // console.log(this.variance);
        outliercap = (1 + (this.variance / 100 * 4)) * this.average_price_blank;
        outlierbottom = (1 - (this.variance / 100 * 6)) * this.average_price_blank;
        console.log(outliercap + "|=|" + outlierbottom + "|" + this.variance + "|" + (1 + (this.variance / 100 * 2)));
      }
      // console.log(`Outlier cap: ${outliercap}`)
      for (let item of this.cached_data) {
        if (item.price < outliercap && item.price > outlierbottom) {
          this.cached_no_outliers.push(item.price);
          nPriceSum += item.price;
          nItems++;
        } else {
          this.cached_no_outliers.push(null);
        }
      }
      // console.log(this.cached_no_outliers);
      this.priceChart.data.datasets[1].data = this.cached_no_outliers;
      this.priceChart.update();
      this.average_no_outliers = Math.round((nPriceSum / nItems) * 100.0 / 100.0, 0);
      this.average_nou_display = numberFormat(Math.round((nPriceSum / nItems) * 100.0 / 100.0, 0), 0);
    },
    getGrowthTrend(oToSearch) {
      let bsum = 0;
      for (let i = 0; i < 10; i++) {
        bsum += this.cached_no_outliers[i];
      }
      const bavg = bsum / 5; //only 5 cus we multiplying by 2
      let tsum = 0;
      let tc = 0;
      for (let i = 0; i < 10; i++) {
        tsum += this.cached_no_outliers[i];
        tc++;
      }
      const tbavg = tsum / tc;
      let esum = 0;
      for (let i = this.cached_no_outliers.length - 1; i > this.cached_no_outliers.length - 11; i--) {
        esum += this.cached_no_outliers[i];
      }
      const eavg = esum / 5; //only 5 cus we multiplying by 2
      let tesum = 0;
      let tec = 0;
      for (let i = this.cached_no_outliers.length - 1; i > this.cached_no_outliers.length - 11; i--) {
        tesum += this.cached_data[i].price;
        tec++;
      }
      const teavg = tesum / tec;
      const gt = (teavg - tbavg) / tbavg * 100;
      const displaygt = Number(gt.toString().slice(0, 4));
      return displaygt;
    },
    getVariance(type) {
      let set = [];
      if (type == "regular") {
        set = this.cached_data;
      } else {
        set = this.cached_no_outliers;
      }
      let devarr = [];
      for (let value of set) {
        if (value === null) {
          continue;
        }
        if (type == "regular") {
          // console.log(value.price + "|" + this.average_price_blank);
          let deviation = Math.pow((value.price - this.average_price_blank) / value.price, 2);
          devarr.push(deviation * 100);
        } else {
          // console.log(value + "|" + this.average_no_outliers);
          let deviation = Math.pow((value - this.average_no_outliers) / value, 2);
          devarr.push(deviation * 100);
        }
      }
      let sum = 0;
      for (let value of devarr) {
        sum += value;
      }
      // console.log(devarr);
      this.variance = Number(Math.pow((sum / devarr.length), 0.5).toFixed(2));
      return this.variance;
    },
    getBuyPrice() {
      return numberFormat((1 - (this.variance / 100)) * this.average_no_outliers, 0);
    },
    getSellPrice() {
      return numberFormat(((this.variance / 100) + 1) * this.average_no_outliers, 0);
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      return new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  }
};
</script>

<style>
/* style */
</style>