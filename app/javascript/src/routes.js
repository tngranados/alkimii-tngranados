import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router";
import store from "./vuex/index";
Vue.use(VueRouter);

import HomeIndex from "./components/home/index";
import Login from "./components/home/login";
import UserIndex from "./components/users/index";
import UserEdit from "./components/users/edit";
import UserNew from "./components/users/new";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: HomeIndex,
      name: "root_path",
      meta: {
        requiresAuth: true
      }
    },
    { path: "/login", component: Login, name: "login_path" },
    {
      path: "/users",
      component: UserIndex,
      name: "users_path",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user/:id/edit",
      component: UserEdit,
      name: "edit_user_path",
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user/new",
      component: UserNew,
      name: "new_user_path",
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if logged in, otherwise, redirect to login
    if (!store.getters["AuthStore/loggedIn"]) {
      next({ name: "login_path" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
