import { useUserStore } from '@/stores/modules/user';
const permissions = useUserStore()?.userInfo?.roleResourcesResponse?.dutySpeeds;

/**
 * @description: 按权限过滤数组
 * @param {Array} obj 需要过滤的对象
 * @param {String} key 过滤依据的key
 * @return {*}
 */
export function filterAuth(obj: any[] = [], key = 'auth'): any {
  return obj.filter(item => permissions.includes(item[key] || item));
}
/**
 * @description: 是否存在权限
 * @param {Array} value 需要过滤的对象
 * @return {*}
 */
export function isAuth(value: any[] = []): any {
  if (value instanceof Array && value.length) {
    const hasPermission = value.every(item => permissions.includes(item));
    if (hasPermission) true;
    return false;
  } else {
    if (permissions.includes(value)) return true;
    return false;
  }
}
