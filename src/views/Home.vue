<template>
  <div class="ion-page">
    <ion-content class="ion-padding" v-if="!reference">
      <Search v-on:get-code="getCodeInfo" v-if="homeView" />
      <ItemInfo v-if="this.homeView" v-on:switch-view="swtichView" />
      <ion-item class="ionitemwide" text-center @click="reference = true">
        <ion-label class="ionlabel">About</ion-label>
      </ion-item>
    </ion-content>
    <ion-content class="ion-padding" v-if="reference">
      <DictionaryComp @clicked="reference = false" />
    </ion-content>
  </div>
</template>

<style>
  .ionitemwide {
    display: block;
  }
  .titletext {
    display: inline;
  }
  .refitemwide {
    width: 100%;
    display: block;
    text-align: center;
  }
</style>

<script>
import Search from "@/components/Search";
import ItemInfo from "@/components/ItemInfo";
import DictionaryComp from "@/components/DictionaryComp";
export default {
  name: "home",
  components: {
    Search,
    ItemInfo,
    DictionaryComp
  },
  data() {
    return {
      info: "",
      homeView: true,
      reference: false,
      headline: "Home"
    };
  },
  methods: {
    async getCodeInfo(code) {
      const res = await fetch(
        "https://api.zippopotam.us/us/" + code.toString()
      );
      if (res.status == 404) {
        this.$showAlert("Bad", "Very Bad", ["Ok"]);
      } else {
        this.info = await res.json();
      }
    },
    swtichView() {
      this.homeView = !this.homeView;
      if (this.headline === "Home") {
        this.headline = "Player";
      } else {
        this.headline = "Home";
      }
    }
  }
};
</script>
