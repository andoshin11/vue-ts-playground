<template>
  <div id="Sidebar" class="Sidebar" :class="{ hidden: isHidden }" :style="innerStyleObj">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    styleObj: {
      type: Object
    }
  },
  computed: {
    isHidden(): boolean {
      return !!window.localStorage.getItem("sidebar-hidden");
    },
    innerStyleObj(): object {
      const defaultStyle = this.styleObj || {}

      return defaultStyle
    }
  }
})
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
