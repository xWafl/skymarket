<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
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
      },
      mounted() {
        console.log("t");
        this.$ws.send(
          new WebSocketRequest(
            "search",
            "Enchanted Diamond",
            resp => {
              let erg = JSON.parse(resp);
              if (resp.type == "item") {
                this.aTimes = erg.map(item => item.end);
                let aPrices = erg.map(item => item.price);
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
  }
};
</script>

<style>
</style>