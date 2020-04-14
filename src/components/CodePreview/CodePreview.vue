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
  border-radius: 8px;
  background: #F2F2F7;
  box-shadow: 28px 28px 36px #b6b6b9, -28px -28px 36px #ffffff;
  width: 100%;
  position: relative;
}

.code {
  padding: 16px 0;
  width: calc(100% - 18px);
  height: 100%;
  overflow-x: scroll;
  box-shadow: none;
  background-color: transparent;
}

.code::before {
  content: '';
}
</style>
