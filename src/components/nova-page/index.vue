<template>
  <div class="nova-page">
    <div v-if="props.title" class="flex items-center mb-32px justify-between box-border px-32px">
      <div class="font-size-24px fw-700">{{ props.title }}</div>
    </div>
    <div class="flex-1 overflow-hidden box-border">
      <div class="flex-col wh-full">
        <!-- 内容 -->
        <div class="flex-1 px-32px overflow-auto">
          <slot name="container" />
        </div>
        <!-- 底部功能组 -->
        <div v-if="$slots['footer']" class="pt-16px px-32px">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  // 页面标题
  title: {
    type: String,
    default: ''
  }
});
</script>
<style lang="scss" scoped>
.nova-page {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  // border-radius: 18px;
  padding: 32px 0;
  box-sizing: border-box;
}
</style>
