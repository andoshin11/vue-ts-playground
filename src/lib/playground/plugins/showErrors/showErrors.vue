<template>
  <div class="showError">
    <ul v-if="diagnostics.length" class="errors">
      <li
        v-for="(diag, i) in diagnostics"
        :key="i"
        :class="['diagnostic', category(diag)]"
        @mouseenter="decorateError(diag)"
        @mouseleave="removeErrorDecoration"
        @click="decorateLine"
      >
        <span>{{ diagnosticText(diag) }}</span>
      </li>
    </ul>
    <span v-else>No errors found.</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Diagnostic } from "typescript";
import { RootState } from "@/store";

interface IData {
  diagnostics: Diagnostic[];
  decorationLock: boolean
  decorations: string[]
}

export default Vue.extend({
  data(): IData {
    return {
      diagnostics: [],
      decorationLock: false,
      decorations: []
    };
  },
  computed: {
    state(): RootState {
      return this.$store.state;
    }
  },
  pluginHooks: {
    async modelChangedDebounce(sandbox, model, vm) {
      console.log('[Plugin showErrors]: modelChangedDebounce')
      const worker = await sandbox.getWorkerProcess();
      const diagnostics = await worker.getSemanticDiagnostics(
        model.uri.toString()
      );
      // @ts-ignore
      vm.diagnostics = diagnostics;
    }
  },
  methods: {
    category(diagnostic: Diagnostic) {
      switch (diagnostic.category) {
        case 0:
          return "diag-warning";
        case 1:
          return "diag-error";
        case 2:
          return "diag-suggestion";
        case 3:
          return "diag-message";
        default:
          return "";
      }
    },
    diagnosticText(diagnostic: Diagnostic) {
      if (typeof diagnostic === "string") return diagnostic;
      const { sandbox } = this.state;
      if (!sandbox) return "";
      return sandbox.ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
    },
    decorateError(diagnostic: Diagnostic, wholeLine: boolean = false) {
      if (!diagnostic.start || !diagnostic.length || this.decorationLock) return
      const { sandbox } = this.state;
      if (!sandbox) return;
      const model = sandbox.getModel()

      const start = model.getPositionAt(diagnostic.start)
      if (wholeLine) sandbox.editor.revealLine(start.lineNumber)
      const end = model.getPositionAt(diagnostic.start + diagnostic.length)
      this.decorations = sandbox.editor.deltaDecorations(this.decorations, [
        {
          range: new sandbox.monaco.Range(
            start.lineNumber,
            start.column,
            end.lineNumber,
            end.column
          ),
          options: {
            inlineClassName: "error-highlight",
            isWholeLine: wholeLine
          }
        }
      ])
    },
    removeErrorDecoration() {
      const { sandbox } = this.state;
      if (!sandbox || this.decorationLock) return;
      sandbox.editor.deltaDecorations(this.decorations, [])
    },
    decorateLine(diagnostic: Diagnostic) {
      if (!diagnostic.start || !diagnostic.length) return
      const { sandbox } = this.state;
      if (!sandbox) return;
      const model = sandbox.getModel()

      const start = model.getPositionAt(diagnostic.start)
      sandbox.editor.revealLine(start.lineNumber)
      const end = model.getPositionAt(diagnostic.start + diagnostic.length)
      this.decorations = sandbox.editor.deltaDecorations(this.decorations, [
        {
          range: new sandbox.monaco.Range(
            start.lineNumber,
            start.column,
            end.lineNumber,
            end.column
          ),
          options: {
            inlineClassName: "error-highlight",
            isWholeLine: true
          }
        }
      ])
      this.decorationLock = true
      const vm = this
      setTimeout(() => {
        vm.decorationLock = false
        sandbox.editor.deltaDecorations(vm.decorations, [])
      }, 300)
    }
  }
});
</script>

<style scoped>
.errors {
  margin: 0;
  padding: 0;
}

.diagnostic {
  list-style: none;
  padding-left: 1rem;
  margin: 0 0 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: .3s;
}

.diag-error {
  border-left: 2px solid red;
}

.diag-error:hover {
  border-left: 2px solid transparent;
  background-color: #fcb7b7;
}
</style>

<style>
.error-highlight {
  opacity: 1;
  background-color: #fcb7b7;
}
</style>
