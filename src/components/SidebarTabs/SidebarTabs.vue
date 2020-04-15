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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: inherit;
  border: none;
  cursor: pointer;
  outline: inherit;
  transition: 0.3s;
  padding: 8px 24px;
  transition: all 0.3s cubic-bezier(0.79, 0.21, 0.06, 0.81);
  border-radius: 0px;
  background: #f2f2f7;
  box-shadow: 8px 4px 8px #ceced2, 8px -4px 8px #ffffff,
    0 0 0 0 transparent inset, 0 0 0 0 transparent inset;
  border-right: solid 1px rgba(0, 0, 0, 0.1);
}

.tab:first-child {
  border-radius: 4px 0 0 4px;
}

.tab:last-child {
  border-radius: 0 4px 4px 0;
  border-right: none;
}

.tab:hover {
  border-right: solid 1px #ceced2;
  box-shadow: 2px 2px 1px #9d9da1, -2px -2px 6px #ffffff,
    0 0 0 0 transparent inset, 0 0 0 0 transparent inset;
}

.tab.active,
.tab:active,
.tab:focus {
  color: #187abf;
  background: #f2f2f7;
  border-right: solid 1px transparent;
  box-shadow: 2px 1px 1px #9d9da1, 0 0 0 transparent,
    2px 2px 2px 0px #cbcbcf inset, -2px -2px 2px 0px #ffffff inset;
}

.tab:last-child.active,
.tab:last-child:hover {
  border-right: none;
}
</style>
