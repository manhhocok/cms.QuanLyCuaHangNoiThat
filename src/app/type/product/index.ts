import { CategoryType } from '../category';
import { MaterialType } from '../material';
import { ProductTypeType } from '../product-type';

export type ProductType = {
  product_id: number;
  listed_price: number;
  price: number;
  name: string;
  material: MaterialType;
  dimensions: string;
  available: string;
  description: string;
  status: boolean;
  image: string;
  productType: ProductTypeType;
  category: CategoryType;
};
