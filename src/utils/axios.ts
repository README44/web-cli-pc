import { ElMessageBox } from 'element-plus';
import NovaMessage from '@/components/nova-message';
import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useUserStore } from '@/stores/modules/user';
import { APP_CONFIG, LOGIN_URL } from '@/config';

let showLogin = false;

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
  withCredentials: false // 跨域请求时是否需要使用凭证
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    // 添加token
    if (userStore.token) {
      (config as any).headers['Authorization'] = userStore.token;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理文件流
    if (
      response.headers['content-type']?.includes('application/vnd.ms-excel') ||
      response.headers['content-type']?.includes('application/octet-stream;charset=UTF-8')
    ) {
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      });
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobURL;
      const filename = JSON.parse(response.config.data);
      tempLink.setAttribute('download', filename.realFileName || '未命名');
      if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
      return Promise.resolve(blobURL);
    }
    // 处理普通请求
    if (response.data.code === 200) {
      return response.data;
    } else {
      if (response.request.responseType && response.request.responseType == 'blob') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const errData = JSON.parse(e.target.result);
          NovaMessage.error(errData?.msg || 'Response Error');
        };
        reader.readAsText(response.data);
      } else {
        if (response?.data?.code < 1000) {
          NovaMessage.warning(response?.data?.msg || response?.data?.error || 'Response Error');
        } else {
          NovaMessage.error(response?.data?.msg || response?.data?.error || 'Response Error');
        }
      }
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    const response: any = error.response;
    // Network Error为 axios 在网络有问题的时候返回的字符串
    if (error && error.code === 'ERR_NETWORK') {
      const errorMsg = error.message || 'Network Error';
      NovaMessage.error(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }
    // 如果是被cancel掉的，是没有response的，手工生事项会cancel掉请求
    if (axios.isCancel(error)) {
      return Promise.reject('Request canceled');
    }
    // token过期
    if (response.status === 401) {
      if (showLogin) return;
      showLogin = true;
      ElMessageBox.confirm(
        'For your security, your session has been automatically logged out due to inactivity.',
        'Automatic Logout',
        {
          confirmButtonText: 'log in',
          // cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false
        }
      )
        .then(() => {
          const userStore = useUserStore();
          showLogin = false;
          localStorage.clear();
          userStore.setToken('');
          window.location.replace(LOGIN_URL);
        })
        .catch(() => {
          showLogin = false;
        });
    } else {
      if (response?.data?.code > 1000) {
        NovaMessage.warning(response?.data?.msg || response?.data?.error || 'Bad Request');
      } else {
        NovaMessage.error(response?.data?.msg || response?.data?.error || 'Bad Request');
      }
    }
    throw error;
  }
);

// 导出 axios 实例
export default axiosInstance;
