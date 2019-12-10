<template>
  <ion-item>
    <form @submit="onSubmit($event)">
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col width-75>
              <ion-input
                :value="inp"
                placeholder="Enter Player or Item name"
                @input="search($event)"
              ></ion-input>
            </ion-col>
          </ion-row>
          <ion-list v-if="suggestions.length > 0">
            <ion-row v-for="sug in suggestions" v-bind:key="sug">
              <ion-col>
                <ion-item>{{ sug }}</ion-item>
              </ion-col>
            </ion-row>
          </ion-list>
        </ion-grid>
      </ion-toolbar>
    </form>
  </ion-item>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      inp: "",
      items: [
        "Cobblstone",
        "Gold Helmet",
        "Diamond Sword",
        "Gold Pickaxe",
        "Gold Boots"
      ],
      suggestions: []
    };
  },
  mounted() {},
  methods: {
    search(e) {
      this.inp = e.srcElement.value;
      this.suggestions = [];
      if (this.inp.length > 0) {
        this.items.forEach(e => {
          if (this.$stringStartsWith(e, this.inp, true)) {
            this.suggestions.push(e);
          }
        });
      }
    },
    onSubmit(e) {
      e.preventDefault();
      // insert "regex".test(this.inp);
      const isValid = this.inp > 1000;
      if (!isValid) {
        this.$showAlert("Error", "Nothing found", ["Ok"]);
        this.inp = "";
      } else {
        this.$emit("get-code", this.inp);
        this.inp = "";
      }
    }
  }
};
</script>
