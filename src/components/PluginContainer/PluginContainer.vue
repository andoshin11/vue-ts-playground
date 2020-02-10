<template>
  <div class="PluginContainer" ref="root">
    <Component v-if="isPluginRegistered" :is="currentPluginId" :key="currentPluginId" />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import { RootState } from '@/store'
import { isVueComponentRef } from '@/utils'
import { pluginNameFromID } from '@/lib/playground'

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state
    },
    currentPluginId(): string | null {
      const { currentPlugin } = this.state
      return currentPlugin && pluginNameFromID(currentPlugin.id)
    },
    isPluginRegistered(): boolean {
      return !!this.currentPluginId && !!Vue.component(this.currentPluginId)
    }
  },
  watch: {
    currentPluginId: {
      immediate: true,
      handler(val: string | null) {
        const { sandbox } = this.state
        if (!sandbox) return

        if (!val) return
        const root = this.$refs['root']
        if (!isVueComponentRef(root)) return

        // @ts-ignore
        const rootRef: Vue = root["__vue__"]

        const vm = this
        const previousPlugin: Vue | null = rootRef.$children ? rootRef.$children[0] || null : null

        Vue.nextTick(() => {
          const newPlugin = rootRef.$children && rootRef.$children[0]
          if (!newPlugin) return

          vm.activatePlugin(previousPlugin, newPlugin)
        })
      }
    }
  },
  methods: {
    activatePlugin(prevPlugin: Vue | null, newPlugin: Vue) {
      const { sandbox } = this.state
      if (!sandbox) return

      // unmount previousPlugin
      if (prevPlugin && prevPlugin.$pluginHooks && prevPlugin.$pluginHooks.willUnmount) {
        prevPlugin.$pluginHooks.willUnmount(sandbox, prevPlugin)
      }

      // mount newPlugin
      if (newPlugin.$pluginHooks) {
        const { willMount, modelChanged, modelChangedDebounce, didMount } = newPlugin.$pluginHooks
        if (willMount) willMount(sandbox, newPlugin)
        if (modelChanged) modelChanged(sandbox, sandbox.getModel(), newPlugin)
        if (modelChangedDebounce) modelChangedDebounce(sandbox, sandbox.getModel(), newPlugin)
        if (didMount) didMount(sandbox, newPlugin)
      }

      // complete unmount
      if (prevPlugin && prevPlugin.$pluginHooks && prevPlugin.$pluginHooks.didUnmount) {
        prevPlugin.$pluginHooks.didUnmount(sandbox, prevPlugin)
      }
    }
  }
})
</script>

<style scoped>
.PluginContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
}
</style>
