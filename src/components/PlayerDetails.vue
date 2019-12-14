<template>
  <div>
    <ion-segment @ionChange="segmentButtonChanged($event)">
      <ion-segment-button value="auctions" checked>
        <ion-label>Auctions</ion-label>
      </ion-segment-button>
      <ion-segment-button value="bids">
        <ion-label>Bids</ion-label>
      </ion-segment-button>
    </ion-segment>
    <ion-card v-if="selectedSegmentButton == 'auctions'" class="fixedScrollBox">
      <ion-item>
        <ion-label>Auctions</ion-label>
      </ion-item>
      <ion-card-content>
        <ion-list>
          <ion-list-header>
            <ion-label>Item</ion-label>
            <ion-label>Highest Bid</ion-label>
          </ion-list-header>
          <ion-item v-for="auction in auctions" v-bind:key="auction.auctionId">
            <ion-label>{{auction.itemName}}</ion-label>
            <ion-badge slot="end" color="light">{{auction.priceFormatted}}</ion-badge>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card v-if="selectedSegmentButton == 'bids'" class="fixedScrollBox">
      <ion-item>
        <ion-label>Bids</ion-label>
      </ion-item>
      <ion-card-content>
        <ion-list>
          <ion-list-header>
            <ion-label>Item</ion-label>
            <ion-label>Own Bid</ion-label>
            <ion-label>Highest Bid</ion-label>
          </ion-list-header>
          <ion-item v-for="bid in bids" v-bind:key="bid.auctionId">
            <ion-grid>
              <ion-row style="width: 100% ">
                <ion-col>
                  <ion-label>{{bid.itemName}}</ion-label>
                </ion-col>
                <ion-col style="text-align: center">
                  <ion-badge color="light">{{bid.highestBid}}</ion-badge>
                </ion-col>
                <ion-col style="text-align: right">
                  <ion-badge color="light">{{bid.highestOwn}}</ion-badge>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import { WebSocketRequest } from "@/utils/websocket";
import { bus } from "../main";
import { numberFormat } from "highcharts";
export default {
  data() {
    return {
      auctions: [],
      bids: [],
      player: {},
      selectedSegmentButton: "auctions"
    };
  },
  mounted() {
    bus.$on("search-changed", oToSearch => {
      this.player = oToSearch;
      this.getChartData(oToSearch);
    });
  },
  methods: {
    getChartData(oToSearch) {
      let sRequestType = "";
      let oRequestBody = {};
      if (oToSearch.type !== "player") {
        return;
      }
      sRequestType = "playerDetails";
      oRequestBody = oToSearch.data.uuid;
      this.$ws.send(
        new WebSocketRequest(
          sRequestType,
          oRequestBody,
          resp => {
            if (resp.type == "playerResponse") {
              let player = JSON.parse(resp.data);
              console.log(player);
              this.auctions = player.auctions.map(auction => {
                if (auction.highestBid == 0) {
                    auction.priceFormatted = "no bid";
                } else {
                  auction.priceFormatted = numberFormat(auction.highestBid, 0);
                }
                return auction;
              });
              this.bids = player.bids;
              return;
            }
          },
          err => {
            console.log("err callback");
            console.log(err);
          }
        )
      );
    },
    segmentButtonChanged(event) {
      this.selectedSegmentButton = event.detail.value;
    }
  }
};
</script>

<style>
.fixedScrollBox {
  height: 40vh;
  overflow-y: scroll;
}
</style>