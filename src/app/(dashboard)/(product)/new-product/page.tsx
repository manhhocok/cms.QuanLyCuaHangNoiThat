'use client';
import BreadCrumbs from '@/app/component/BreadCrumbs';
import ProductForm from '@/app/component/ProductForm';
import { UploadButton } from '@/utils/uploadthing';
const Linkeerr = {
  path1: 'product',
  path2: 'Thêm mới sản phẩm',
};
function NewProduct() {
  return (
    <div className='w-full'>
      <BreadCrumbs Linkeerr={Linkeerr} />
      <ProductForm />
    </div>
  );
}

export default NewProduct;
