import * as instance from '@/utils/request';

export const GetProductType = async () => {
  try {
    const res: any = await instance.get(`product_types`, {
      params: {},
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};
