'use client';
import { ProductType } from '@/app/type/product';
import BreadCrumbs from '@/app/component/BreadCrumbs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import ProductInfo from '@/app/component/ProductInfo';
import AcceptModle from '@/app/component/AcceptModle';
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
  const [isLoanding, setIloanding] = useState(true);
  const [textSearches, setTextSearches] = useState('');
  const [categoryId, setCategoryId] = useState<number>();
  const [typeId, setTypeId] = useState<number>();
  const [materialId, setMaterialId] = useState<number>();
  const [productId, setProductId] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [countProducts, setCountProducts] = useState<number>(10);
  const [showModle, setShowModle] = useState<boolean>(false);
  const [showModleDelete, setShowModleDelete] = useState<boolean>(false);

  const debouncedSearch = debounce((nextValue: string) => {
    setTextSearches(nextValue);
  }, 1000);

  const getTotalProducts = () => {
    setIloanding(true);
    axios
      .get(`http://localhost:3000/api/products/dem/ok`, {
        params: {},
      })
      .then((res: any) => {
        setCountProducts(res.data.count);
        // console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
        setCountProducts(0);
      })
      .finally(() => {
        setIloanding(false);
      });
  };

  const getProduct = () => {
    setIloanding(true);
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/products`, {
          params: {
            page: page,
            pageSize: pageSize,
            name: textSearches,
            category_id: categoryId ? categoryId : undefined,
            type_id: typeId ? typeId : undefined,
            material_id: materialId ? materialId : undefined,
          },
        })
        .then((res) => {
          setDataProduct(res.data);
          // console.log(res);
          getTotalProducts();
        })
        .catch((err) => {
          // toast.error(err.message);
          setDataProduct([]);
        })
        .finally(() => {
          setIloanding(false);
        });
    }, 1000);
  };

  useEffect(() => {
    setIloanding(true);
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/products`, {
          params: {
            page: page,
            pageSize: pageSize,
            name: textSearches,
            category_id: categoryId ? categoryId : undefined,
            type_id: typeId ? typeId : undefined,
            material_id: materialId ? materialId : undefined,
          },
        })
        .then((res) => {
          setDataProduct(res.data);
          // console.log(res);
          getTotalProducts();
        })
        .catch((err) => {
          // toast.error(err.message);
          setDataProduct([]);
        })
        .finally(() => {
          setIloanding(false);
        });
    }, 1000);
  }, [textSearches, categoryId, typeId, materialId, pageSize, page]);

  const getCategory = () => {
    setIloanding(true);
    axios
      .get(`http://localhost:3000/api/categories`, {
        params: {},
      })
      .then((res: any) => {
        setDataCategory(res.data);
        // console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
        setDataCategory([]);
      })
      .finally(() => {
        setIloanding(false);
      });
  };
  const getProductType = () => {
    setIloanding(true);
    axios
      .get(`http://localhost:3000/api/product_types`, {
        params: {},
      })
      .then((res: any) => {
        setDataProductType(res.data);
        // console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
        setDataProductType([]);
      })
      .finally(() => {
        setIloanding(false);
      });
  };

  const getMaterial = () => {
    setIloanding(true);
    axios
      .get(`http://localhost:3000/api/materials`, {
        params: {},
      })
      .then((res: any) => {
        setDataMaterial(res.data);
        // console.log(res);
      })
      .catch((err) => {
        toast.error(err.message);
        setDataMaterial([]);
      })
      .finally(() => {
        setIloanding(false);
      });
  };

  useEffect(() => {
    getCategory();
    getProductType();
    getMaterial();
  }, []);

  const handleShowInfo = (id?: number) => {
    setShowModle(!showModle);
    axios
      .get(`http://localhost:3000/api/products/${id}`, {
        params: {},
      })
      .then((res) => {
        setDataProductDetail(res.data);
        // console.log(res);
      })
      .catch((err) => {
        toast.error('lỗi không tìm thấy sản phẩm');
        // setDataProductDetail({});
      })
      .finally(() => {
        setIloanding(false);
      });
  };

  const handleDelete = (id?: number) => {
    setIloanding(true);
    axios
      .delete(`http://localhost:3000/api/products/${id}`, {
        params: {},
      })
      .then((res) => {
        toast.error('Xóa sản phẩm thành công');
        getProduct();
      })
      .catch((err) => {
        toast.error('Xóa sản phẩm thất bại');
      })
      .finally(() => {
        // setIloanding(false);
      });

    setShowModleDelete(!showModleDelete);
  };

  return (
    <div className='w-full'>
      {showModle ? (
        <ProductInfo
          data={dataProductDetail ? dataProductDetail : undefined}
          handleShow={() => {
            setShowModle(!showModle);
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

      <ToastContainer />
      <BreadCrumbs Linkeerr={Linkeerr} />
      <div className='flex justify-between p-5'>
        <div className='grid grid-cols-2 xl:grid-cols-3 gap-5'>
          {/* <div className='relative'>
            <button
              onClick={() => setCheckCategory(!checkCategory)}
              className='bg-white py-2 px-5 rounded-3xl flex justify-between items-center w-[200px]'
            >
              <p className='font-medium'>category</p>
              {!checkCategory ? (
                <HiChevronDown className='text-2xl' />
              ) : (
                <HiChevronUp className='text-2xl' />
              )}
            </button>
            {checkCategory && (
              <div className='absolute bg-white rounded-2xl w-full border-[1px] py-2'>
                <button
                  onClick={() => setCheckCategory(!checkCategory)}
                  className='w-full py-2 hover:bg-slate-100 text-left px-3'
                >
                  dsf
                </button>
              </div>
            )}
          </div> */}

          <form className='w-[220px]'>
            <select
              onChange={(e) => {
                setCategoryId(Number(e.target.value));
              }}
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              <option
                value={''}
                selected
              >
                Category
              </option>
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

          <form className='w-[220px]'>
            <select
              onChange={(e) => {
                setTypeId(Number(e.target.value));
              }}
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              <option
                value={''}
                selected
              >
                Product type
              </option>
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

          <form className='w-[220px]'>
            <select
              onChange={(e) => {
                setMaterialId(Number(e.target.value));
              }}
              id='countries'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              <option
                value={''}
                selected
              >
                Material
              </option>
              {dataMaterial.length > 0 ? (
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
      <div className='mt-5 bg-white rounded-lg w-full'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto'>
            <thead className='text-xs text-gray-700 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  #
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  Tên sản phẩm
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  Giá niêm yết
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  giá
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  kích thước
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  có sẵn?
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'
                >
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>

            <tbody className=''>
              {isLoanding ? (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-600'>
                  <th scope='row'></th>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-center w-full'>
                      <div className='animate-spin text-3xl'>
                        <RiLoader5Fill />
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'></td>
                  <td className='px-6 py-4 flex'></td>
                  <td className='px-6 py-4 text-right'></td>
                </tr>
              ) : dataProduct.length > 0 ? (
                dataProduct.map((data, idx) => {
                  return (
                    <tr
                      key={idx}
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-600'
                    >
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {idx + 1 + page * pageSize}
                      </th>
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {data?.name}
                      </th>
                      <td className='px-6 py-4'>
                        {data?.listed_price?.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td className='px-6 py-4'>
                        {data?.price?.toLocaleString('vi', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td className='px-6 py-4'>{data?.dimensions}</td>
                      <td className='px-6 py-4'>{data?.available}</td>
                      <td className='px-6 py-4 text-right'>
                        <div className='flex justify-between text-2xl'>
                          <button
                            className='text-blue-400 hover:text-blue-600'
                            title='sửa'
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
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}

              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-emerald-50 dark:hover:bg-gray-600'>
                <th scope='row'></th>
                <td className='px-6 py-4'></td>
                <td className='px-6 py-4'></td>
                <td className='px-6 py-4'></td>
                <td className='px-6 py-4'></td>
                <td className='px-6 py-4 flex items-center gap-3'>
                  <p className='text-black'>Total:{countProducts}</p>
                  <select
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                    id='countries'
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  >
                    <option value={5}>PageSize: 5</option>
                    <option
                      value={10}
                      selected
                    >
                      PageSize: 10
                    </option>

                    <option value={15}>PageSize: 15</option>
                    <option value={20}>PageSize: 20</option>
                    <option value={25}>PageSize: 25</option>
                  </select>
                </td>
                <td className='px-6 py-4 text-right'>
                  <div className='flex justify-between text-xl '>
                    <button
                      onClick={() => {
                        page > 0 ? setPage(0) : '';
                      }}
                      className='hover:text-black flex items-center'
                    >
                      <TbChevronLeftPipe />
                    </button>
                    <button
                      onClick={() => {
                        page > 0 ? setPage(page - 1) : '';
                      }}
                      className='hover:text-black'
                    >
                      <TbChevronLeft />
                    </button>
                    <p className='text-black text-base'>{page + 1}</p>
                    <button
                      onClick={() => {
                        page < Math.floor(countProducts / pageSize)
                          ? setPage(page + 1)
                          : '';
                      }}
                      className='hover:text-black'
                    >
                      <TbChevronRight />
                    </button>
                    <button
                      onClick={() => {
                        page < Math.floor(countProducts / pageSize)
                          ? setPage(Math.floor(countProducts / pageSize))
                          : '';
                      }}
                      className='hover:text-black'
                    >
                      <TbChevronRightPipe />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
