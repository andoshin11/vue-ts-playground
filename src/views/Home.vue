<template>
  <div class="home">
    <Editor :styleObj="editorStyle" />
    <Dragbar v-if="sidebarRef" :sidebarRef="sidebarRef" @drag="handleDrag" />
    <Sidebar :styleObj="sidebarStyle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as CSS from 'csstype'
import Editor from "@/components/Editor";
import Dragbar from "@/components/Dragbar";
import Sidebar from "@/components/Sidebar";

interface IData {
  editorStyle: CSS.Properties;
  sidebarStyle: CSS.Properties;
  sidebarRef: Element | null;
  setRefInterval: number | null;
}

export default Vue.extend({
  components: {
    Editor,
    Dragbar,
    Sidebar
  },
  data(): IData {
    return {
      editorStyle: {
        width: '50vw'
      },
      sidebarStyle: {
        width: '50vw'
      },
      sidebarRef: null,
      setRefInterval: null
    };
  },
  methods: {
    handleDrag(data: { editor: CSS.Properties; sidebar: CSS.Properties }) {
      const { editor, sidebar } = data;

      this.editorStyle = editor;
      this.sidebarStyle = sidebar;
    }
  },
  async mounted() {
    const vm = this;

    // since original $refs object of Vue is not reactive
    vm.setRefInterval = setInterval(() => {
      if (vm.sidebarRef && vm.setRefInterval) clearInterval(vm.setRefInterval);
      const sidebarRef = document.getElementById("Sidebar");
      if (sidebarRef) vm.sidebarRef = sidebarRef;
    }, 500);
  }
});
</script>

<style scoped>
.home {
  display: flex;
}
</style>
