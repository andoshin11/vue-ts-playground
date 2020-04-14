<template>
  <div class="DropDown">
    <button @click="isOpen = !isOpen" class="button" :class="{ isOpen: 'open' }" >
      <span>{{ text }}</span>
      <div class="carret">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.1484 0.648438L15.8516 1.35156L8 9.20312L0.148438 1.35156L0.851562 0.648438L8 7.79688L15.1484 0.648438Z" fill="#000000"/>
        </svg>
      </div>
    </button>
    <div v-if="isOpen" class="mask" @click="isOpen = false" />
    <div v-if="isOpen" class="popup">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  isOpen: boolean
}

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data(): IData {
    return {
      isOpen: false
    }
  }
})
</script>

<style scoped>
.DropDown {
  position: relative;
}

.button {
  padding: 4px 20px;
  border-radius: 4px;
  background: #F2F2F7;
  box-shadow:  4px 4px 8px #cbcbcf, 
              -4px -4px 8px #ffffff;
  display: flex;
  align-items: center;
}

.button:active,
.button:hover,
.button:focus {
  outline: none;
  border-radius: 4px;
  background: #F2F2F7;
  box-shadow: 2px 2px 2px 0px #cbcbcf inset, -2px -2px 2px 0px #ffffff inset;
}

.carret {
  margin-left: 16px;
}

.mask {
  opacity: 0.2;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.popup {
  z-index: 100;
  min-width: 100%;
  width: auto;
  position: absolute;
  top: calc(100% + 8px);
  right: 10%;
  border-radius: 4px;
  background: #F2F2F7;
  box-shadow:  5px 5px 10px #808083, 
              -5px -5px 10px #ffffff;
}
</style>
