<template>
  <layout>
    <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form">
      <form-note legend="Editing note" />
    </form>
  </layout>
</template>

<script>
import Layout from "../layout/layout";
import FormNote from "./_form.vue";

export default {
  components: {
    layout: Layout,
    "form-note": FormNote
  },

  data: function() {
    return this.$store.state.NotesStore;
  },

  mounted: function() {
    this.$store.dispatch("NotesStore/edit", this.$route.params.id);
  },

  methods: {
    update: function() {
      this.$store.dispatch("NotesStore/update", this.note).then(response => {
        this.$router.push({ name: "notes_path" });
      });
    }
  }
};
</script>
