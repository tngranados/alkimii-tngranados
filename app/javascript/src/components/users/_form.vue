<template>
  <div>
    <fieldset>
      <legend>{{ legend }}</legend>
      <label for="email">Email</label>
      <aside class="error">
        <span>{{ UserStore.errors.email }}</span>
      </aside>
      <input id="email" type="text" v-model="UserStore.user.email" class="form-control" />
      <label for="password">Password</label>
      <aside class="error">
        <span>{{ UserStore.errors.password }}</span>
      </aside>
      <input id="password" type="password" v-model="UserStore.user.password" class="form-control" />
      <label for="password-confirmation">Password confirmation</label>
      <aside class="error">
        <span>{{ UserStore.errors.password_confirmation }}</span>
      </aside>
      <input
        id="password-confirmation"
        type="password"
        v-model="UserStore.user.password_confirmation"
        class="form-control"
      />
      <aside class="error">
        <span>{{ UserStore.errors.is_admin }}</span>
      </aside>
      <label for="is-admin">
        Is Admin
        <input
          id="is-admin"
          type="checkbox"
          name="Is Admin"
          v-model="UserStore.user.is_admin"
          class="form-control"
          :disabled="!AuthStore.loggedInUser.is_admin"
        />
      </label>
      <br />
      <router-link :to="{ name: 'users_path' }">
        <button>Cancel</button>
      </router-link>
      <input type="submit" value="Save" />
    </fieldset>
  </div>
</template>

<script>
export default {
  props: ["legend"],

  data: function() {
    return this.$store.state;
  }
};
</script>
