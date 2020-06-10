import Vue from "vue/dist/vue.esm";
import store from "../src/vuex";
import router from "../src/routes.js";
import axios from "axios";

import Header from "../src/components/layout/header";
import Feedback from "../src/components/layout/feedback";
import Login from "../src/components/home/login";
Vue.component("nav-header", Header);
Vue.component("feedback", Feedback);
Vue.component("login", Login);

// Set default axios options
axios.interceptors.request.use(function(config) {
  config.headers["X-CSRF-Token"] = document
    .querySelector("meta[name='csrf-token']")
    .getAttribute("content");

  return config;
});

const app = new Vue({
  router,
  store
}).$mount("#app");
