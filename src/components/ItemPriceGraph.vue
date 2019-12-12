<template>
  <div id="chartContainer"></div>
</template>

<script>
import { WebSocketRequest } from "@/utils/websocket";
import { bus } from "../main";
import { numberFormat } from 'highcharts';
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
              numberFormat(this.y,2)
            );
          }
        }
      }
    };
  },
  methods: {
    getChartData(sSearch) {
      this.chart.showLoading();
      this.$ws.send(
        new WebSocketRequest(
          "itemDetails",
          JSON.stringify({
            name: sSearch,
            start: Math.round(this.fetchspan / 1000)
          }),
          resp => {
            if (resp.type == "item") {
              let data = JSON.parse(resp.data);
              data.map(item => new Date(item.end));
              data = data.sort((a, b) => {
                return a.end > b.end ? 1 : -1;
              });
              let nPriceSum = 0;
              this.chart.setTitle({ text: this.item_name + " price graph" });
              this.chart.xAxis[0].setCategories(data.map(item => item.end));
              this.chart.series[0].setData(
                data.map(item => {
                  nPriceSum += item.price;
                  return item.price;
                })
              );
              bus.$emit("average_item_price_updated", nPriceSum/data.length);
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
    bus.$on("initialize-fetchspan", fetchspan => {
      this.fetchspan = fetchspan;
    });
  }
};
</script>

<style>
/* style */
</style>