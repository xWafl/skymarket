<template>
  <div>
    <FetchspanButtons></FetchspanButtons>
    <div id="chartContainer"></div>
    <ion-item>
      <ion-label>Average Price</ion-label>
      <ion-badge slot="end" color="light">{{average_price}}</ion-badge>
    </ion-item>
  </div>
</template>

<script>
import { WebSocketRequest } from "@/utils/websocket";
import { bus } from "../main";
import { numberFormat } from "highcharts";
import FetchspanButtons from "./FetchspanButtons";
export default {
  name: "ItemPriceGraph",
  components: {
    FetchspanButtons
  },
  data() {
    return {
      fetchspan: undefined,
      item: {},
      chart: undefined,
      average_price: 0,
      chartOptions: {
        chart: {
          type: "spline"
        },
        title: {
          text: "item price graph"
        },
        yAxis: {
          title: {
            text: "price"
          }
        },
        xAxis: {
          visible: false
        },
        series: [
          {
            name: "item price"
          }
        ],
        tooltip: {
          formatter: function() {
            let d = new Date(this.x);
            return (
              d.toLocaleTimeString() +
              ", " +
              d.toLocaleDateString() +
              "<br/>" +
              "price: " +
              numberFormat(this.y, 0)
            );
          }
        }
      }
    };
  },
  mounted() {
    this.chart = Highcharts.chart("chartContainer", this.chartOptions);
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
      this.chart.reflow();
    });
  },
  methods: {
    getChartData(oToSearch) {
      this.chart.showLoading();
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
              let nPriceSum = 0;
              this.chart.setTitle({
                text: this.item.data.name + " price graph"
              });
              this.chart.xAxis[0].setCategories(data.map(item => item.end));
              this.chart.series[0].setData(
                data.map(item => {
                  nPriceSum += item.price;
                  return item.price;
                })
              );
              this.average_price = numberFormat(
                Math.round((nPriceSum / data.length) * 100.0) / 100.0,
                0
              );
            }
            this.chart.hideLoading();
          },
          err => {
            this.chart.hideLoading();
            console.log("err callback");
            console.log(err);
          }
        )
      );
    }
  }
};
</script>

<style>
/* style */
</style>