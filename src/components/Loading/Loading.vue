<template>
  <div>
    <div class="label">Loading...</div>
    <div class="animation">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style scoped>
.label {
  text-align: center;
  margin-bottom: 48px;
  font-weight: bold;
  font-size: 24px;
}

.animation {
  width: 50px;
  height: 20px;
  margin: 0 auto;
  font-size: 0;
  text-align: center;
}

.animation > div {
  display: inline-block;
  width: 6px;
  height: 100%;
  margin: 0 2px;
  background-color: #333;
  transform-origin: center bottom;
  animation: rectY 1.2s infinite linear;
}

.animation .rect2 {
  animation-delay: -1s;
}

.animation .rect3 {
  animation-delay: -2s;
}

.animation .rect4 {
  animation-delay: -3s;
}

.animation .rect5 {
  animation-delay: -4s;
}

@keyframes rectY {
  0%,
  50%,
  100% {
    transform: scaleY(0.5);
  }

  30% {
    transform: scaleY(2);
  }
}
</style>
