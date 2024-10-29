<template>
  <svg aria-hidden="true" class="svg-icon" v-bind="$attrs">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
defineOptions({
  name: 'NovaIcon'
});
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '24px'
  },
  color: {
    type: String,
    default: '#1B1B1B'
  }
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scope>
.svg-icon {
  border: none;
  overflow: hidden;
  width: v-bind(size);
  height: v-bind(size);
  /* fill: v-bind(color); */
}
</style>
