<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <div class="flex items-center cursor-pointer">
      <div class="size-25px ml-20px">
        <el-image class="size-100% rounded-100%" fit="cover" :src="userAvatar ?? defaultAvatar"></el-image>
      </div>
      <span class="m-x-16px">{{ userName }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="w-180px">
        <el-dropdown-item @click="onLogoutClick">
          <el-icon>
            <st-i-power theme="outline" size="24" />
          </el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/images/avatar.png';
import { LOGIN_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const userAvatar = userStore?.userInfo?.img;
const userName = userStore?.userInfo?.name;
const router = useRouter();
// 退出登录
const onLogoutClick = () => {
  userStore.setToken('');
  router.replace(LOGIN_URL);
};
</script>
