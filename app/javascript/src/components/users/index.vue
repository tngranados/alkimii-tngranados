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
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <router-link
              :to="{ name: 'edit_user_path', params: { id: user.id } }"
              >{{ user.id }}</router-link
            >
          </td>
          <td>
            <router-link
              :to="{ name: 'edit_user_path', params: { id: user.id } }"
              >{{ user.created_at }}</router-link
            >
          </td>
          <td>
            <router-link
              :to="{ name: 'edit_user_path', params: { id: user.id } }"
              >{{ user.email }}</router-link
            >
          </td>
          <td>
            <router-link
              :to="{ name: 'edit_user_path', params: { id: user.id } }"
              >{{ user.is_admin }}</router-link
            >
          </td>
          <td>
            <a href="#" @click="destroy(user.id)">×</a>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" align="right">
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
    return this.$store.state.UserStore;
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
