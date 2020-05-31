const FeedbackStore = {
  namespaced: true,
  state: {
    feedbacks: []
  },
  mutations: {
    addFeedback(state, feedback) {
      state.feedbacks.push(feedback);
    },
    removeFeedback(state) {
      state.feedbacks.shift();
    }
  },
  actions: {
    feedback(context, feedback) {
      context.commit("addFeedback", feedback);
      setTimeout(() => {
        context.commit("removeFeedback");
      }, 4000);
    }
  }
};

export default FeedbackStore;
