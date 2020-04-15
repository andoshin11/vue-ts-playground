<template>
  <div class="ConfigOptions">
    <div class="selectOptions">
      <div v-if="targetSummary" class="selectOption">
        <div>
          <span class="selectLabel">{{ targetSummary.display }}</span>
          <v-select
            :items="targetOptions"
          />
          {{ currentTarget }}
        </div>
        <div>
          {{ targetSummary.oneliner }}
        </div>
      </div>
    </div>
    <div class="checkOptions">
      <ul class="optionsList">
        <li v-for="option in boolOptions" :key="option.id" class="optionsListItem">
          <Checkbox
            :value="compilerOptions[option.id]"
            :name="option.id"
            :id="'option-' + option.id"
            @input="toggleChckStatus(option.id)"
          >
            {{ option.id }}
          </Checkbox>
          <!-- <label>
            <input
              type="checkbox"
              :checked="compilerOptions[option.id]"
              :name="option.id"
              :id="'option-' + option.id"
              class="checkbox"
              @click="toggleChckStatus(option.id)"
            >
            <span class="optionName">{{ option.id }}</span>
          </label> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { languages } from 'monaco-editor'
import { RootState } from '@/store'
import { optionsSummary, OptionsSummary } from '@/lib/playground/const/optionsSummary'
import { sortBy } from '@/utils'
import DropDown from '../DropDown'
import Checkbox from '../Base/Checkbox'

type CompilerOptions = languages.typescript.CompilerOptions

interface IData {
  categoryMap: {
    [category: string]: { [optID: string]: OptionsSummary };
  }
  checkStatus: {
    [optID: string]: boolean
  }
  summaries: OptionsSummary[]
}

export default Vue.extend({
  components: {
    // DropDown
    Checkbox
  },
  data(): IData {
    return {
      categoryMap: {},
      checkStatus: {},
      summaries: optionsSummary
    }
  },
  computed: {
    state(): RootState {
      return this.$store.state
    },
    compilerOptions(): CompilerOptions {
      const { sandbox } = this.state
      return (sandbox && sandbox.compilerOptions) || {}
    },
    currentTarget(): number | null {
      const { compilerOptions } = this
      if (!compilerOptions) return null

      return compilerOptions.target || null
    },
    targetSummary(): OptionsSummary | null {
      return optionsSummary.find(s => s.id === 'target') || null
    },
    targetOptions(): { text: string; value: string }[] {
      const { languages } = this
      if (!languages) return []

      return Object.keys(languages.typescript.ScriptTarget)
        .filter(key => isNaN(Number(key)))
        .map(k => ({ text: k, value: k }))
    },
    languages(): typeof languages | null {
      const { sandbox } = this.state
      if (!sandbox) return null

      return sandbox.monaco.languages
    },
    boolOptions(): OptionsSummary[] {
      const { compilerOptions } = this
      const boolOptions = optionsSummary
        .filter(k => typeof compilerOptions![k.id] === 'boolean')
      return boolOptions.sort(sortBy('id'))
    }
  },
  methods: {
    toggleChckStatus(optId: string) {
      const { sandbox } = this.state
      if (!sandbox) return

      this.checkStatus = {
        ...this.checkStatus,
        [optId]: !this.checkStatus[optId]
      }

      sandbox.updateCompilerSetting(optId, this.checkStatus[optId])
    },
  }
})
</script>

<style scoped>
.ConfigOptions {
  min-width: 160px;
  padding: 16px;
  height: 70vh;
  overflow-y: scroll;
}

.optionsList {
  list-style: none;
  padding-left: 0;
}

.optionsListItem {
  margin-bottom: 16px;
  white-space: nowrap;
}

.checkbox {
  margin-right: 8px;
}

.optionName {
  font-weight: bold;
}
</style>
