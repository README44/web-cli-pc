import { defineStore } from 'pinia';
import piniaPersistConfig from '@/utils/pinia-persist';

export const useEnumStore = defineStore({
  id: 'nova-dict-data',
  state: (): Enum.Options => ({
    enums: []
  }),
  getters: {},
  actions: {
    // Set Enum
    setEnums(enums: Enum.Options) {
      this.enums = enums;
    },
    // Get Enum
    getEnums() {
      return this.enums;
    },
    // 根据dictName获取dictListResponse
    getDictRes(dictName: String) {
      return this.enums.find((item: Enum.Props) => item.dictName === dictName)?.dictListResponse;
    }
  },
  persist: piniaPersistConfig('nova-dict-data')
});
