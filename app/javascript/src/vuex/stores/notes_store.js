import showErrors from "../../helpers/showErrors";
import axios from "axios";

const NotesStore = {
  namespaced: true,
  state: {
    notes: [],
    note: {},
    errors: {},
    progress: ""
  },
  mutations: {
    one(state, note) {
      state.errors = {};
      state.note = note;
      return state;
    },
    many(state, res) {
      state.notes = res.data.notes;
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
        url: "/api/notes",
        method: "get"
      })
        .then(res => context.commit("many", res))
        .catch(e => {
          context.dispatch(
            "FeedbackStore/feedback",
            {
              variant: "error",
              title: "Failed to get notes",
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
          url: "/api/notes",
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            note: {
              title: form.title ?? "",
              message: form.message ?? ""
            }
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
    edit(context, id) {
      const note = {
        ...context.state.notes.find(n => {
          return n.id === id;
        })
      };
      if (note.id) {
        context.commit("one", note);
      } else {
        axios({
          url: `/api/notes/${id}/edit`,
          method: "get"
        }).then(res => {
          context.commit("one", res.data.note);
        });
      }
    },
    update(context, note) {
      context.commit("progress", "loading");
      return new Promise((resolve, reject) => {
        axios({
          url: `/api/notes/${note.id}`,
          method: "put",
          headers: { "Content-Type": "application/json" },
          data: {
            title: note.title,
            message: note.message
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
        url: `/api/notes/${id}`,
        method: "delete"
      }).catch(e => {
        context.dispatch(
          "FeedbackStore/feedback",
          {
            variant: "error",
            title: "Failed to delete note",
            message: e.response.data.error ?? e
          },
          { root: true }
        );
      });
    }
  }
};

export default NotesStore;
