<!-- 纵向布局 -->
<template>
  <el-container>
    <el-aside>
      <div class="aside-box" :style="{ width: isCollapse ? '65px' : '280px' }">
        <div class="w-full mt-16px text-center">
          <el-image v-show="!isCollapse" class="w-86px m-[0,auto]" :src="logoSrc"></el-image>
        </div>
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            :router="false"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutVertical">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';
import { LOGIN_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import Main from '@/layouts/components/Main.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
import router from '@/router';
import logoSrc from '@/assets/images/logo.svg';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const isCollapse = computed(() => globalStore.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
// 登出
const userStore = useUserStore();
const onLogout = () => {
  userStore.token = '';
  router.push(LOGIN_URL);
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  :deep(.el-aside) {
    width: auto;
    background-color: var(--el-menu-bg-color);
    // border-right: 1px solid var(--el-aside-border-color);
    border: 1px solid var(--el-aside-border-color);
    .aside-box {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: width 0.3s ease;
      .el-scrollbar {
        height: calc(100% - 250px);
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
    }
  }
  .el-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 15px;
    background-color: var(--el-header-bg-color);
    // 加背景色可删除
    border-top: 1px solid var(--el-header-border-color);
    border-right: 1px solid var(--el-header-border-color);

    border-bottom: 1px solid var(--el-header-border-color);
    :deep(.tool-bar-ri) {
      .toolBar-icon,
      .username {
        color: var(--el-header-text-color);
      }
    }
  }
}
</style>
