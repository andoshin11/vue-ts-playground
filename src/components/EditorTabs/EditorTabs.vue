<template>
  <div class="EditorTabs">
    <v-list
      dense
      flat
      class="EditorTabList"
    >
      <v-list-item class="toolBarItem" ripple>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <button class="tabAction" v-on="on">
              v{{ tsVersion }}
              <span class="carret" />
            </button>
          </template>
          <v-list>
            <v-list-item
              v-for="version in allVersions"
              :key="version"
              ripple
            >
              <v-list-item-title><span @click="updateTSVersion(version)" >{{ version }}</span></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-list-item ripple>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <button class="tabAction" v-on="on">
              Config
              <span class="carret" />
            </button>
          </template>
          <ConfigOptions/>
        </v-menu>
      </v-list-item>

      <v-list-item ripple>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <button class="tabAction" v-on="on">
              Theme
              <span class="carret" />
            </button>
          </template>
          <Theme />
        </v-menu>
      </v-list-item>

      <v-list-item ripple>
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <button class="tabAction" v-on="on">
              Export
              <span class="carret" />
            </button>
          </template>
          <Exporter />
        </v-menu>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import { updateTSVersion } from '@/utils/router'
import ConfigOptions from '@/components/ConfigOptions'
import Theme from '@/components/Theme'
import Exporter from '@/components/Exporter'

interface IData {
  showVersions: boolean;
  on: boolean
}

export default Vue.extend({
  components: {
    ConfigOptions,
    Theme,
    Exporter
  },
  data(): IData {
    return {
      showVersions: false,
      on: false
    };
  },
  computed: {
    state(): RootState {
      return this.$store.state;
    },
    tsVersion(): string | null {
      const { sandbox } = this.state;
      return sandbox && sandbox.ts.version;
    },
    allVersions(): string[] {
      const { sandbox } = this.state;
      return ["3.8.0-beta", ...(sandbox ? sandbox.supportedVersions : [])];
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
.EditorTabs {
  height: 48px;
  margin-right: -2px;
  margin-bottom: .5rem;
}

.EditorTabList {
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #c4c4c4;
  padding: 0;
  height: 100%;
  border-radius: 0;
}

.toolBarItem {
  text-align: center;
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

.tabAction {
  text-align: center;
  width: calc(100% + 32px);
  height: 100%;
  outline: none;
  margin: 0 -16px;
}

/* .tabAction:focus {
  background-color: #ddd;
  opacity: .7;
} */
</style>
