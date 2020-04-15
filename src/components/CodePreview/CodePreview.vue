<template>
  <div class="CodePreview">
    <pre class="pre">
      <code class="code" v-html="content"></code>
    </pre>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  watch: {}
});
</script>

<style scoped>
.CodePreview {
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 16px;
  box-shadow: 2px 2px 2px #9d9da1, -2px -2px 6px #ffffff;
  padding: 24px;
  overflow: scroll;
}

.pre {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
  margin-right: 0;
  margin-top: 0;
}

.code {
  width: 100%;
  height: 100%;
  overflow: scroll;
  box-shadow: none;
  background-color: transparent;
  white-space: pre-wrap;
}

pre,
code {
  white-space: normal;
}
</style>
