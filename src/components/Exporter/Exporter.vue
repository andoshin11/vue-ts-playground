<template>
  <v-list>
    <v-list-item ripple>
      <v-list-item-title>
        <span @click="reportIssue" >
          Report GitHub issue on TypeScript
        </span>
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item ripple>
      <v-list-item-title>
        <span @click="openInASTViewer" >
          Open in TypeScript AST Viewer
        </span>
      </v-list-item-title>
    </v-list-item>

    <v-list-item ripple>
      <v-list-item-title>
        <span @click="openInCodeSandbox" >
          Open in CodeSandbox
        </span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { RootState } from '@/store'
import { Exporter } from '@/playground/exporter'

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state
    },
    exporter(): Exporter | null {
      const { sandbox } = this.state
      if (!sandbox) return null
      return new Exporter(sandbox)
    }
  },
  methods: {
    openInASTViewer() {
      if (!this.exporter) return
      this.exporter.openInASTViewer()
    },
    openInCodeSandbox() {
      if (!this.exporter) return
      this.exporter.openInCodeSandbox()
    },
    reportIssue() {
      if (!this.exporter) return
      this.exporter.reportIssue(this.$route)
    }
  }
})
</script>
