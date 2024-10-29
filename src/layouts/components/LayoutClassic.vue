<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf">
        <div class="logo flex-center">
          <img class="logo-img" src="@/assets/vue.svg" alt="logo" />
          <span class="logo-text">{{ APP_TITLE }}</span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside class="p-y-15px">
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '280px' }">
          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :router="false"
              :collapse="isCollapse"
              :collapse-transition="false"
              :unique-opened="true"
            >
              <SubMenu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutClassic">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
import { APP_CONFIG } from '@/config';
import Main from '@/layouts/components/Main.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
const APP_TITLE = APP_CONFIG.APP_TITLE;
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px 0 0;
    background-color: var(--el-header-bg-color);
    border: 1px solid var(--el-header-border-color);
    .header-lf {
      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;
      .logo {
        flex-shrink: 0;
        width: 200px;
        margin-right: 16px;
        .logo-img {
          width: 28px;
          object-fit: contain;
          margin-right: 6px;
        }
        .logo-text {
          font-size: 21.5px;
          font-weight: bold;
          color: var(--el-header-logo-text-color);
          white-space: nowrap;
        }
      }
    }
  }
  .classic-content {
    display: flex;
    height: calc(100% - 55px);
    :deep(.el-aside) {
      width: auto;
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-aside-border-color);
      border-left: 1px solid var(--el-aside-border-color);
      border-bottom: 1px solid var(--el-aside-border-color);
      .aside-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: width 0.3s ease;
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
    }
    .classic-main {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
