<template>
  <div
    id="Sidebar"
    class="Sidebar"
    :class="{ hidden: isHidden }"
    :style="innerStyleObj"
  >
    <div class="head" @click="$emit('clickHead')">
      <h3 class="title">Playground Plugins</h3>
    </div>
    <Tabs
      class="tabs"
      :plugins="state.plugins"
      :currentPluginId="state.currentPlugin && state.currentPlugin.id"
    />
    <PluginContainer class="plugin" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import Tabs from "@/components/SidebarTabs";
import PluginContainer from "@/components/PluginContainer";
import { judgeMobile } from "../../utils";

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
    },
    isMobile(): boolean {
      return judgeMobile();
    }
  }
});
</script>

<style scoped>
.Sidebar {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .Sidebar {
    height: calc(100% - 64px);
    height: 100%;
  }
}

.hidden {
  display: none;
}

.head {
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .head {
    height: 56px;
  }
}

.tabs {
  height: 60px;
}

@media screen and (max-width: 768px) {
  .tabs {
    height: 48px;
  }
}

.plugin {
  height: calc(100% - 48px - 60px);
}

@media screen and (max-width: 768px) {
  .plugin {
    height: calc(100% - 48px - 48px);
  }
}

.title {
  text-align: center;
  margin: 0;
}
</style>
