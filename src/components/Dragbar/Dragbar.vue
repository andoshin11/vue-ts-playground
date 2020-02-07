<template>
  <div class="Dragbar" @mousedown="startDragging" @mouseup="endDragging"></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    sidebarRef: {
      type: HTMLDivElement,
      default: null
    }
  },
  methods: {
    startDragging(e: MouseEvent) {
      // Handle dragging all over the screen
      document.addEventListener("mousemove", this.drag);

      // Don't allow the drag to select text accidentally
      document.body.style.userSelect = "none";
      e.stopPropagation();
      e.cancelBubble = true;
    },
    endDragging() {
      document.removeEventListener("mousemove", this.drag);
      document.body.style.userSelect = "auto";
    },
    drag(e: MouseEvent) {
      if (!this.sidebarRef) return

      // Get how far right the mouse is from the right
      const rightX = this.sidebarRef.getBoundingClientRect().right;
      const offset = rightX - e.pageX;
      const screenClampLeft = window.innerWidth - 320;
      const clampedOffset = Math.min(Math.max(offset, 280), screenClampLeft);

      // Emit style object
      this.$emit('drag', {
        editor: {
          width: `calc(100% - ${clampedOffset}px)`
        },
        sidebar: {
          width: `${clampedOffset}px`,
          flexBasis: `${clampedOffset}px`,
          maxWidth: `${clampedOffset}px`
        }
      })

      // Save the x coordinate of the
      if (window.localStorage) {
        window.localStorage.setItem("dragbar-x", "" + clampedOffset);
        window.localStorage.setItem(
          "dragbar-window-width",
          "" + window.innerWidth
        );
      }

      // Don't allow selection
      e.stopPropagation();
      e.cancelBubble = true;
    }
  }
})
</script>

<style scoped>
.Dragbar {
  padding: 3px;
  cursor: col-resize;
  background-color: #fff;
  border-left: 1px solid #c4c4c4;
  margin-left: 2px;
}
</style>
