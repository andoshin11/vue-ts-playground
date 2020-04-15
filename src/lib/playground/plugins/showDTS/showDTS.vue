<template>
  <div v-if="content" class="wrapper">
    <CodePreview :content="content" />
  </div>
  <div v-else>
    No declaration found.
  </div>
  <!-- <Loading v-else /> -->
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
    // Loading
  },
  data(): IData {
    return {
      content: null
    }
  },
  pluginHooks: {
    async modelChanged(sandbox, model, vm) {
      try {
        console.log('[Plugin showDTS]: modelChanged')
        const DTS = await sandbox.getDTSForCode()
        const coloredJS = await sandbox.monaco.editor.colorize(DTS, 'typescript', {})
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

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
}
</style>
