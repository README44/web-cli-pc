<!-- 横向布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flex-center">
        <img class="logo-img" src="@/assets/vue.svg" alt="logo" />
        <span class="logo-text">{{ APP_TITLE }}</span>
      </div>
      <el-menu mode="horizontal" :default-active="activeMenu" :router="false" :unique-opened="true">
        <!-- 不能直接使用 SubMenu 组件，无法触发 el-menu 隐藏省略功能 -->
        <template v-for="subItem in menuList" :key="subItem.path">
          <el-sub-menu v-if="subItem.children?.length" :key="subItem.path" :index="subItem.path + 'el-sub-menu'">
            <template #title>
              <el-icon>
                <component :is="subItem.meta.icon"></component>
              </el-icon>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menu-list="subItem.children" />
          </el-sub-menu>
          <el-menu-item v-else :key="subItem.path + 'el-menu-item'" :index="subItem.path" @click="handleClickMenu(subItem)">
            <el-icon>
              <component :is="subItem.meta.icon"></component>
            </el-icon>
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <ToolBarRight />
    </el-header>
    <Main />
  </el-container>
</template>

<script setup lang="ts" name="layoutTransverse">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/modules/auth';
import { useRoute, useRouter } from 'vue-router';
import { APP_CONFIG } from '@/config';
import Main from '@/layouts/components/Main.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
const APP_TITLE = APP_CONFIG.APP_TITLE;

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank');
  router.push(subItem.path);
};
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
  border: 1px solid var(--el-aside-border-color);
  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px 0 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
    .logo {
      width: 200px;
      margin-right: 30px;
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
    .el-menu {
      flex: 1;
      height: 100%;
      overflow: hidden;
      border-bottom: none;
      .el-sub-menu__hide-arrow {
        width: 65px;
        height: 55px;
      }
      .el-menu-item.is-active {
        color: #ffffff !important;
      }
      .is-active {
        background-color: var(--el-color-primary) !important;
        border-bottom-color: var(--el-color-primary) !important;
        &::before {
          width: 0;
        }
        .el-sub-menu__title {
          color: #ffffff !important;
          background-color: var(--el-color-primary) !important;
          border-bottom-color: var(--el-color-primary) !important;
        }
      }
    }
  }

  @media screen and (width <= 730px) {
    .logo {
      display: none !important;
    }
  }
}
</style>
