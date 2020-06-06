<template>
  <main>
    <feedback />
    <form @submit.prevent="login" method="post">
      <fieldset>
        <legend>Login</legend>
        <label for="email">Email</label>
        <input id="email" type="text" v-model="loggedInUser.email" class="form-control" />
        <label for="password">Password</label>
        <input id="password" type="password" v-model="loggedInUser.password" class="form-control" />
        <br />
        <input
          type="submit"
          value="Log In"
          :disabled="!loggedInUser.email || !loggedInUser.password"
        />
        <span class="error login-error">{{ error }}</span>
      </fieldset>
    </form>
  </main>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.AuthStore;
  },

  mounted: function() {
    if (this.$store.getters["AuthStore/loggedIn"]) {
      this.$router.push({ name: "notes_path" });
    } else {
      this.$store
        .dispatch("AuthStore/checkAuth")
        .then(res => this.$router.push({ name: "notes_path" }));
    }
  },

  methods: {
    login: function() {
      this.$store
        .dispatch("AuthStore/login", this.loggedInUser)
        .then(response => {
          this.$router.push({ name: "notes_path" });
        });
    }
  }
};
</script>
