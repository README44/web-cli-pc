<template>
  <div class="layout">
    <div class="content">
      <component :is="LayoutComponents[layout]" />
      <ThemeDrawer />
    </div>
  </div>
</template>

<script setup lang="ts" name="layout">
import { computed, type Component } from 'vue';
import { LayoutType } from '@/stores/interface';
import { useGlobalStore } from '@/stores/modules/global';

import ThemeDrawer from '@/layouts/components/ThemeDrawer.vue';
import LayoutVertical from '@/layouts/components/LayoutVertical.vue';
import LayoutClassic from '@/layouts/components/LayoutClassic.vue';
import LayoutTransverse from '@/layouts/components/LayoutTransverse.vue';
import LayoutColumns from '@/layouts/components/LayoutColumns.vue';

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  // background: linear-gradient(180deg, #b8c6ab -8.56%, rgba(200, 210, 191, 0.4) 23.09%, #f1f2ef 96.03%);
  .content {
    width: 100%;
    max-width: 1920px;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    margin: 0 auto;
  }
}
</style>
