<template>
  <CodePreview v-if="content" :content="content" />
  <Loading v-else />
</template>

<script lang="ts">
import Vue from 'vue'
import CodePreview from '@/components/CodePreview'
import Loading from '@/components/Loading'

interface IData {
  content: string | null
}

export default Vue.extend({
  name: 'showTypes',
  components: {
    CodePreview,
    Loading
  },
  data(): IData {
    return {
      content: null
    }
  },
  pluginHooks: {
    async modelChangedDebounce(sandbox, model, vm) {
      console.log('[Plugin showTypes]: modelChangedDebounce')
      const program = sandbox.createTSProgram()
      const checker = program.getTypeChecker()
      const sourceFile = program.getSourceFile(model.uri.path)!
      const ts = sandbox.ts
      sandbox.ts.forEachChild(sourceFile, node => {
        if (ts.isInterfaceDeclaration(node)) {
          const symbol = checker.getSymbolAtLocation(node)
          if (symbol) {
            console.log(symbol, symbol.members)
          } else {
            console.log("could not get symbol for interface");
          }
        }
      })
    }
  }
})
</script>
