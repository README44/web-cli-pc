<template>
  <el-row class="wh-full">
    <el-col :span="12" class="flex items-center justify-end w-100%">
      <div class="w-738px h-512px wh-full relative">
        <div class="login-img"></div>
        <el-button class="h-56px w-656px rounded-40px mt-56px" type="primary" @click="onLoginClick()">Login</el-button>
      </div>
    </el-col>
    <el-col :span="12" class="flex items-center justify-start w-100%">
      <div class="bg wh-full relative w-658px h-735px">
        <!-- <div class="top-img absolute right-20px top-20px w-250px h-200px"></div> -->
      </div>
    </el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  title: 登录
  layout: false
</route>

<script lang="ts" setup>
import { HOME_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
// 登录
const onLoginClick = async () => {
  userStore.setToken('st-token');
  router.push(HOME_URL);
};
</script>

<style lang="scss" scope>
.top-img {
  background: url('@/assets/images/login/login1.png') no-repeat center 100%/100%;
}
.bg {
  background: url('@/assets/images/login/bg.png') no-repeat center;
  background-size: cover;
}
.login-img {
  background: url('@/assets/images/login/login2.png') no-repeat center 100%/100%;
  width: 656px;
  height: 393px;
}
</style>
