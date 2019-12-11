<template>
  <div id="chartContainer"></div>
</template>

<script>
import { WebSocketRequest } from "@/utils/websocket";
import { bus } from "../main";
export default {
  name: "ItemPriceGraph",
  data() {
    return {
      chart: undefined,
      chartOptions: {
        chart: {
          type: "spline"
        },
        title: {
          text: "item price graph"
        },
        xAxis: {
          categories: this.aTimes,
          visible: false
        },
        series: [
          {
            name: "item price",
            data: this.aPrices
          }
        ]
      }
    };
  },
  methods: {
    getChartData(sSearch) {
      this.$ws.send(
        new WebSocketRequest(
          "itemDetails",
          JSON.stringify({
            name: sSearch,
            start: new Date(2019, 11, 1).getTime() / 1000,
            end: new Date(2019, 11, 10).getTime() / 1000
          }),
          resp => {
            let erg = JSON.parse(resp.data);
            if (erg.type == "item") {
              let data = JSON.parse(erg.data);
              this.chart.xAxis[0].setCategories(data.map(item => new Date(item.end)));
              this.chart.series[0].setData(data.map(item => item.price));
            }
          },
          err => {
            console.log("err callback");
            console.log(err);
          }
        )
      );
    }
  },
  mounted() {
    this.chart = Highcharts.chart("chartContainer", this.chartOptions);
    bus.$on("search-changed", sToSearch => {
      this.getChartData(sToSearch);
    });
  }
};
</script>

<style>
</style>