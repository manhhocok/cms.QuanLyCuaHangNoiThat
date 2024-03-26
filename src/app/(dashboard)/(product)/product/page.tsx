'use client';
import { ProductType } from '@/app/type/product';
import BreadCrumbs from '@/app/component/BreadCrumbs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CategoryType } from '@/app/type/category';
import { ProductTypeType } from '@/app/type/product-type';
import { MaterialType } from '@/app/type/material';
import { IoIosSearch } from 'react-icons/io';
import {
  MdInfoOutline,
  MdOutlineDeleteForever,
  MdOutlineEdit,
} from 'react-icons/md';
import debounce from 'debounce';
import {
  TbChevronLeft,
  TbChevronLeftPipe,
  TbChevronRight,
  TbChevronRightPipe,
} from 'react-icons/tb';
import { RiLoader5Fill } from 'react-icons/ri';
import ProductInfo from '@/app/component/ProductCardInfo';
import AcceptModle from '@/app/component/AcceptModle';
import CustomTable, {
  CustomTBody,
  CustomTCol,
  CustomTFooter,
  CustomTHeder,
  CustomTRow,
} from '@/app/component/custom/CustomTable';
import { GetMaterials } from '@/app/api/service/material';
import { GetCategories } from '@/app/api/service/category';
import { GetProductType } from '@/app/api/service/productType';
import {
  CountProduct,
  GetProduct,
  getDetailProduct,
  getRemoveProduct,
} from '@/app/api/service/product';
import ProductForm from '@/app/component/ProductForm';
import { IoExitOutline } from 'react-icons/io5';

const Linkeerr = {
  path1: 'product',
  path2: 'Danh sách sản phẩm',
};
function Product() {
  const [dataProductDetail, setDataProductDetail] = useState<ProductType>();
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [dataCategory, setDataCategory] = useState<CategoryType[]>([]);
  const [dataProductType, setDataProductType] = useState<ProductTypeType[]>([]);
  const [dataMaterial, setDataMaterial] = useState<MaterialType[]>([]);
  const [isLoading, setIloading] = useState(true);
  const [textSearches, setTextSearches] = useState('');
  const [categoryId, setCategoryId] = useState<number>();
  const [typeId, setTypeId] = useState<number>();
  const [materialId, setMaterialId] = useState<number>();
  const [productId, setProductId] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [countProducts, setCountProducts] = useState<number>(10);
  const [showModleInfo, setShowModleInfo] = useState<boolean>(false);
  const [showModleDelete, setShowModleDelete] = useState<boolean>(false);
  const [showModleEdit, setShowModleEdit] = useState<boolean>(false);

  const debouncedSearch = debounce((nextValue: string) => {
    setTextSearches(nextValue);
  }, 1000);

  const fetchCountProduct = async () => {
    setIloading(true);
    const result = await CountProduct();
    setCountProducts(result ? result : []);
    setIloading(false);
  };

  const fetchProduct = async () => {
    setIloading(true);
    const result = await GetProduct(
      textSearches,
      categoryId,
      typeId,
      materialId,
      pageSize,
      page
    );
    setDataProduct(result ? result : []);
    fetchCountProduct();
    setIloading(false);
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

  useEffect(() => {
    setIloading(true);
    setTimeout(() => {
      fetchProduct();
    }, 1000);
  }, [textSearches, categoryId, typeId, materialId, pageSize, page]);

  const fetchProductDetail = async (id: number) => {
    setIloading(true);
    const result = await getDetailProduct(id);
    setDataProductDetail(result ? result : []);
    setIloading(false);
  };

  const handleShowInfo = async (id: number) => {
    await fetchProductDetail(id);
    setShowModleInfo(!showModleInfo);
  };

  const fetchProductRemove = async (id: number) => {
    setIloading(true);
    const result = await getRemoveProduct(id);
    return result;
  };

  const handleDelete = async (id?: number) => {
    setIloading(true);
    const result = id ? await fetchProductRemove(id) : undefined;
    if (result) {
      toast.success('xóa thành công');
      fetchProduct();
      setIloading(false);
    } else {
      toast.error('xóa thành thất bại');
    }
    setShowModleDelete(!showModleDelete);
  };

  const handleShowEditForm = async (id: number) => {
    await fetchProductDetail(id);
    setShowModleEdit(!showModleEdit);
  };

  return (
    <div className='w-full'>
      {showModleEdit ? (
        <div className='fixed top-0 left-0 w-full z-50 bg-black/[0.5] p-10 pb-96'>
          <div className='overflow-auto h-[600px] bg-slate-50 rounded-lg py-8 px-[10%]'>
            <div className='w-full flex justify-end fixed top-14 right-14'>
              <button
                onClick={() => {
                  setShowModleEdit(!showModleEdit);
                }}
                className='text-2xl'
              >
                <IoExitOutline />
              </button>
            </div>
            <ProductForm data={dataProductDetail} />
          </div>
        </div>
      ) : (
        ''
      )}

      {showModleInfo ? (
        <ProductInfo
          data={dataProductDetail ? dataProductDetail : undefined}
          handleShow={() => {
            setShowModleInfo(!showModleInfo);
          }}
        />
      ) : (
        <></>
      )}
      {showModleDelete ? (
        <AcceptModle
          handleAccept={() => {
            handleDelete(productId);
          }}
          handleExit={() => {
            setShowModleDelete(!showModleDelete);
          }}
          title='Bạn có muốn xóa sản phẩm này không?'
        />
      ) : (
        <></>
      )}

      <BreadCrumbs Linkeerr={Linkeerr} />
      <div className='flex justify-between p-5'>
        <div className='grid grid-cols-2 xl:grid-cols-3 gap-5 w-[70%]'>
          <form className='w-full'>
            <select
              onChange={(e) => {
                setCategoryId(Number(e.target.value));
              }}
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              <option value={''}>Category</option>
              {dataCategory.length > 0 ? (
                dataCategory.map((data, idx) => {
                  return (
                    <option
                      value={data.category_id}
                      key={idx}
                    >
                      {data.name}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </form>

          <form className='w-full'>
            <select
              onChange={(e) => {
                setTypeId(Number(e.target.value));
              }}
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              <option value={''}>Product type</option>
              {dataProductType.length > 0 ? (
                dataProductType.map((data, idx) => {
                  return (
                    <option
                      value={data.type_id}
                      key={idx}
                    >
                      {data.name}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </form>

          <form className='w-full'>
            <select
              onChange={(e) => {
                setMaterialId(Number(e.target.value));
              }}
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              <option value={''}>Material</option>
              {dataMaterial?.length > 0 ? (
                dataMaterial.map((data, idx) => {
                  return (
                    <option
                      value={data.material_id}
                      key={idx}
                    >
                      {data.name}
                    </option>
                  );
                })
              ) : (
                <></>
              )}
            </select>
          </form>
        </div>
        <div className='flex pl-10 h-[40px]'>
          <input
            type='text'
            className='rounded-l-3xl outline-none pl-5'
            placeholder='Nhập tên sản phẩm...'
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
          />
          <button className='text-2xl bg-white pr-2 rounded-r-3xl'>
            <IoIosSearch />
          </button>
        </div>
      </div>
      <CustomTable className='bg-white text-sm drop-shadow-lg mt-10'>
        <CustomTHeder className='bg-green-100 font-semibold px-2'>
          <CustomTRow className='h-16'>
            <CustomTCol className='w-[5%]'>#</CustomTCol>
            <CustomTCol className='w-[15%]'>TÊN SẢN PHẨM</CustomTCol>
            <CustomTCol className='w-[15%]'>GIÁ NIÊM YẾT</CustomTCol>
            <CustomTCol className='w-[15%]'>GIÁ</CustomTCol>
            <CustomTCol className='w-[25%]'>KÍCH THƯỚC</CustomTCol>
            <CustomTCol className='w-[15%]'>CÓ SẴN?</CustomTCol>
            <CustomTCol className='w-[10%]'> </CustomTCol>
          </CustomTRow>
        </CustomTHeder>
        <CustomTBody>
          {isLoading ? (
            <CustomTRow className='justify-center'>
              <div className='animate-spin text-3xl'>
                <RiLoader5Fill />
              </div>
            </CustomTRow>
          ) : dataProduct.length > 0 ? (
            dataProduct.map((data, index) => {
              return (
                <CustomTRow
                  key={index}
                  className='p-2 text-gray-600 hover:bg-green-50 h-16  border-t-[1px]'
                >
                  <CustomTCol className='w-[5%] text-black font-medium'>
                    {pageSize * page + (index + 1)}
                  </CustomTCol>
                  <CustomTCol className='w-[15%]'>{data?.name}</CustomTCol>
                  <CustomTCol className='w-[15%]'>
                    {data?.listed_price?.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </CustomTCol>
                  <CustomTCol className='w-[15%]'>
                    {data?.price?.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </CustomTCol>
                  <CustomTCol className='w-[25%]'>{data.dimensions}</CustomTCol>
                  <CustomTCol className='w-[15%]'>{data.available}</CustomTCol>
                  <CustomTCol className='w-[10%] flex justify-between text-2xl'>
                    <button
                      className='text-blue-400 hover:text-blue-600'
                      title='sửa'
                      onClick={() => {
                        handleShowEditForm(data?.product_id);
                      }}
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      onClick={() => {
                        setShowModleDelete(!showModleDelete);
                        setProductId(data?.product_id);
                      }}
                      className='text-red-400 hover:text-red-600'
                      title='Xóa'
                    >
                      <MdOutlineDeleteForever />
                    </button>
                    <button
                      className='hover:text-black'
                      title='Chi tiết'
                      onClick={() => {
                        handleShowInfo(data?.product_id);
                      }}
                    >
                      <MdInfoOutline />
                    </button>
                  </CustomTCol>
                </CustomTRow>
              );
            })
          ) : (
            <CustomTRow className='justify-center'>
              <div className='animate-spin text-3xl'>
                <RiLoader5Fill />
              </div>
            </CustomTRow>
          )}
        </CustomTBody>
        <CustomTFooter>
          <CustomTRow className='h-16 bg-green-100'>
            <CustomTCol className='flex justify-end w-full items-center gap-5'>
              <p className='text-black'>Total:{countProducts}</p>
              <div className='flex gap-2 items-center'>
                <p className=''>PageSize:</p>
                <select
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                  id='countries'
                  defaultValue={10}
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                >
                  <option value={5}> 5</option>
                  <option value={10}>10</option>
                  <option value={15}> 15</option>
                  <option value={20}> 20</option>
                  <option value={25}> 25</option>
                </select>
              </div>
              <div className='flex items-center text-xl gap-2'>
                <button
                  onClick={() => {
                    page > 0 ? setPage(0) : '';
                  }}
                  className=' flex items-center bg-white p-2 rounded-lg border-[1px] active:bg-slate-200'
                >
                  <TbChevronLeftPipe />
                </button>
                <button
                  onClick={() => {
                    page > 0 ? setPage(page - 1) : '';
                  }}
                  className='bg-white p-2 rounded-lg border-[1px] active:bg-slate-200'
                >
                  <TbChevronLeft />
                </button>
                <p className='text-black text-sm'>{`Page ${
                  page + 1
                } of ${Math.ceil(countProducts / pageSize)}`}</p>
                <button
                  onClick={() => {
                    page < Math.ceil(countProducts / pageSize) - 1
                      ? setPage(page + 1)
                      : '';
                  }}
                  className='bg-white p-2 rounded-lg border-[1px] active:bg-slate-200'
                >
                  <TbChevronRight />
                </button>
                <button
                  onClick={() => {
                    page < Math.ceil(countProducts / pageSize) - 1
                      ? setPage(Math.ceil(countProducts / pageSize) - 1)
                      : '';
                  }}
                  className='bg-white p-2 rounded-lg border-[1px] active:bg-slate-200'
                >
                  <TbChevronRightPipe />
                </button>
              </div>
            </CustomTCol>
          </CustomTRow>
        </CustomTFooter>
      </CustomTable>
    </div>
  );
}

export default Product;
