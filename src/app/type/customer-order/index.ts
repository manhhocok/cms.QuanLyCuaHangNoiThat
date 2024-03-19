import { ProductType } from '../product';
import { UserType } from '../user';

export type CustomerOrder = {
  user: UserType;
  product: ProductType;
  voucher: number;
  listed_price: number;
  price: number;
  quantity: number;
  total_price: number;
};
