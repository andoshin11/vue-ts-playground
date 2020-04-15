<template>
  <div class="EditorTabs">
    <ul class="tabs">
      <li class="tab">
        <DropDown text="Theme">
          <Theme />
        </DropDown>
      </li>
      <li class="tab">
        <DropDown :text="'v' + tsVersion">
          <TSVersions />
        </DropDown>
      </li>
      <li class="tab">
        <DropDown text="Config">
          <ConfigOptions/>
        </DropDown>
      </li>
      <li class="tab">
        <DropDown text="Export">
          <Exporter />
        </DropDown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import ConfigOptions from '@/components/ConfigOptions'
import Theme from '@/components/Theme'
import Exporter from '@/components/Exporter'
import TSVersions from '../TSVersions'
import DropDown from '../DropDown'

export default Vue.extend({
  components: {
    ConfigOptions,
    Theme,
    Exporter,
    DropDown,
    TSVersions
  },
  computed: {
    state(): RootState {
      return this.$store.state;
    },
    tsVersion(): string | null {
      const { sandbox } = this.state;
      return sandbox && sandbox.ts.version;
    },
  }
});
</script>

<style scoped>
.EditorTabs {
  width: 100%;
  height: 48px;
  margin-right: -2px;
  background: #F2F2F7;
}

.tabs {
  height: 100%;
  padding-left: 0;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.tab {
  width: 23%;
}
</style>
