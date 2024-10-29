<template>
  <div class="flex gap-[10px] min-h-[36px] flex-wrap">
    <div v-if="showAll" class="f-item" :class="{ active: data === 'All' }" @click="handleChange('All')">All</div>
    <template v-if="optionType === 'string'">
      <div v-for="item in options" :key="item" class="f-item" :class="{ active: data === item }" @click="handleChange(item)">
        {{ item }}
      </div>
    </template>
    <template v-else>
      <div
        v-for="item in options"
        :key="item.value"
        class="f-item"
        :class="{ active: data === item.value }"
        @click="handleChange(item.value)"
      >
        {{ item.label }}
      </div>
    </template>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  showAll: {
    type: Boolean,
    default: false
  }
});
const data = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    return emit('update:modelValue', newVal);
  }
});
const optionType = computed(() => {
  return props.options.length > 0 ? typeof props.options[0] : 'string';
});
const emit = defineEmits(['update:modelValue', 'change']);
const handleChange = value => {
  data.value = value;
  emit('change', value);
};
</script>
<style scoped lang="scss">
.f-item {
  padding: 6px 10px;
  text-align: center;
  box-sizing: border-box;
  min-width: 70px;
  --un-bg-opacity: 1;
  background-color: rgb(240 244 236 / var(--un-bg-opacity));
  border-radius: 20px;
  -webkit-user-select: none;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #929584;
  &.active {
    --un-text-opacity: 1;
    color: #ffffff;
    background-color: #57af61;
    transition: background-color 0.3s ease-in;
  }
}
</style>
