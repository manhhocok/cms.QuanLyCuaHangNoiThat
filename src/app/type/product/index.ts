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

export type Productbody = {
  listed_price: number;
  price: number;
  name: string;
  dimensions: string;
  available: string;
  description: string;
  image: string;
  status: boolean;
  material_id: number;
  type_id: number;
  category_id: number;
};
