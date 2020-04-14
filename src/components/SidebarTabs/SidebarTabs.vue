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
  margin: 16px 0;
}

.tab {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
  transition: .3s;
  padding: 8px 24px;
  border-radius: 0px;
  background: #F2F2F7;
  box-shadow:  8px 4px 8px #ceced2, 8px -4px 8px #ffffff;
  border-right: solid 1px rgba(0,0,0,.1);
}

.tab:first-child {
  border-radius: 4px 0 0 4px;
}

.tab:last-child {
  border-radius: 0 4px 4px 0;
  border-right: none;
}

.tab.active,
.tab:hover {
  color: #187abf;
  background: #F2F2F7;
  border-right: solid 1px transparent;
  box-shadow: 2px 2px 2px 0px #cbcbcf inset, -2px -2px 2px 0px #ffffff inset;
}

.tab:last-child.active,
.tab:last-child:hover {
  border-right: none;
}
</style>
