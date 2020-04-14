<template>
  <div :class="{ single: !$slots.default }" class="checkBox">
    <input :id="name + id" type="checkbox" :name="name" :checked="value" :disabled="disabled" @change="handleChange" />
    <label :for="name + id" :class="[size, { labelText: $slots.default }]">
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      default: 'check-group'
    },
    id: {
      type: String,
      default: 'check-box'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(e: { target: { checked: boolean } }) {
      this.$emit('input', e.target.checked)
    }
  }
})
</script>

<style scoped>
.checkBox {
  text-align: left;
}
label {
  margin: 0;
  display: inline-block;
}
.checkBox > div:not(:first-of-type) {
  margin-top: 24px;
}
.checkBox > div:not(:first-of-type).horizon {
  margin: 0 0 0 24px;
}
[type='checkbox']:checked,
[type='checkbox']:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type='checkbox']:checked + label,
[type='checkbox']:not(:checked) + label {
  position: relative;
  padding-left: 32px;
  cursor: pointer;
  height: 24px;
}
[type='checkbox']:checked + label:before,
[type='checkbox']:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 24px;
  height: 24px;
  transition: all 0.2s ease-in;
  border-radius: 4px;
  background: #F2F2F7;
  box-shadow:  2px 2px 4px #bdbdc1, 
              -2px -2px 4px #ffffff;
}
[type='checkbox']:not(:checked):hover + label:before {
  background: #F2F2F7;
  box-shadow: inset 2px 2px 4px #bdbdc1, 
              inset -2px -2px 4px #ffffff;
}
[type='checkbox']:checked:hover + label:before {
  background: #007ACC;
  box-shadow: inset 2px 2px 4px #005f9f, 
              inset -2px -2px 4px #0095f9;
}
[type='checkbox']:checked + label:after,
[type='checkbox']:not(:checked) + label:after {
  content: '';
  display: block;
  position: absolute;
  top: 4px;
  left: 9px;
  margin: auto;
  width: 7px;
  height: 13px;
  border: solid #bdbdc1;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}
[type='checkbox']:not(:checked):hover + label:after {
  border: solid #007ACC;
  border-width: 0 2px 2px 0;
}
[type='checkbox']:checked + label.lg,
[type='checkbox']:not(:checked) + label.lg {
  width: 32px;
  height: 32px;
}
[type='checkbox']:checked + label.lg.labelText,
[type='checkbox']:not(:checked) + label.lg.labelText {
  width: auto;
  height: auto;
  padding: 4px 0 0 40px;
  min-height: 32px;
}
[type='checkbox']:checked + label.lg:before,
[type='checkbox']:not(:checked) + label.lg:before {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
[type='checkbox']:checked + label.lg:after,
[type='checkbox']:not(:checked) + label.lg:after {
  top: 0;
  left: 11px;
  bottom: 4px;
  width: 10px;
  height: 18px;
  margin: auto;
}
[type='checkbox']:checked + label.sm,
[type='checkbox']:not(:checked) + label.sm {
  width: 16px;
  height: 16px;
}

[type='checkbox']:checked + label.sm.labelText,
[type='checkbox']:not(:checked) + label.sm.labelText {
  width: auto;
  height: auto;
  padding: 0 0 0 24px;
  min-height: 16px;
  font-size: 1.2rem;
}

[type='checkbox']:checked + label.sm:before,
[type='checkbox']:not(:checked) + label.sm:before {
  width: 16px;
  height: 16px;
  border-radius: 4px(4px);
}

[type='checkbox']:checked + label.sm:after,
[type='checkbox']:not(:checked) + label.sm:after {
  top: 0;
  left: 5px;
  bottom: 3px;
  width: 6px;
  height: 10px;
  margin: auto;
}

[type='checkbox']:not(:checked) + label:after {
  /* opacity: 0; */
}
[type='checkbox']:checked + label:before {
  background: #007ACC;
  border: 1px solid #007ACC;
}
[type='checkbox']:checked + label:after {
  opacity: 1;
}
[type='checkbox']:checked:disabled + label:before {
  border: none;
  background: transparent;
  cursor: auto;
}
[type='checkbox']:checked:disabled + label:after {
  border-color: #ddd;
  cursor: auto;
}
[type='checkbox']:checked:disabled + label.sm:before {
  background: #ddd;
  border: 1px solid #ddd;
  cursor: auto;
}
[type='checkbox']:checked:disabled + label.sm:after {
  border-color: #ddd;
  cursor: auto;
}

.checkBox.single {
  display: inline-block;
}
.checkBox.single [type='checkbox']:checked + label,
.checkBox.single [type='checkbox']:not(:checked) + label {
  padding-left: 0;
}
</style>