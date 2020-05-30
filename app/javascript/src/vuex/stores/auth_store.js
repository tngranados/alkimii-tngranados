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
      state.loggedInUser = user;
      state.error = "";
      return state;
    },
    error(state, error) {
      state.error = error;
      state.loggedInUser.password = "";
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
          data: { user }
        })
          .then(res => {
            context.commit("login", res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            resolve(res);
          })
          .catch(e => {
            if (e.response && e.response.data && e.response.data.error) {
              context.commit("error", e.response.data.error);
            } else {
              context.commit("error", "Error logging in");
            }
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
            context.commit("login", res.data);
            context.commit("login", {});
            localStorage.removeItem("user");
            resolve();
          })
          .catch(e => {
            if (e.response && e.response.data && e.response.data.error) {
              context.commit("error", e.response.data.error);
            } else {
              context.commit("error", "Error logging out");
            }
            reject(e);
          });
      });
    }
  }
};

export default AuthStore;
