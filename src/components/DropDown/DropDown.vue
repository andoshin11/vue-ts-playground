<template>
  <div class="DropDown">
    <Button @click="isOpen = !isOpen" class="button" :class="{ isOpen: 'open' }" >
      <div class="wrapper">
        <span>{{ text }}</span>
        <div class="carret">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.1484 0.648438L15.8516 1.35156L8 9.20312L0.148438 1.35156L0.851562 0.648438L8 7.79688L15.1484 0.648438Z" fill="#000000"/>
          </svg>
        </div>
      </div>
    </Button>
    <div v-if="isOpen" class="mask" @click="isOpen = false" />
    <div v-if="isOpen" class="popup">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from '../Base/Button'

interface IData {
  isOpen: boolean
}

export default Vue.extend({
  components: {
    Button
  },
  props: {
    text: {
      type: String,
      required: true
    },
    size: {
      type: String as () => ('sm' | 'md' | 'lg'),
      default: 'md'
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
  width: 100%;
  height: 100%;
}

.button {
  padding: 0 12px;
  font-size: 1.4rem;
  min-height: 40px;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .button {
    min-height: 36px;
    padding: 0 10px;
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
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
  right: 0;
  border-radius: 4px;
  background: #F2F2F7;
  box-shadow:  5px 5px 10px #808083, 
              -5px -5px 10px #ffffff;
}
</style>
