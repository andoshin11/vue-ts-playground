<template>
  <Modal v-if="!!modalForCode" :active="!!modalForCode" @close="close">
    <div class="ModalForCode">
      <h2 v-if="modalForCode.subtitle" class="subtitle">
        {{ modalForCode.subtitle }}
      </h2>
      <pre v-if="modalForCode.code" ref="pre" class="pre">
        <code class="code">{{ modalForCode.code }}</code>
      </pre>
      <div class="footer">
        <v-btn color="#187abf" dark @click="copy">
          Copy
        </v-btn>
        <v-btn color="#187abf" dark @click="selectAll">
          Select All
        </v-btn>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "@/components/Modal";
import { RootState } from "@/store";

export default Vue.extend({
  components: {
    Modal
  },
  computed: {
    modalForCode(): RootState["modalForCode"] {
      return this.$store.state.modalForCode;
    }
  },
  methods: {
    close() {
      this.$store.commit("storeModalForCode", null);
    },
    selectAll() {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this.$refs["pre"] as any);
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    copy() {
      const code = this.modalForCode && this.modalForCode.code;
      if (!code) return;
      navigator.clipboard.writeText(code);
    }
  }
});
</script>

<style scoped>
.ModalForCode {
  box-sizing: border-box;
  padding: 0 16px 24px;
  width: 100%;
  overflow: scroll;
}

.subtitle {
  margin-bottom: 16px;
  margin-top: 0;
}

.pre {
  width: 100%;
  overflow: scroll;
}

.code {
  overflow: scroll;
  position: relative;
  left: -58px;
  padding: 16px;
}

.footer > button {
  margin-right: 16px;
}
</style>
