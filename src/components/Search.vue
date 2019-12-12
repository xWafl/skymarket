<template>
  <ion-item>
    <form @submit="onSubmit($event)">
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <!-- 
                debounce: time before ionChange is fired
            -->
            <ion-searchbar
              placeholder="search item or player"
              :value="searchInput"
              debounce="100"
              @ionChange="search($event)"
            ></ion-searchbar>
          </ion-row>
          <ion-list v-if="suggestions.length > 0">
            <ion-row v-for="item in suggestions" v-bind:key="item">
              <ion-item button="true" @click="item_selected($event, item)">
                {{
                item
                }}
              </ion-item>
            </ion-row>
          </ion-list>
        </ion-grid>
      </ion-toolbar>
    </form>
  </ion-item>
</template>

<script>
import { WebSocketRequest } from "@/utils/websocket";
import { bus } from "../main";
import storedItems from "../utils/items.json";
export default {
  name: "Search",
  data() {
    return {
      searchInput: "",
      items: storedItems,
      suggestions: []
    };
  },
  mounted() {},
  methods: {
    search(e) {
      let sToSearch = e.target.value;
      if (sToSearch) {
        sToSearch = sToSearch.toLowerCase();
        var aMatches = this.items.filter(item =>
          item.toLowerCase().startsWith(sToSearch)
        );
        if (aMatches.length > 5) {
          aMatches = aMatches.slice(0, 5);
          this.suggestions = aMatches;
        } else if (aMatches.length < 5) {
          this.search_players(sToSearch, aPlayerNames => {
            if (aMatches.length + aPlayerNames.length > 5) {
              aPlayerNames = aPlayerNames.slice(0, 5 - aMatches.length);
            }
            this.suggestions = aMatches.concat(aPlayerNames);
          });
        }
      } else {
        this.suggestions = [];
      }
    },
    search_players(sSearch, callback) {
      if(sSearch.length < 3){
        callback([]);
      }
      this.$ws.send(
        new WebSocketRequest(
          "search",
          sSearch,
          resp => {
            if (resp.type == "searchResponse") {
              callback(JSON.parse(resp.data).map(sPlayer => sPlayer[0]));
            }
          },
          err => {
            console.log(err);
          }
        )
      );
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
      if (this.suggestions[0]) {
        this.item_selected(null, this.suggestions[0]);
      }
    },
    clearSearchFields() {
      this.suggestions = [];
      this.searchInput = null;
    }
  }
};
</script>
