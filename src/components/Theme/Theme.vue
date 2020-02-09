<template>
  <v-list>
    <v-list-item ripple>
      <v-list-item-title>
        <span @click="setEditorTheme('sandbox')" >Light</span>
      </v-list-item-title>
    </v-list-item>
    <v-list-item ripple>
      <v-list-item-title>
        <span @click="setEditorTheme('sandbox-dark')" >Dark</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '@/store'

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state
    }
  },
  methods: {
    setEditorTheme(theme: "sandbox" | "sandbox-dark") {
      this.$store.dispatch('setTheme', theme)
    }
  }
})
</script>
