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
  name: 'showDTS',
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
    async modelChanged(sandbox, model, vm) {
      console.log('[Plugin showDTS]: modelChanged')
      const DTS = await sandbox.getDTSForCode()
      const coloredJS = await sandbox.monaco.editor.colorize(DTS, 'typescript', {})
      // @ts-ignore
      vm.content = coloredJS
    }
  }
})
</script>
