import * as instance from '@/utils/request';

export const GetMaterials = async () => {
  try {
    const res: any = await instance.get(`materials`, {
      params: {},
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};
