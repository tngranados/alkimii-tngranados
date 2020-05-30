<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'notes_path' }">Notes</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'users_path' }">Users</router-link>
        </li>
        <li>
          <a href="#" @click="logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("AuthStore/logout").then(response => {
        this.$router.push({ name: "login_path" });
      });
    }
  }
};
</script>
