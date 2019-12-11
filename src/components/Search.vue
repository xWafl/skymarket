<template>
  <ion-item>
    <form @submit="onSubmit($event)">
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col width-75>
              <!-- 
                debounce: time before ionChange is fired
              -->
              <ion-searchbar
                placeholder="search item or player"
                :value="searchInput"
                debounce=500
                @ionChange="search($event)"
              ></ion-searchbar>
            </ion-col>
          </ion-row>
          <ion-list v-if="suggestions.length > 0">
            <ion-row v-for="item in suggestions" v-bind:key="item">
              <ion-col>
                <ion-item button="true" @click="item_selected($event,item)">{{ item }}</ion-item>
              </ion-col>
            </ion-row>
          </ion-list>
        </ion-grid>
      </ion-toolbar>
    </form>
  </ion-item>
</template>

<script>
import { bus } from "../main";
export default {
  name: "Search",
  data() {
    return {
      searchInput: "",
      items: [
        "Cobblestone",
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
      let sToSearch = e.target.value;
      
      if (sToSearch != "") {
        this.suggestions = this.items.filter(item =>
          item.startsWith(sToSearch)
        );
      } else {
        this.suggestions = [];
      }
    },
    item_selected(e, item_name) {
      if (!item_name) {
        return;
      }
      this.clearSearchFields();
      bus.$emit("search-changed", item_name);
    },
    onSubmit(e) {
      e.preventDefault();
    },
    clearSearchFields() {
      this.suggestions = [];
      this.searchInput = null;
    }
  }
};
</script>
