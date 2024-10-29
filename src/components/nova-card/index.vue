<!--
 * @Author: WORK\arche archerspapa@gmail
 * @Date: 2024-08-01 17:51:32
 * @LastEditors: xjy archerspapa@gmail.com
 * @LastEditTime: 2024-08-15 11:06:32
 * @FilePath: \af-sub-pc\src\components\nova-card\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="border border-1px border-solid rounded-12px shadow-md overflow-hidden my-36px mx-16px border-#E8E5E0">
    <!-- 部分情况不需要title -->
    <div v-if="props.title !== ''" class="head bg-#E8E5E0 font-16 font-bold py-12px px-24px">{{ props.title }}</div>
    <div class="warp bg-white">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted, watchEffect } from 'vue';

/**
 * 路由实例
 */
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  //左右边距
  margin: {
    type: String,
    default: '16px'
  }
});
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
});
</script>
<style scoped lang="scss"></style>
