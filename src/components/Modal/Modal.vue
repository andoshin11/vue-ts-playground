<template>
  <div>
    <transition name="transition">
      <div
        v-if="active"
        class="modal"
        :class="{ grey: color === 'grey', fixed }"
      >
        <div class="modal-container">
          <div class="modal-container-header">
            <div class="close" @click="$emit('close')" />
          </div>
          <slot />
        </div>
      </div>
    </transition>
    <transition name="transition">
      <div v-if="active" class="mask" @click="$emit('close')" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    }
  }
});
</script>

<style scoped>
.modal {
  z-index: 9999;
  background-color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  overflow: auto;
  width: 100%;
  max-width: 560px;
  max-height: 80vh;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.modal.fixed {
  max-width: 100%;
  max-height: 100%;
}

.modal.grey {
  background-color: #ddd;
}
.modal-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.modal-container-header {
  width: 100%;
  max-width: 1008px;
  margin: 0 auto 16px;
  min-height: 64px;
  position: relative;
  z-index: 1;
}
.modal-container-header img {
  margin: 24px 16px;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  width: 33px;
  height: 33px;
}
.modal.fixed .close {
  position: fixed;
  top: 16px;
  right: 20px;
}
.close:before,
.close:after {
  content: "";
  position: absolute;
  right: 15px;
  height: 32px;
  width: 2px;
  background-color: #ddd;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
.modal footer {
  margin: auto 0 0;
}
.modal footer small {
  padding: 0 16px;
}
.mask {
  background-color: black;
  opacity: 0.2;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.transition-enter,
.transition-leave-to {
  opacity: 0;
}
.transition-enter-active,
.transition-leave-active {
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
</style>
