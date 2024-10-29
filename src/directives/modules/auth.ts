/**
 * v-auth
 * 按钮权限指令
 */
import { useUserStore } from '@/stores/modules/user';
import type { Directive, DirectiveBinding } from 'vue';

// 现在权限接口比较粗暴，后端直接返回用户所有权限，后面肯定要根据请求页面优化，该方法暂时注释保留
// const auth: Directive = {
//   mounted(el: HTMLElement, binding: DirectiveBinding) {
//     const { value } = binding;
//     const authStore = useAuthStore();
//     const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? [];
//     if (value instanceof Array && value.length) {
//       const hasPermission = value.every(item => currentPageRoles.includes(item));
//       if (!hasPermission) el.remove();
//     } else {
//       if (!currentPageRoles.includes(value)) el.remove();
//     }
//   }
// };
const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const permissions = useUserStore()?.userInfo?.roleResourcesResponse?.dutySpeeds || [];
    if (value instanceof Array && value.length) {
      const hasPermission = value.every(item => permissions.includes(item));
      if (!hasPermission) el.remove();
    } else {
      if (!permissions.includes(value)) el.remove();
    }
  }
};

export default auth;
