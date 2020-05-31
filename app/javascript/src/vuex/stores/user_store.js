import showErrors from "../../helpers/showErrors";
import axios from "axios";

const UserStore = {
  namespaced: true,
  state: {
    users: [],
    user: {},
    errors: {},
    progress: ""
  },
  mutations: {
    one(state, user) {
      state.errors = {};
      state.user = user;
      return state;
    },
    many(state, res) {
      state.users = res.data.users;
      return state;
    },
    progress(state, step) {
      state.progress = step;
      return state.progress;
    },
    errors(state, data) {
      state.errors = showErrors(data);
      return state.errors;
    }
  },
  actions: {
    index(context) {
      axios({
        url: "/api/users",
        method: "get"
      })
        .then(res => context.commit("many", res))
        .catch(e => {
          context.dispatch(
            "FeedbackStore/feedback",
            {
              variant: "error",
              title: "Failed to get users",
              message: e.response.data.error ?? e
            },
            { root: true }
          );
        });
    },
    new(context) {
      context.commit("one", {});
    },
    create(context, form) {
      context.commit("progress", "loading");
      return new Promise((resolve, reject) => {
        axios({
          url: "/api/users",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: { user: form }
        })
          .then(res => {
            context.commit("progress", "success");
            resolve(res);
          })
          .catch(e => {
            context.commit("progress", "failed");
            context.commit("errors", e);
            reject(e);
          });
      });
    },
    edit(context, id) {
      const user = {
        ...context.state.users.find(u => {
          return u.id === id;
        })
      };
      if (user.id) {
        context.commit("one", user);
      } else {
        axios({
          url: `/api/users/${id}/edit`,
          method: "get"
        }).then(res => {
          context.commit("one", res.data.user);
        });
      }
    },
    update(context, user) {
      context.commit("progress", "loading");
      return new Promise((resolve, reject) => {
        axios({
          url: `/api/users/${user.id}`,
          method: "put",
          headers: { "Content-Type": "application/json" },
          data: {
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
            is_admin: user.is_admin
          }
        })
          .then(res => {
            context.commit("progress", "success");
            resolve(res);
          })
          .catch(e => {
            context.commit("progress", "failed");
            context.commit("errors", e);
            reject(e);
          });
      });
    },
    destroy(context, id) {
      axios({
        url: `/api/users/${id}`,
        method: "delete"
      });
    }
  }
};

export default UserStore;
