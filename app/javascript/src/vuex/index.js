import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";
Vue.use(Vuex);

import AuthStore from "./stores/auth_store.js";
import UserStore from "./stores/user_store.js";

const store = new Vuex.Store({
  modules: {
    AuthStore,
    UserStore
  }
});

export default store;
