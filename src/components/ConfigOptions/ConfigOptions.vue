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
      <div v-for="(category, categoryId) in categoryMap" :key="categoryId" class="category">
        <h4>{{ categoryName(categoryId) }}</h4>
        <ul class="optionsList">
          <li v-for="(summary, optId) in category" :key="optId" class="optionsListItem">
            <label>
              <input
                type="checkbox"
                :checked="compilerOptions[optId]"
                :name="summary.id"
                :id="'option-' + summary.id"
                class="checkbox"
                @click="toggleChckStatus(optId)"
              >
              <span class="optionName">{{ summary.id }}</span>
              <br/>
              <span>{{ summary.oneliner }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { languages } from 'monaco-editor'
import { RootState } from '@/store'
import { optionsSummary, OptionsSummary } from '@/lib/playground/const/optionsSummary'

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
    categoryName(categoryId: string): string | null {
      const category = this.categoryMap[categoryId]
      if (!category || !Object.keys(category).length) return null
      const representOpt = Object.values(category)[0]
      return representOpt.categoryDisplay 
    },
    setCategoryMap() {
      const { compilerOptions } = this

      const boolOptions = Object.keys(compilerOptions || {})
        .filter(k => typeof compilerOptions![k] === 'boolean')

      boolOptions.forEach(optId => {
        const summary = optionsSummary.find(sum => optId === sum.id)
        if (!summary) return

        const existingCategory = this.categoryMap[summary.categoryID]
        if (!existingCategory) {
          this.categoryMap = {
            ...this.categoryMap,
            [summary.categoryID]: {}
          }
        } 

        this.categoryMap = {
          ...this.categoryMap,
          [summary.categoryID]: {
            ...this.categoryMap[summary.categoryID],
            [optId]: summary
          }
        }
      })
    }
  },
  mounted() {
    this.setCategoryMap()
  }
})
</script>

<style scoped>
.ConfigOptions {
  background-color: #fff;
  padding: 16px;
  height: 90vh;
  overflow-y: scroll;
}

.checkOptions {
  display: flex;
  flex-wrap: wrap;
}

.category {
  width: 50%;
}

.optionsList {
  list-style: none;
}

.optionsListItem {
  margin-bottom: 8px;
}

.checkbox {
  margin-right: 8px;
}

.optionName {
  font-weight: bold;
}
</style>
