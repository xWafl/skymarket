import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import Home from "../views/Home.vue";
import Dictionary from "../views/Dictionary.vue";

Vue.use(IonicVueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/reference/",
    name: "reference",
    component: Dictionary,
  }
];

const router = new IonicVueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
