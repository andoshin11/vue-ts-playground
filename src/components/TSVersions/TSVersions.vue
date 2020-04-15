<template>
  <ul>
    <li
      v-for="version in allVersions"
      :key="version"
      @click="updateTSVersion(version)"
    >
      {{ version }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import { updateTSVersion } from "@/utils/router";
import { MONACO_TS_VERSIONS } from "@/const";

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state;
    },
    allVersions(): string[] {
      return MONACO_TS_VERSIONS;
    }
  },
  methods: {
    updateTSVersion(version: string) {
      const { sandbox } = this.state;
      if (!sandbox) return;
      updateTSVersion(sandbox, this.$router, version);
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
