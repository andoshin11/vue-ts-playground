<template>
  <div id="app">
    <Header />
    <Provider>
      <router-view />
    </Provider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Provider from '@/Provier'
import Header from "@/components/Header";

export default Vue.extend({
  components: {
    Header,
    Provider
  }
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
