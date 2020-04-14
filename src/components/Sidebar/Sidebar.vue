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
    <PluginContainer/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import Tabs from "@/components/SidebarTabs";
import PluginContainer from '@/components/PluginContainer'

export default Vue.extend({
  components: {
    Tabs,
    PluginContainer
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
.Sidebar {
  background-color: #F2F2F7;
}

.hidden {
  display: none;
}
</style>
