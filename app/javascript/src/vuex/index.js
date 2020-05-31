import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";
Vue.use(Vuex);

import AuthStore from "./stores/auth_store.js";
import FeedbackStore from "./stores/feedback_store.js";
import UserStore from "./stores/user_store.js";

const store = new Vuex.Store({
  modules: {
    AuthStore,
    FeedbackStore,
    UserStore
  }
});

export default store;
