<template>
  <div class="nova-date-picker">
    <el-date-picker
      v-bind="$attrs"
      v-model="data"
      popper-class="nova-date-picker-popper"
      :format="format"
      @change="changeDatePicker"
    />
  </div>
</template>

<script lang="tsx" setup>
const props = defineProps<{
  format: string;
  modelValue: any;
}>();

const data = ref<any>('');
watch(
  () => props.modelValue,
  val => {
    data.value = val;
  },
  { immediate: true }
);
const emit = defineEmits(['change']);
const changeDatePicker = (val: any) => {
  emit('change', val);
};
</script>

<style lang="scss" scoped>
.nova-date-picker {
  :deep(.el-input__wrapper) {
    .el-input__inner {
      text-transform: uppercase; // 将文本转换为大写
      &::placeholder {
        text-transform: none;
      }
    }
  }
}
</style>

<style lang="scss">
.nova-date-picker-popper {
  .el-picker-panel__body {
    .el-input__inner {
      text-transform: uppercase;
      &::placeholder {
        text-transform: none;
      }
    }
    .el-date-picker__header {
      .el-date-picker__header-label {
        text-transform: uppercase;
      }
    }
    .el-picker-panel__content {
      table {
        text-transform: uppercase;
      }
    }
  }
}
</style>
