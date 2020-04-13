<template>
  <v-list>
    <v-list-item ripple>
      <v-list-item-title>
        <span @click="reportIssue" >
          Report GitHub issue
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
import { Exporter } from '../../exporter'

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
    async reportIssue() {
      if (!this.exporter) return
      const body = await this.exporter.reportIssue(this.$route)

      if (body) {
        // content was too long.
        this.$store.commit('storeModalForCode', {
          code: body,
          subtitle: "Issue too long to post automatically. Copy this text, then click 'Create New Issue' to begin."
        })
      }
    }
  }
})
</script>
