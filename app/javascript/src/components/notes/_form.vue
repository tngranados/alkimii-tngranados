<template>
  <div>
    <fieldset>
      <legend>{{ legend }}</legend>
      <label for="title">Title</label>
      <aside class="error">
        <span>{{ errors.title }}</span>
      </aside>
      <input id="email" type="text" v-model="note.title" class="form-control" />
      <label for="message">Message</label>
      <aside class="error">
        <span>{{ errors.message }}</span>
      </aside>
      <textarea id="message" type="text" v-model="note.message" class="form-control" />
      <br />
      <router-link :to="{ name: 'notes_path' }">
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
    return this.$store.state.NotesStore;
  }
};
</script>
