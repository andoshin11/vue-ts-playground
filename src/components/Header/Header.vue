<template>
  <header class="Header">
    <div class="logo">TS Playground by Vue</div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.Header {
  width: 100%;
  height: 48px;
  background: #187abf;
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.logo {
  font-weight: 600;
  font-size: 1.5rem;
  color: #fff;
}
</style>
