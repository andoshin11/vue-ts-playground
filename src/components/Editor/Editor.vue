<template>
  <div id="Editor" class="Editor" :style="innerStyleObj"></div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  createTypeScriptSandbox,
  PlaygroundConfig,
  Sandbox
} from "@/lib/sandbox";

interface IData {
  sandboxConfig: Partial<PlaygroundConfig>;
}

export default Vue.extend({
  props: {
    styleObj: {
      type: Object
    }
  },
  data(): IData {
    return {
      sandboxConfig: {
        domID: "Editor"
      }
    };
  },
  computed: {
    innerStyleObj(): object {
      const defaultStyle = this.styleObj || {}

      return defaultStyle
    }
  },
  methods: {
    async createSandbox(): Promise<Sandbox> {
      const monaco = await import("monaco-editor");
      const ts = await import("typescript");
      const sandbox = createTypeScriptSandbox(this.sandboxConfig, monaco, ts);
      return sandbox;
    }
  },
  async mounted() {
    const sandbox = await this.createSandbox();
    sandbox.editor.focus();
  }
});
</script>

<style scoped>
.Editor {
  width: 500px;
  height: 500px;
}
</style>
