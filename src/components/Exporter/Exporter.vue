<template>
  <ul>
    <li @click="reportIssue">Report GitHub issue</li>
    <li @click="openInASTViewer">Open in TypeScript AST Viewer</li>
    <li @click="openInCodeSandbox">Open in CodeSandbox</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store";
import { Exporter } from "../../exporter";

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state;
    },
    exporter(): Exporter | null {
      const { sandbox } = this.state;
      if (!sandbox) return null;
      return new Exporter(sandbox);
    }
  },
  methods: {
    openInASTViewer() {
      if (!this.exporter) return;
      this.exporter.openInASTViewer();
    },
    openInCodeSandbox() {
      if (!this.exporter) return;
      this.exporter.openInCodeSandbox();
    },
    async reportIssue() {
      if (!this.exporter) return;
      const body = await this.exporter.reportIssue(this.$route);

      if (body) {
        // content was too long.
        this.$store.commit("storeModalForCode", {
          code: body,
          subtitle:
            "Issue too long to post automatically. Copy this text, then click 'Create New Issue' to begin."
        });
      }
    }
  }
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 8px 0;
  padding-left: 0 !important;
}

li {
  cursor: pointer;
  transition: ease 0.3s;
  width: 100%;
  display: block;
  padding: 8px;
  white-space: nowrap;
}

li:hover {
  background-color: #8fd0fe40;
  color: #187abf;
}
</style>
