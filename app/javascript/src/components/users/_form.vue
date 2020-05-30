<template>
  <div>
    <fieldset>
      <legend>{{ legend }}</legend>
      <label for="email">Email</label>
      <aside>
        <span class="error">{{ errors.email }}</span>
      </aside>
      <input id="email" type="text" v-model="user.email" class="form-control" />
      <label for="password">Password</label>
      <aside>
        <span class="error">{{ errors.password }}</span>
      </aside>
      <input
        id="password"
        type="password"
        v-model="user.password"
        class="form-control"
      />
      <label for="password-confirmation">Password confirmation</label>
      <aside>
        <span class="error">{{ errors.password_confirmation }}</span>
      </aside>
      <input
        id="password-confirmation"
        type="password"
        v-model="user.password_confirmation"
        class="form-control"
      />
      <label for="is-admin">
        Is Admin
        <input
          id="is-admin"
          type="checkbox"
          name="Is Admin"
          v-model="user.is_admin"
          class="form-control"
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
    return this.$store.state.UserStore;
  }
};
</script>
