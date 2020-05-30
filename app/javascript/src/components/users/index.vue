<template>
  <layout>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Created at</th>
          <th>Email</th>
          <th>Admin</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in UserStore.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ new Date(user.created_at).toLocaleString() }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.is_admin }}</td>
          <td>
            <a
              v-if="AuthStore.loggedInUser.is_admin || AuthStore.loggedInUser.id === user.id"
              href="#"
              @click="destroy(user.id)"
            >×</a>
          </td>
          <td>
            <router-link
              v-if="AuthStore.loggedInUser.is_admin || AuthStore.loggedInUser.id === user.id"
              :to="{ name: 'edit_user_path', params: { id: user.id } }"
            >✎</router-link>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="AuthStore.loggedInUser.is_admin">
        <tr>
          <td colspan="6" align="right">
            <router-link :to="{ name: 'new_user_path' }">New user</router-link>
          </td>
        </tr>
      </tfoot>
    </table>
  </layout>
</template>

<script>
import Layout from "../layout/layout";

export default {
  components: {
    Layout
  },

  data: function() {
    return this.$store.state;
  },

  mounted: function() {
    this.$store.dispatch("UserStore/index");
  },

  methods: {
    destroy: function(id) {
      if (confirm("Are you sure you want to delete this user?")) {
        this.$store.dispatch("UserStore/destroy", id).then(response => {
          this.$store.dispatch("UserStore/index");
        });
      }
    }
  }
};
</script>
