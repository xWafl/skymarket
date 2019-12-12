/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  /*
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );
  */
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
      /*
      workbox.routing.registerRoute(
        /\.js$/,
        new workbox.strategies.StaleWhileRevalidate({
          cacheName: "js-cache"
        })
      );

      workbox.routing.registerRoute(
        /\.html$/,
        new workbox.strategies.StaleWhileRevalidate({
          cacheName: "html-cache"
        })
      );

      workbox.routing.registerRoute(
        /\.css$/,
        new workbox.strategies.StaleWhileRevalidate({
          cacheName: "css-cache"
        })
      );

      workbox.routing.registerRoute(
        /\.json$/,
        new workbox.strategies.StaleWhileRevalidate({
          cacheName: "json-cache"
        })
      );
      */
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
    beforeinstallprompt() {
      console.log("before install triggered");
    }
  });
}
