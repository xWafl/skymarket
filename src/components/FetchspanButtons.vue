<template>
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
</template>

<script>
const COLOR_CLICKED_BUTTON = "primary";
const COLOR_UNCLICKED_BUTTON = "tertiary";
import { bus } from "../main";
export default {
  name: "FetchspanButtons",
  data() {
    return {
      fetchspan: "day",
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
    // initialize Fetchspan
    // this.$nextTick => all Children are also already mounted
    this.$nextTick(() => {
      this.fetchspan = this.getDateForAuctionFetchFromButton("day");
      bus.$emit("initialize-fetchspan", this.fetchspan);
    });
  },
  methods: {
    onTimespanButton_clicked(e, idClickedButton) {
      this.buttons.forEach(button => {
        if (button.id != idClickedButton) {
          button.color = COLOR_UNCLICKED_BUTTON;
          button.isClicked = false;
        } else {
          button.color = COLOR_CLICKED_BUTTON;
          button.isClicked = true;
          this.fetchspan = this.getDateForAuctionFetchFromButton(
            button.fetchspan
          );
          bus.$emit("fetchspan-changed", this.fetchspan);
        }
      });
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

<style>
</style>