<template>
  <div class="SidebarTabs">
    <button
      v-for="plugin in plugins"
      :key="plugin.id"
      class="tab"
      :class="{ active: plugin.id === currentPluginId }"
      @click="changePlugin(plugin)"
    >
      {{ plugin.displayName }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { PlaygroundPlugin } from "@/lib/playground";

export default Vue.extend({
  props: {
    plugins: {
      type: Array as () => PlaygroundPlugin[],
      default: () => []
    },
    currentPluginId: {
      type: String,
      default: null
    }
  },
  methods: {
    changePlugin(plugin: PlaygroundPlugin) {
      this.$store.commit("storeCurrentPlugin", plugin);
    }
  }
});
</script>

<style scoped>
.SidebarTabs {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  margin-bottom: 10px;
}

.tab {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  margin: 5px 8px;
  padding-top: 0;
  font-size: 14px;
  font-weight: 600;
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
  border-bottom: 1px solid transparent;
  transition: .3s;
}

.tab.active,
.tab:hover {
  border-bottom: 1px solid #187abf;
}
</style>
