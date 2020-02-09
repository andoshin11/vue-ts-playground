<template>
  <div id="Editor" class="Editor" :style="innerStyleObj">
    <EditorTabs />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import {
  PlaygroundConfig,
  Sandbox
} from "@/lib/sandbox";
import EditorTabs from "@/components/EditorTabs";

export default Vue.extend({
  components: {
    EditorTabs
  },
  props: {
    styleObj: {
      type: Object
    }
  },
  computed: {
    innerStyleObj(): object {
      const defaultStyle = this.styleObj || {};

      return defaultStyle;
    },
    state(): RootState {
      return this.$store.state;
    }
  },
  methods: {},
  async mounted() {
    // const sandbox = await this.createSandbox();
    // sandbox.editor.focus();
  }
});
</script>

<style scoped>
.Editor {
  width: 50vw;
  height: calc(100vh - 48px);
}
</style>
