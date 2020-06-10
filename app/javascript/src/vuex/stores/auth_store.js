import axios from "axios";

const AuthStore = {
  namespaced: true,
  state: {
    loggedInUser: {},
    error: ""
  },
  getters: {
    loggedIn: state => {
      return state.loggedInUser.email !== undefined;
    },
    loggedInUser: state => {
      return state.loggedInUser;
    }
  },
  mutations: {
    login(state, user) {
      state.loggedInUser = { ...user };
      state.error = "";
      return state;
    },
    error(state, error) {
      state.error = error;
      state.loggedInUser.password = "";
      return state;
    },
    expire(state) {
      state.loggedInUser = {};
      return state;
    }
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        axios({
          url: "/api/sign_in",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          method: "post",
          data: { user: { ...user, remember_me: true } }
        })
          .then(res => {
            context.commit("login", res.data);
            resolve(res);
          })
          .catch(e => {
            context.dispatch(
              "FeedbackStore/feedback",
              {
                variant: "error",
                title: "Login",
                message: e.response.data.error ?? e
              },
              { root: true }
            );
            reject(e);
          });
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: "/api/sign_out",
          headers: {
            Accept: "application/json"
          },
          method: "delete"
        })
          .then(res => {
            context.commit("expire");
            resolve();
          })
          .catch(e => {
            context.dispatch(
              "FeedbackStore/feedback",
              {
                variant: "error",
                title: "Logout",
                message: e.response.data.error ?? e
              },
              { root: true }
            );
            reject(e);
          });
      });
    },
    checkAuth(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/api/user/auth`,
          method: "get"
        })
          .then(res => {
            context.commit("login", res.data.user);
            resolve(res);
          })
          .catch(e => {
            context.commit("expire");
            reject(e);
          });
      });
    }
  }
};

export default AuthStore;
