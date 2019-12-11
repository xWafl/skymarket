import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Ionic from "@ionic/vue";
import { stringStartsWith } from "./utils/functions";
import "@ionic/core/css/ionic.bundle.css";
import HighchartsVue from 'highcharts-vue'
import { WebSocketManager, WebSocketRequest } from "./utils/websocket";

Vue.use(Ionic);
Vue.use(HighchartsVue);
Vue.config.productionTip = false;

// android / ios message pop-up
Vue.prototype.$showAlert = function showAlert(
  head: string,
  msg: string,
  btn: string[]
): void {
  return this.$ionic.alertController
    .create({
      header: head,
      message: msg,
      buttons: btn
    })
    .then((a: any) => a.present());
};

Vue.prototype.$stringStartsWith = stringStartsWith;
Vue.prototype.$ws = new WebSocketManager();


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
