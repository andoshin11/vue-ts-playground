<template>
  <div
    id="Sidebar"
    class="Sidebar"
    :class="{ hidden: isHidden }"
    :style="innerStyleObj"
  >
    <Tabs
      :plugins="state.plugins"
      :currentPluginId="state.currentPlugin && state.currentPlugin.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import Tabs from "@/components/SidebarTabs";

export default Vue.extend({
  components: {
    Tabs
  },
  props: {
    styleObj: {
      type: Object
    }
  },
  computed: {
    isHidden(): boolean {
      return !!window.localStorage.getItem("sidebar-hidden");
    },
    innerStyleObj(): object {
      const defaultStyle = this.styleObj || {};

      return defaultStyle;
    },
    state(): RootState {
      return this.$store.state;
    }
  }
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
