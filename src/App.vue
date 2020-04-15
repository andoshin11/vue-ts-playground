<template>
  <div id="app">
    <div class="container">
      <Header class="app_header" />
      <main class="app_main">
        <Provider>
          <router-view />
        </Provider>
      </main>
    </div>
    <ModalForCode />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Provider from '@/Provier'
import Header from "@/components/Header";
import ModalForCode from '@/components/ModalForCode'

export default Vue.extend({
  components: {
    Header,
    Provider,
    ModalForCode
  }
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app_header {
  height: 64px;
}

.app_main {
  height: calc(100% - 64px);
}

@media screen and (max-width: 768px) {
  .app_main {
    /* display: none; */
  }
}
</style>

<style>
html {
  font-size: 10px;
  touch-action: manipulation;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #F2F2F7;
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.6rem;
  touch-action: manipulation;
}

#app {
  font-family: "Segoe UI Web (West European)",Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}
</style>
