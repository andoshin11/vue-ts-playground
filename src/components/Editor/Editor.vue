<template>
  <div id="Editor" class="Editor" :style="innerStyleObj">
    <EditorTabs class="head" />
    <div class="body EditorContainer">
      <div id="EditorArea" class="EditorArea">
        <div id="EditorEmbed" class="EditorEmbed"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as CSS from "csstype";
import { RootState } from "@/store";
import { PlaygroundConfig, Sandbox } from "@/lib/sandbox";
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
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .Editor {
    width: 100%;
  }
}

.head {
  height: 48px;
}

.body {
  height: calc(100% - 48px);
}

.EditorContainer {
  width: 100%;
  background-color: #f2f2f7;
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
