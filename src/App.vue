<template>
  <v-app id="app">
    <Header />
    <ModalForCode />
    <Provider>
      <router-view />
    </Provider>
  </v-app>
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

<style>
body {
  margin: 0;
}

#app {
  font-family: "Segoe UI Web (West European)",Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
