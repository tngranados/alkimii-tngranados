<template>
  <layout>
    <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form">
      <form-user legend="New user" />
    </form>
  </layout>
</template>

<script>
import Layout from "../layout/layout";
import FormUser from "./_form.vue";

export default {
  components: {
    layout: Layout,
    "form-user": FormUser
  },

  data: function() {
    return this.$store.state.UserStore;
  },

  mounted: function() {
    this.$store.dispatch("UserStore/new");
  },

  methods: {
    update: function() {
      this.$store.dispatch("UserStore/create", this.user).then(response => {
        this.$router.push({ name: "users_path" });
      });
    }
  }
};
</script>
