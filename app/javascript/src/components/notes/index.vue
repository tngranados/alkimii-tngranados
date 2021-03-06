<template>
  <layout>
    <article>
      <header>
        <router-link :to="{ name: 'new_note_path' }">New note</router-link>
      </header>
      <section class="note" v-for="note in NotesStore.notes.slice().reverse()" :key="note.id">
        <h3>[{{ note.id }}] {{ note.title }}</h3>
        <p>{{ note.message }}</p>
        <footer>
          <p>
            <span>
              {{ new Date(note.created_at).toLocaleString() }}
              — {{ note.user_email }}
            </span>
            <span
              v-if="AuthStore.loggedInUser.is_admin || AuthStore.loggedInUser.id === note.user_id"
            >
              [
              <a
                v-if="AuthStore.loggedInUser.is_admin || AuthStore.loggedInUser.id === note.user_id"
                href="#"
                @click="destroy(note.id)"
              >Delete</a>
              |
              <router-link :to="{ name: 'edit_note_path', params: { id: note.id } }">Edit</router-link>]
            </span>
          </p>
          <p
            v-if="note.created_at !== note.updated_at"
          >Updated at: {{ new Date(note.updated_at).toLocaleString() }}</p>
        </footer>
        <hr />
      </section>
    </article>
  </layout>
</template>

<script>
import Layout from "../layout/layout";
import { createConsumer } from "@rails/actioncable";

const cable = createConsumer(`ws://${window.location.host}/cable`);

export default {
  components: {
    Layout
  },

  data: function() {
    return this.$store.state;
  },

  created() {
    if (
      !cable.subscriptions.subscriptions.find(
        sus => sus.identifier === '{"channel":"NotesChannel"}'
      )
    ) {
      cable.subscriptions.create(
        {
          channel: "NotesChannel"
        },
        {
          connected: function() {
            console.log("connected");
          },
          disconnected: function() {
            console.log("disconnected");
          },
          received: data => {
            if (data.type === "new") {
              this.$store.dispatch("NotesStore/cableAdd", data.note);
            } else if (data.type === "update") {
              this.$store.dispatch("NotesStore/cableUpdate", data.note);
            } else if (data.type === "destroy") {
              this.$store.dispatch("NotesStore/cableDestroy", data.note);
            }
          }
        }
      );
    }
  },

  mounted: function() {
    this.$store.dispatch("NotesStore/index");
  },

  methods: {
    destroy: function(id) {
      if (confirm("Are you sure you want to delete this note?")) {
        this.$store.dispatch("NotesStore/destroy", id).then(response => {
          this.$store.dispatch("NotesStore/index");
        });
      }
    }
  }
};
</script>
