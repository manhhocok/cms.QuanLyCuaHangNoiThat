'use client';
import React, { useEffect, useState } from 'react';
import CustomUploadImages from './custom/CustomUploadImages';
import CustomInput from './custom/CustomInput';
import axios from 'axios';
import { CategoryType } from '../type/category';
import { ProductTypeType } from '../type/product-type';
import { MaterialType } from '../type/material';
import { toast } from 'react-toastify';
import CustomTextarea from './custom/CustomTextarea';
import AcceptModle from './AcceptModle';
import { GetMaterials } from '../api/service/material';
import { GetCategories } from '../api/service/category';
import { GetProductType } from '../api/service/productType';
import { ProductType } from '../type/product';
import { createProduct, updateProduct } from '../api/service/product';
function ProductForm({ data }: { data?: ProductType }) {
  const [imgURL1, setImgURL1] = useState(data?.image.split(' ')[0] || '');
  const [imgURL2, setImgURL2] = useState(data?.image.split(' ')[1] || '');
  const [imgURL3, setImgURL3] = useState(data?.image.split(' ')[2] || '');
  const [imgURL4, setImgURL4] = useState(data?.image.split(' ')[3] || '');
  const [name, setName] = useState(data?.name || '');
  const [dimensions, setDimensions] = useState(data?.dimensions || '');
  const [available, setAvailable] = useState(data?.available || '');
  const [description, setDescription] = useState(data?.description || '');
  const [listed_price, setListed_price] = useState(data?.listed_price || 0);
  const [price, setPrice] = useState(data?.price || 0);
  const [status, setStatus] = useState<number>(data?.status ? 1 : 0);
  const [categoryId, setCategoryId] = useState<number>(
    data?.category.category_id || 0
  );
  const [typeId, setTypeId] = useState<number>(data?.productType.type_id || 0);
  const [materialId, setMaterialId] = useState<number>(
    data?.material.material_id || 0
  );
  const [dataCategory, setDataCategory] = useState<CategoryType[]>([]);
  const [dataProductType, setDataProductType] = useState<ProductTypeType[]>([]);
  const [dataMaterial, setDataMaterial] = useState<MaterialType[]>([]);
  const [isLoading, setIloading] = useState(true);
  const [showModle, setShowModle] = useState(false);
  const resetStates = () => {
    setImgURL1(data?.image.split(' ')[0] || '');
    setImgURL2(data?.image.split(' ')[1] || '');
    setImgURL3(data?.image.split(' ')[2] || '');
    setImgURL4(data?.image.split(' ')[3] || '');
    setName(data?.name || '');
    setDimensions(data?.dimensions || '');
    setAvailable(data?.available || '');
    setDescription(data?.description || '');
    setListed_price(data?.listed_price || 0);
    setPrice(data?.price || 0);
    setStatus(data?.status ? 1 : 0); // Hoặc bất kỳ giá trị mặc định nào bạn muốn cho status
    setCategoryId(data?.category.category_id || 0);
    setTypeId(data?.productType.type_id || 0);
    setMaterialId(data?.material.material_id || 0);
  };

  const fetchMaterials = async () => {
    setIloading(true);
    const result = await GetMaterials();
    setDataMaterial(result ? result : []);
    setIloading(false);
  };
  const fetchCategories = async () => {
    setIloading(true);
    const result = await GetCategories();
    setDataCategory(result ? result : []);
    setIloading(false);
  };
  const fetchProductType = async () => {
    setIloading(true);
    const result = await GetProductType();
    setDataProductType(result ? result : []);
    setIloading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProductType();
    fetchMaterials();
  }, []);

  const fetchProductAdd = async () => {
    setIloading(true);
    if (materialId && typeId && categoryId) {
      const result = await createProduct({
        listed_price: listed_price,
        price: price,
        name: name,
        dimensions: dimensions,
        available: available,
        description: description,
        image: `${imgURL1} ${imgURL2} ${imgURL3} ${imgURL4}`,
        status: status ? true : false,
        material_id: materialId,
        type_id: typeId,
        category_id: categoryId,
      });
      return result;
    } else {
      return 0;
    }
  };

  const addProduct = async () => {
    setIloading(true);
    const result = await fetchProductAdd();

    if (result) {
      toast.success('thêm thành công');
      setIloading(false);
    } else {
      toast.error('thêm thất bại');
      setIloading(false);
    }
  };

  const fetchProductEdit = async () => {
    setIloading(true);
    if (materialId && typeId && categoryId && data?.product_id) {
      const result = await updateProduct(data.product_id, {
        listed_price: listed_price,
        price: price,
        name: name,
        dimensions: dimensions,
        available: available,
        description: description,
        image: `${imgURL1} ${imgURL2} ${imgURL3} ${imgURL4}`,
        status: status ? true : false,
        material_id: materialId,
        type_id: typeId,
        category_id: categoryId,
      });
      return result;
    } else {
      return 0;
    }
  };

  const editProduct = async () => {
    setIloading(true);
    const result = await fetchProductEdit();

    if (result) {
      toast.success('sửa thành công');
      setIloading(false);
    } else {
      toast.error('sửa thất bại');
      setIloading(false);
    }
  };

  const handleSubmit = async () => {
    if (data?.product_id) {
      await editProduct();
    } else {
      await addProduct();
    }
  };

  return (
    <div className='w-full mt-10'>
      <div className='w-full flex flex-col'>
        {/* <ImageUploand /> */}
        <CustomUploadImages
          heightImg='h-[500px]'
          imgURL={imgURL1}
          hanldeOnClientUpload={(res) => {
            setImgURL1(res[0].url);
          }}
        />

        <div className='grid grid-cols-3 gap-4 pt-5'>
          <CustomUploadImages
            heightImg='h-[200px]'
            imgURL={imgURL2}
            hanldeOnClientUpload={(res) => {
              setImgURL2(res[0].url);
            }}
          />
          <CustomUploadImages
            heightImg='h-[200px]'
            imgURL={imgURL3}
            hanldeOnClientUpload={(res) => {
              setImgURL3(res[0].url);
            }}
          />
          <CustomUploadImages
            heightImg='h-[200px]'
            imgURL={imgURL4}
            hanldeOnClientUpload={(res) => {
              setImgURL4(res[0].url);
            }}
          />
        </div>
        <div className='w-full grid grid-cols-1 gap-6 pt-6'>
          <CustomInput
            value={name}
            type='text'
            titles='Tên sản phẩm'
            onChange={(e) => {
              setName(e);
            }}
          />
          <div className='grid grid-cols-2 gap-6'>
            <CustomInput
              value={listed_price}
              type='number'
              titles='Giá niêm yết'
              onChange={(e) => {
                setListed_price(e);
              }}
            />
            <CustomInput
              value={price}
              type='number'
              titles='Giá'
              onChange={(e) => {
                setPrice(e);
              }}
            />
            <CustomInput
              value={dimensions}
              type='text'
              titles='Kích thước'
              onChange={(e) => {
                setDimensions(e);
              }}
            />
            <CustomInput
              value={available}
              type='text'
              titles='Có sẵn'
              onChange={(e) => {
                setAvailable(e);
              }}
            />
            <form className='w-full'>
              <p className='font-medium pb-2'>Category</p>
              <select
                onChange={(e) => {
                  setCategoryId(Number(e.target.value));
                }}
                id='countries'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              >
                <option value={0}>{data?.category.name || 'Category'}</option>
                {dataCategory.length > 0 ? (
                  dataCategory.map((data, idx) => {
                    return (
                      <option
                        value={data?.category_id}
                        key={idx}
                      >
                        {data?.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </form>

            <form className='w-full'>
              <p className='font-medium pb-2'>Product type</p>
              <select
                onChange={(e) => {
                  setTypeId(Number(e.target.value));
                }}
                id='countries'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              >
                <option value={0}>
                  {data?.productType.name || 'Product type'}
                </option>
                {dataProductType.length > 0 ? (
                  dataProductType.map((data, idx) => {
                    return (
                      <option
                        value={data?.type_id}
                        key={idx}
                      >
                        {data?.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </form>

            <form className='w-full'>
              <p className='font-medium pb-2'>Material</p>
              <select
                onChange={(e) => {
                  setMaterialId(Number(e.target.value));
                }}
                id='countries'
                className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              >
                <option value={0}>{data?.material.name || 'Material'}</option>
                {dataMaterial.length > 0 ? (
                  dataMaterial.map((data, idx) => {
                    return (
                      <option
                        value={data?.material_id}
                        key={idx}
                      >
                        {data?.name}
                      </option>
                    );
                  })
                ) : (
                  <></>
                )}
              </select>
            </form>
            <div className='flex flex-col '>
              <p className='font-medium pb-2'>Trạng thái hoạt động</p>
              <div className='flex gap-6 items-center'>
                <div className='flex items-center gap-2'>
                  <input
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                    type='radio'
                    value='1'
                    id='yes'
                    name='status'
                    checked={status === 1}
                    onClick={() => setStatus(1)}
                  />
                  <label htmlFor='yes'>Có</label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500'
                    type='radio'
                    value='0'
                    id='no'
                    name='status'
                    checked={status === 0}
                    onClick={() => setStatus(0)}
                  />
                  <label htmlFor='no'>Không</label>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-6'>
            <CustomTextarea
              title='Chi tiết'
              value={description}
              onChange={(e) => {
                setDescription(e);
              }}
            />
          </div>
          <div className='flex gap-4'>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className='bg-blue-600 text-white font-medium rounded-lg py-2 px-5 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300'
            >
              {data?.product_id ? 'Lưu thay đổi' : 'Tạo'}
            </button>
            <button
              onClick={() => {
                setShowModle(true);
              }}
              className='bg-white font-medium rounded-lg py-2 px-5 hover:bg-gray-500 hover:text-white active:bg-black active:text-white focus:outline-none focus:ring focus:ring-gray-300'
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {showModle && (
        <AcceptModle
          title='Bạn chắc chắn muốn reset dữ liệu chứ?'
          handleAccept={() => {
            resetStates();
            setShowModle(false);
          }}
          handleExit={() => {
            setShowModle(false);
          }}
        />
      )}
    </div>
  );
}

export default ProductForm;
