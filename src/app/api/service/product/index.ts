import { Productbody } from '@/app/type/product';
import * as instance from '@/utils/request';

export const GetProduct = async (
  textSearches?: string,
  categoryId?: number,
  typeId?: number,
  materialId?: number,
  pageSize?: number,
  page?: number
) => {
  try {
    const res: any = await instance.get(`products`, {
      params: {
        page: page,
        pageSize: pageSize,
        name: textSearches,
        category_id: categoryId ? categoryId : undefined,
        type_id: typeId ? typeId : undefined,
        material_id: materialId ? materialId : undefined,
      },
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

export const CountProduct = async () => {
  try {
    const res: any = await instance.get(`products/dem/ok`, {
      params: {},
    });
    return res.count;
  } catch (err: any) {
    console.log(err);
  }
};

export const getDetailProduct = async (id: number) => {
  try {
    const res: any = await instance.get(`products/${id}`, {
      params: {},
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

export const getRemoveProduct = async (id: number) => {
  try {
    const res: any = await instance.remove(`products/${id}`, {
      params: {},
    });
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

export const createProduct = async (data: Productbody) => {
  try {
    const res: any = await instance.post(`products`, data);
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

export const updateProduct = async (id: number, data: Productbody) => {
  try {
    const res: any = await instance.patch(`products/${id}`, data);
    return res;
  } catch (err: any) {
    console.log(err);
  }
};
