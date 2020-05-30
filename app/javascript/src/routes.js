import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import HomeIndex from "./components/home/index";
import UserIndex from "./components/users/index";
import UserEdit from "./components/users/edit";
import UserNew from "./components/users/new";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: HomeIndex, name: "root_path" },
    { path: "/users", component: UserIndex, name: "users_path" },
    { path: "/user/:id/edit", component: UserEdit, name: "edit_user_path" },
    { path: "/user/new", component: UserNew, name: "new_user_path" }
  ]
});

export default router;
