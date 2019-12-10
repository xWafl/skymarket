<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { WebSocketRequest } from "@/utils/websocket";
export default {
  name: "ItemPriceGraph",
  data() {
    return {
      aTimes: [],
      aPrices: [],
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
  mounted() {
    console.log("t");
    this.$ws.send(
      new WebSocketRequest(
        "itemDetails",
        JSON.stringify({
          name: "Cobblestone",
          start: new Date(2019, 11, 1).getTime() / 1000,
          end: new Date(2019, 11, 10).getTime() / 1000
        }),
        resp => {
          let erg = JSON.parse(resp.data);
          console.log(erg);
          if (erg.type == "item") {
            let data = JSON.parse(erg.data);
            console.log(data);
            this.aTimes = data.map(item => new Date(item.end));
            this.aPrices = data.map(item => item.price);
          }
        },
        err => {
          console.log("err callback");
          console.log(err);
        }
      )
    );
  }
};
</script>

<style>
</style>