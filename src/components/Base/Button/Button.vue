<template>
  <button
    class="Button"
    :class="{ active: isActive }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="$emit('click')"
    :style="btnStyle">
    <slot/>
  </button>  
</template>

<script lang="ts">
import Vue from 'vue'
import * as CSS from 'csstype'

interface IData {
  isHovering: boolean
}

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: 'inferit'
    },
    backgroundColor: {
      type: String,
      default: 'inferit'
    },
    borderRadius: {
      type: String,
      default: '4px'
    },
    baseColor: {
      type: String,
      default: '#F2F2F7'
    },
    colorDifference: {
      type: Number,
      default: 0.15
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data(): IData {
    return {
      isHovering: false
    }
  },
  computed: {
    btnStyle(): CSS.Properties {
      return {
        // color: this.color,
        // backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
        // boxShadow: !this.isHovering ? `-4px -2px 4px 0px ${this.lightColor}, 4px 2px 6px 0px ${this.darkColor}` : `2px 2px 2px 0px ${this.darkColor} inset, -2px -2px 2px 0px ${this.lightColor} inset`
      }
    },
    lightColor(): string {
      const result = this.calcColor(this.baseColor, this.colorDifference)
      return result
    },
    darkColor(): string {
      const result = this.calcColor(this.baseColor, -1 * this.colorDifference)
      return result
    }
  },
  methods: {
    calcColor(base: string, type: number = 0) {
      const slim = base.replace(/[^0-9a-f]/gi, "")
      const hex = this.normalizeHex(slim)
      let a
      let output = '#'
      for (let n = 0; n < 3; n++) {
        a = parseInt(hex.substr(2 * n, 2), 16)
        const _a = Math.round(Math.min(Math.max(0, a + a * type), 255)).toString(16)
        output += ('00' + _a).substr(_a.length)
      }
      return output
    },
    normalizeHex(val: string) {
      if (val.length < 6) {
        return val[0] + val[0] + val[1] + val[1] + val[2] + val[2]
      } else {
        return val
      }
    }
  }
})
</script>

<style scoped>
.Button {
  position: relative;
  outline: none;
  border: none;
  transition: all 0.3s cubic-bezier(.79,.21,.06,.81);
  cursor: pointer;
  padding: 8px;
  background: transparent;
  box-shadow: 6px 6px 8px #c2c2c6, -5px -5px 10px #ffffff, 0 0 0 0 transparent inset, 0 0 0 0 transparent inset;
}

.Button::after {
  content: '';
  position: absolute;
  border-radius: 4px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all .3s;
}

.Button:hover {
  box-shadow: 2px 2px 2px #9d9da1, -2px -2px 6px #ffffff, 0 0 0 0 transparent inset, 0 0 0 0 transparent inset;
}

.Button.active,
.Button:active,
.Button:focus {
  outline: none;
  background: linear-gradient(145deg, #ffffff, transparent);
  box-shadow: 2px 2px 6px #9d9da1, 0 0 0 #ffffff, 2px 2px 2px 0px #cbcbcf inset, -2px -2px 6px 2px #ffffff inset;
}

.Button.active,
.Button:active::after,
.Button:focus::after {
  box-shadow: 2px 2px 2px 0 #c2c2c6 inset, -2px -2px 2px 0 #ffffff;
}

</style>
