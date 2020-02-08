<template>
  <div class="EditorTabs">
    <ul>
      <li class="versions toolBarItem">
        <a href="#">
          v{{ tsVersion }}
          <span class="carret" />
        </a>
        <!-- <ul>
          <li v-for="version in allVersions" :key="version">
            <a href="#">{{ version }}</a>
          </li>
        </ul> -->
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '@/store'

interface IData {
  showVersions: boolean
}

export default Vue.extend({
  data(): IData {
    return {
      showVersions: false
    }
  },
  computed: {
    state(): RootState {
      return this.$store.state
    },
    tsVersion(): string | null {
      const { sandbox } = this.state
      return sandbox && sandbox.ts.version
    },
    allVersions(): string[] {
      const { sandbox } = this.state
      return ["3.8.0-beta", ...(sandbox ? sandbox.supportedVersions : [])]
    }
  }
})
</script>

<style scoped>
.EditorTabs {
  height: 3rem;
  border-bottom: 1px solid #c4c4c4;
  margin-right: -2px;
  margin-bottom: 10px;
}

.EditorTabs > ul {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
}

.toolBarItem {
  list-style: none;
  display: flex;
  font-weight: 600;
  font-size: 1rem;
  padding: 0 .75rem;
}

.carret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
</style>
