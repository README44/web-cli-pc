<template>
  <el-select v-if="roleOptions.length" v-model="curRole" class="mr-24px w-280px" @change="onRoleChange">
    <el-option v-for="(item, index) in roleOptions" :key="index" :index="index.toString()" :label="item" :value="item" />
  </el-select>
</template>
<script lang="tsx" setup>
import api from '@/api';
import { HOME_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user';

const router = useRouter();
// 角色选择
const role = useUserStore()?.userInfo?.roleResourcesResponse?.role;
const curRole = ref(role);
const roleOptions = ref<any>([]);
// 获取角色list
const getVirtualRole = async () => {
  const { data } = await api.common.getVirtualRole();
  roleOptions.value = data;
};
getVirtualRole();
// 获取当前角色
const getCurRole = async () => {
  const { data } = await api.common.getRoleResources({});
  let v = useUserStore().userInfo;
  v.roleResourcesResponse = data;
  useUserStore().setUserInfo(v);
};
getCurRole();
// 角色选择
const onRoleChange = async (val: any) => {
  const { data } = await api.common.getRoleResources({
    roleName: val
  });
  let v = useUserStore().userInfo;
  v.roleResourcesResponse = data;
  useUserStore().setUserInfo(v);
  router.replace({ path: HOME_URL });
  setTimeout(() => {
    location.reload();
  }, 300);
};
</script>
