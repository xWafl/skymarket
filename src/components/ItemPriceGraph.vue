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
      fetchspan: undefined,
      item_name: "",
      chart: undefined,
      chartOptions: {
        chart: {
          type: "spline"
        },
        title: {
          text: "item price graph"
        },
        xAxis: {
          visible: false
        },
        series: [
          {
            name: "item price"
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
            end: fetchspan/1000
          }),
          resp => {
            if (resp.type == "item") {
              let data = JSON.parse(resp.data);
              this.chart.setTitle({ text: this.item_name + " price graph" });
              this.chart.xAxis[0].setCategories(
                data.map(item => new Date(item.end))
              );
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
      this.item_name = sToSearch;
      this.getChartData(sToSearch);
    });
    bus.$on("fetchspan-changed", fetchspan => {
      if (this.item_name && fetchspan) {
        this.fetchspan = fetchspan;
        this.getChartData(this.item_name);
      }
    });
    bus.$on("initialize-fetchspan", fetchspan =>{
      this.fetchspan = fetchspan;
    })
  }
};
</script>

<style>
/* style */
</style>