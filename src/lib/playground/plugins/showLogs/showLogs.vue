<template>
  <div class="showLogs">
    <div>
      <v-btn @click="runWithCustomLogs" class="action">Run Program</v-btn>
      <v-btn @click="output = []" class="action">Reset</v-btn>
    </div>
    <ul class="logs">
      <li v-for="(log, i) in output" :key="i" class="log">
        <hr v-if="log.logType === 'separator'" class="separator"/>
        <template v-else>
          [<span class="logType">{{ log.logType.toUpperCase() }}</span>]: {{ formatContent(log.content) }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Primitive } from '@/types/utils'
import { RootState } from '@/store'

interface IData {
  output: ({
    logType: keyof typeof console;
    content: Primitive[]
  } | { logType: 'separator' })[]
}

export default Vue.extend({
  name: 'showLogs',
  data(): IData {
    return {
      output: []
    }
  },
  computed: {
    state(): RootState {
      return this.$store.state
    }
  },
  methods: {
    async runWithCustomLogs() {
      const { sandbox } = this.state
      if (!sandbox) return
      const closure = await sandbox.getRunnableJS()

      this.output = [
        ...this.output,
        { logType: 'separator' }
      ]

      eval(closure)
    },
    undoLoggingFunc(name: keyof typeof console) {
      // @ts-ignore
      console[name] = console['old' + name]
    },
    fixLoggingFunc(name: keyof typeof console, id: string) {
      const vm = this

      // escape native func
      // @ts-ignore
      console['old' + name] = console[name]

      // override func
      console[name] = function(...objs: any[]) {
        const output = vm.produceOutput(objs)
        vm.output = [
          ...vm.output,
          { logType: name, content: output }
        ]
        // @ts-ignore
        console["old" + name].apply(undefined, objs);
      }
    },
    produceOutput(args: (Primitive | object | Error)[]): Primitive[] {
      return args.map(arg => {
        if (arg && typeof arg === 'object' && 'stack' in arg && 'message' in arg) {
          return arg.message
        } else if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2)
        } else {
          return arg
        }
      })
    },
    formatContent(content: Primitive[]): string {
      return content.map(c => {
        switch(typeof c) {
          case 'string':
            return c
          case 'number':
            return c + ''
          case 'bigint':
            return c + ''
          case 'boolean':
            return c ? 'true' : 'false'
          case 'symbol':
            return c.toString()
          case 'undefined':
            return 'undefined'
          default:
            return 'null'
        }
      }).join(', ')
    }
  },
  mounted() {
    this.fixLoggingFunc('log', 'LOG')
    this.fixLoggingFunc("debug", "DBG");
    this.fixLoggingFunc("warn", "WRN");
    this.fixLoggingFunc("error", "ERR");
    this.fixLoggingFunc("info", "INF");
  },
  beforeDestroy() {
    this.undoLoggingFunc("log");
    this.undoLoggingFunc("debug");
    this.undoLoggingFunc("warn");
    this.undoLoggingFunc("error");
    this.undoLoggingFunc("info");
  }
})
</script>

<style scoped>
.action {
  margin-right: 16px;
}

.logs {
  max-height: 70vh;
  overflow-y: scroll;
  margin-top: 16px;
  padding: 0;
  width: 100%;
}

.log {
  list-style: none;
  font-family: Menlo,Monaco,Consolas,Courier New,monospace;
  overflow-x: scroll;
  white-space: nowrap;
}

.logType {
  color: silver;
}

.separator {
  border: 0;
  border-bottom: 1px dashed #ccc;
  background: #fff;
  margin: 8px 0;
}
</style>
