import { defineStore } from 'pinia';
import { GlobalState } from '@/stores/interface';
import { DEFAULT_PRIMARY } from '@/config';
import piniaPersistConfig from '@/utils/pinia-persist';

export const useGlobalStore = defineStore({
  id: 'nova-global',
  // 修改默认值之后，需清除 localStorage 数据
  state: (): GlobalState => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: 'vertical',
    // element 组件大小
    assemblySize: 'default',
    // 当前系统语言
    language: 'en',
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转
    asideInverted: false,
    // 头部反转
    headerInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 是否开启折叠菜单
    isOpenCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: false,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: false
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersistConfig('nova-global')
});