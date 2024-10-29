import { defineStore } from 'pinia';
import { UserState } from '@/stores/interface';
import piniaPersistConfig from '@/utils/pinia-persist';

export const useUserStore = defineStore({
  id: 'nova-user',
  state: (): UserState => ({
    token: '',
    userInfo: { name: 'admin' }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig('nova-user')
});
