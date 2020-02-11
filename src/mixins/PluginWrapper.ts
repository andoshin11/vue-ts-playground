import Vue from 'vue'
import { RootState } from '@/store'

export default Vue.extend({
  computed: {
    state(): RootState {
      return this.$store.state
    },
    modelChangedAt(): RootState['modelChangedAt'] {
      return this.state.modelChangedAt
    },
    modelChangedAtDebouncing(): RootState['modelChangedAtDebouncing'] {
      return this.state.modelChangedAtDebouncing
    }
  },
  watch: {
    modelChangedAt: {
      immediate: true,
      async handler(val: number | null) {
        // console.log('Invoking wrapper handler')
        const { $pluginHooks } = this
        const { sandbox } = this.state
        if (!sandbox) return

        if (!val) return
        // Invoke update function
        if ($pluginHooks && $pluginHooks.modelChanged) {
          await $pluginHooks.modelChanged(sandbox, sandbox.getModel(), this)
        }

        // FIXME: Handle debouncing
        // Invoke debounce function
        if ($pluginHooks && $pluginHooks.modelChangedDebounce) {
          await $pluginHooks.modelChangedDebounce(sandbox, sandbox.getModel(), this)
        }
      }
    },
  },
  mounted() {
    // register pluginHooks as component method
    const { pluginHooks } = (this.$options as any).__proto__
    if (!pluginHooks) return

    this['$pluginHooks'] = pluginHooks
  }
})
