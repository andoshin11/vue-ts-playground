<template>
  <div class="home">
    <div class="editor" :style="editorStyle">
      <Editor />
    </div>
    <Dragbar class="dragbar" v-if="sidebarRef" :sidebarRef="sidebarRef" @drag="handleDrag" />
    <div id="home_sidebar" class="sidebar" :class="{ open: isSidebarOpen }" :style="sidebarStyle">
      <Sidebar @clickHead="handleSidebarClick" />
    </div>
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
  isSidebarOpen: boolean
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
        // width: '50vw'
      },
      sidebarStyle: {
        // width: '50vw'
      },
      sidebarRef: null,
      setRefInterval: null,
      isSidebarOpen: false
    };
  },
  methods: {
    handleDrag(data: { editor: CSS.Properties; sidebar: CSS.Properties }) {
      const { editor, sidebar } = data;

      this.editorStyle = editor;
      this.sidebarStyle = sidebar;
    },
    handleSidebarClick() {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  },
  async mounted() {
    const vm = this;

    // since original $refs object of Vue is not reactive
    vm.setRefInterval = setInterval(() => {
      if (vm.sidebarRef && vm.setRefInterval) clearInterval(vm.setRefInterval);
      const sidebarRef = document.getElementById("home_sidebar");
      if (sidebarRef) vm.sidebarRef = sidebarRef;
    }, 500);
  }
});
</script>

<style scoped>
.home {
  display: flex;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .home {
    flex-direction: column;
  }
}

.editor,
.sidebar {
  width: calc((100% - 10px) / 2);
}

@media screen and (max-width: 768px) {
  .editor {
    height: calc(100% - 48px);
    width: 100%;
  }
}

.dragbar {
  width: 10px;
}

@media screen and (max-width: 768px) {
  .dragbar {
    display: none;
  }
}

.sidebar {
  height: 100%;
}

@media screen and (max-width: 768px) {
  .sidebar {
    background-color: #F2F2F7;
    position: fixed;
    height: calc(100% - 64px);
    width: 100vw;
    top: calc(100% - 56px);
    box-shadow:0px 3px 6px 4px #9d9da1;
    border-radius:16px 16px 0px 0px;
    transition: ease .3s;
    padding-bottom: 8px;
  }
}

@media screen and (max-width: 768px) {
  .sidebar.open {
    top: 64px;
  }
}
</style>
