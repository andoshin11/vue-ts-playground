<template>
  <CodePreview v-if="content" :content="content" />
  <div v-else>
    No output.
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CodePreview from '@/components/CodePreview'

interface IData {
  content: string | null
}

export default Vue.extend({
  name: 'showJS',
  components: {
    CodePreview
  },
  data(): IData {
    return {
      content: null
    }
  },
  pluginHooks: {
    async modelChangedDebounce(sandbox, _, vm) {
      try {
        const runnableJS = await sandbox.getRunnableJS()
        const coloredJS = await sandbox.monaco.editor.colorize(runnableJS, 'javascript', {})

        // @ts-ignore
        vm.content = coloredJS
      } catch (e) {
        // @ts-ignore
        vm.content = ''
      }
    }
  }
})
</script>
