<template>
  <div>
    <ion-card>
      <ion-item>
        <ion-label>Auktionen</ion-label>
      </ion-item>
      <ion-card-content>
        <ion-list>
          <ion-list-header>
            <ion-label>Item</ion-label>
            <ion-label>Price</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label>Diamond Sword</ion-label>
            <ion-badge slot="end" color="light">69</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Rod</ion-label>
            <ion-badge slot="end" color="light">420</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Gold Helmet</ion-label>
            <ion-badge slot="end" color="light">42</ion-badge>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-item>
        <ion-label>Gebote</ion-label>
      </ion-item>
      <ion-card-content>
        <ion-list>
          <ion-list-header>
            <ion-label>Item</ion-label>
            <ion-label>Price</ion-label>
          </ion-list-header>
          <ion-item>
            <ion-label>Diamond Sword</ion-label>
            <ion-badge slot="end" color="light">69</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Rod</ion-label>
            <ion-badge slot="end" color="light">420</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Gold Helmet</ion-label>
            <ion-badge slot="end" color="light">42</ion-badge>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <ion-col>
      <ion-button @click="switchView">Switch View</ion-button>
    </ion-col>
  </div>
</template>

<script>
export default {
  name: "player-info",
  methods: {
    switchView() {
      this.$emit("switch-view");
    }
  }
};
</script>

<style></style>
