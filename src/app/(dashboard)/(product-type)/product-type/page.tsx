import BreadCrumbs from '@/app/component/BreadCrumbs';
import React from 'react';

function ProductType() {
  const Linkeerr = {
    path1: 'product-type',
    path2: 'Danh sách Product Type',
  };
  return (
    <div>
      <BreadCrumbs Linkeerr={Linkeerr} />
      ProductType
    </div>
  );
}

export default ProductType;
