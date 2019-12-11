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
              >{{ button.text }}</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>

    <!-- Diagram -->
    <ItemPriceGraph></ItemPriceGraph>

    <ion-item>
      <ion-label>Average Price</ion-label>
      <ion-badge slot="end" color="light">22</ion-badge>
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
export default {
  name: "item-info",
  components: {
    ItemPriceGraph
  },
  data() {
    return {
      buttons: [
        {
          id: 1,
          color: COLOR_CLICKED_BUTTON,
          text: "1 Day",
          isClicked: true,
          timespan: 1000 * 60 * 60 * 24
        },
        {
          id: 2,
          color: COLOR_UNCLICKED_BUTTON,
          text: "1 Week",
          isClicked: false,
          timespan: 1000 * 60 * 60 * 24 * 7
        },
        {
          id: 3,
          color: COLOR_UNCLICKED_BUTTON,
          text: "1 Month",
          isClicked: false,
          timespan: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            new Date().getDate()
          )
        },
        {
          id: 4,
          color: COLOR_UNCLICKED_BUTTON,
          text: "All Time",
          isClicked: false,
          timespan: new Date().getTime()
        }
      ]
    };
  },
  mounted() {},
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
        }
      });
    }
  }
};
</script>

<style scoped>
:root {
  --ion-grid-columns: 2;
}
</style>
