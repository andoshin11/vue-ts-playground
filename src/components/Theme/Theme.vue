<template>
  <ul>
    <li @click="setEditorTheme('sandbox')">Light</li>
    <li @click="setEditorTheme('sandbox-dark')">Dark</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state;
    }
  },
  methods: {
    setEditorTheme(theme: "sandbox" | "sandbox-dark") {
      this.$store.dispatch("setTheme", theme);
    }
  }
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 8px 0;
  padding-left: 0 !important;
}

li {
  cursor: pointer;
  transition: ease 0.3s;
  width: 100%;
  display: block;
  padding: 8px;
  white-space: nowrap;
}

li:hover {
  background-color: #8fd0fe40;
  color: #187abf;
}
</style>
