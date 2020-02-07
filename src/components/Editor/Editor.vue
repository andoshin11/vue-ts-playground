<template>
  <div id="Editor" class="Editor"></div>
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
  data(): IData {
    return {
      sandboxConfig: {
        domID: "Editor"
      }
    };
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
