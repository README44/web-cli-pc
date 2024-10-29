import service from '@/utils/axios';

export const example = async (params: any) => {
  return (await service).post<any>('/test/example', params);
};