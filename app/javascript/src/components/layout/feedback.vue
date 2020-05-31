<template>
  <aside class="feedback-list">
    <div
      :class="['feedback', feedback.variant]"
      v-for="feedback in feedbacks.slice().reverse()"
      :key="feedback.title+feedback.message"
    >
      <strong>{{ feedback.title }}</strong>
      <p>{{ feedback.message }}</p>
    </div>
  </aside>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.FeedbackStore;
  }
};
</script>
