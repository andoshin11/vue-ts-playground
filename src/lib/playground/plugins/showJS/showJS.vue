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
  name: 'showJS',
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
    async modelChangedDebounce(sandbox, _, vm) {
      const runnableJS = await sandbox.getRunnableJS()
      const coloredJS = await sandbox.monaco.editor.colorize(runnableJS, 'javascript', {})

      // @ts-ignore
      vm.content = coloredJS
    }
  }
})
</script>
