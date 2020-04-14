<template>
  <div id="Editor" class="Editor" :style="innerStyleObj">
    <EditorTabs />
    <div class="EditorContainer">
      <div id="EditorArea" class="EditorArea">
        <div id="EditorEmbed" class="EditorEmbed"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as CSS from 'csstype'
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
      type: Object as () => CSS.Properties
    }
  },
  computed: {
    innerStyleObj(): CSS.Properties {
      const defaultStyle = this.styleObj || {};

      return defaultStyle;
    },
    state(): RootState {
      return this.$store.state;
    }
  },
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

.EditorContainer {
  width: 100%;
  height: 100%;
  background-color: #F2F2F7;
  padding: 2%;
}

.EditorArea {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: transparent;
  box-shadow: 2px 2px 2px 0px #cbcbcf inset, -2px -2px 2px 0px #ffffff inset;
}

.EditorEmbed {
  width: 100%;
  height: 100%;
}
</style>
