<template>
  <div>
    <!-- Time Menu -->
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col width-25>
            <ion-button color="tertiary" expand="block">1 Day</ion-button>
          </ion-col>
          <ion-col width-25>
            <ion-button color="tertiary" expand="block">1 Week</ion-button>
          </ion-col>
          <ion-col width-25>
            <ion-button color="tertiary" expand="block">1 Month</ion-button>
          </ion-col>
          <ion-col width-25>
            <ion-button color="tertiary" expand="block">All</ion-button>
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
import ItemPriceGraph from './ItemPriceGraph.vue';
export default {
  name: "item-info",
  components: {
    ItemPriceGraph
  },
  mounted() {},
  methods: {
    switchView() {
      this.$emit("switch-view");
    }
  }
};
</script>

<style scoped>
:root {
  --ion-grid-columns: 2;
}
</style>
