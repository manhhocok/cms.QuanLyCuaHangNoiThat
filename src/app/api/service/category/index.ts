import * as instance from '@/utils/request';

export const GetCategories = async () => {
  try {
    const res: any = await instance.get(`categories`, {
      params: {},
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};
