<template>
  <div>
    <!-- Time Menu -->
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col width-25 v-for="button in buttons" v-bind:key="button.id">
            <ion-button
              v-bind:color="button.color"
              expand="block"
              @click="onTimespanButton_clicked($event, button.id)"
            >{{button.text}}</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>

    <!-- Diagram -->
    <ItemPriceGraph></ItemPriceGraph>

    <ion-item>
      <ion-label>Average Price</ion-label>
      <ion-badge slot="end" color="light">{{average_price}}</ion-badge>
    </ion-item>

    <ion-col>
      <ion-button @click="switchView">Switch View</ion-button>
    </ion-col>
  </div>
</template>

<script>
const COLOR_CLICKED_BUTTON = "primary";
const COLOR_UNCLICKED_BUTTON = "tertiary";

import ItemPriceGraph from "./ItemPriceGraph.vue";
import { bus } from "../main";
import { numberFormat } from 'highcharts';
export default {
  name: "item-info",
  components: {
    ItemPriceGraph
  },
  data() {
    return {
      auction_fetchspan: undefined,
      average_price: 0,
      buttons: [
        {
          id: 1,
          color: COLOR_CLICKED_BUTTON,
          text: "1 Day",
          isClicked: true,
          fetchspan: "day"
        },
        {
          id: 2,
          color: COLOR_UNCLICKED_BUTTON,
          text: "1 Week",
          isClicked: false,
          fetchspan: "week"
        },
        {
          id: 3,
          color: COLOR_UNCLICKED_BUTTON,
          text: "1 Month",
          isClicked: false,
          fetchspan: "month"
        },
        {
          id: 4,
          color: COLOR_UNCLICKED_BUTTON,
          text: "All Time",
          isClicked: false,
          fetchspan: "all"
        }
      ]
    };
  },
  mounted() {
    // initialize ItemPriceGraph fetchspan
    this.auction_fetchspan = this.getDateForAuctionFetchFromButton("day");
    bus.$emit("initialize-fetchspan", this.auction_fetchspan);
    bus.$on("average_item_price_updated", nPrice => {
      this.average_price = numberFormat((Math.round(nPrice*100.0)/100.0),2);
    })
  },
  methods: {
    switchView() {
      this.$emit("switch-view");
    },
    onTimespanButton_clicked(e, idClickedButton) {
      this.buttons.forEach(button => {
        if (button.id != idClickedButton) {
          button.color = COLOR_UNCLICKED_BUTTON;
          button.isClicked = false;
        } else {
          button.color = COLOR_CLICKED_BUTTON;
          button.isClicked = true;
          this.auction_fetchspan = this.getDateForAuctionFetchFromButton(
            button.fetchspan
          );
        }
      });
      bus.$emit("fetchspan-changed", this.auction_fetchspan);
    },
    getDateForAuctionFetchFromButton(sFetchspan) {
      let dResult = new Date();
      switch (sFetchspan) {
        case "day":
          dResult.setUTCDate(dResult.getUTCDate() - 1);
          break;
        case "week":
          dResult.setUTCDate(dResult.getUTCDate() - 7);
          break;
        case "month":
          dResult.setUTCMonth(dResult.getUTCMonth() - 1);
          break;
        case "all":
          dResult = new Date(0);
          break;
        default:
          throw "Timespan not supported";
      }
      return dResult;
    }
  }
};
</script>

<style scoped>
:root {
  --ion-grid-columns: 2;
}
</style>
