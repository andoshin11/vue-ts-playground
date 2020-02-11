<template>
  <pre class="pre">
    <code class="code" v-html="content"></code>
  </pre>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    content: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
.pre {
  background-color: #f5f5f5;
  width: 100%;
  position: relative;
}

.code {
  padding: 16px 0;
  width: calc(100% - 18px);
  height: 100%;
  overflow-x: scroll;
  box-shadow: none;
}

.code::before {
  content: ''
}
</style>
