// 首页地址（默认）
export const HOME_URL = '/home';

// 登录页地址（默认）
export const LOGIN_URL = '/login';

// 默认主题颜色
export const DEFAULT_PRIMARY = '#409EFF';

// 路由白名单地址（必须是本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ['/login'];

// 默认应用配置
export const APP_CONFIG = {
  APP_TITLE: __APP_INFO__.APP_TITLE,
  APP_TITLE_SHORT: __APP_INFO__.APP_TITLE_SHORT,
  APP_MODE: import.meta.env.MODE,
  APP_ENV_DEV: import.meta.env.DEV,
  APP_ENV_PROD: import.meta.env.PROD,
  API_URL: import.meta.env.VITE_API_URL,
  BASE_URL: import.meta.env.VITE_BASE_URL
};
