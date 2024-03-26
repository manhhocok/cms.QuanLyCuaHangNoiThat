import { images } from '@/images';
import { HotIcon, NewIcon, SaleIcon } from '@/images/icons';
import Image from 'next/image';
import React from 'react';
import { IoExitOutline } from 'react-icons/io5';
import Slider from 'react-slick';
import { ProductType } from '../../type/product';
import styles from './ProductCardInfo.module.css';
interface HeaderProps {
  handleShow: () => void;
  data?: ProductType;
}
function ProductInfo({ handleShow, data }: HeaderProps) {
  const img = [images.Test5, images.Test8, images.Test9, images.Test7];

  const settings = {
    customPaging: function (i: number) {
      return (
        <li>
          <Image
            alt='product-item-img'
            src={data?.image.split(' ')[i] || images.LoadingImg}
            fill
            objectFit='cover'
          />
        </li>
      );
    },
    dots: true,
    autoplay: true,
    dotsClass: `${styles.customsSlick} ${styles.slick_dots} customsSlick slick-dots`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
  };

  return (
    <div className='fixed w-[100%] top-0 left-0  flex justify-center z-50 py-28 bg-black/[0.2]'>
      <div className='w-[80%] bg-white rounded-2xl drop-shadow-xl border-[1px] p-5 overflow-hidden hover:overflow-y-auto h-[500px] relative'>
        <div className='w-full flex justify-center text-3xl font-semibold pb-5'>
          Thông tin chi tiết sản phẩm
        </div>
        <div className='w-full flex justify-end fixed top-5 right-5'>
          <button
            onClick={() => {
              handleShow();
            }}
            className='text-2xl'
          >
            <IoExitOutline />
          </button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 pb-20 gap-x-3'>
          <div className=''>
            <Slider {...settings}>
              {data?.image ? (
                data?.image.split(' ').map((img, idx) => {
                  return (
                    <div
                      key={idx}
                      className='w-full h-[180px] md:w-[300px] md:h-[200px] xl:w-[400px] xl:h-[300px] object-fill px-10'
                    >
                      <Image
                        alt='product-item-img'
                        src={img}
                        className=''
                        width={700}
                        height={500}
                        objectFit='cover'
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </Slider>
          </div>
          <div className='w-full grid grid-cols-2 gap-y-5 pt-5 text-zinc-700'>
            <div className='flex col-span-2 w-full justify-between'>
              <div className='flex w-full '>
                <p className='font-medium pr-3 text-black'>Tên sản phẩm:</p>
                <p className='flex'> {data?.name}</p>
              </div>
            </div>

            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Giá niêm yết: </p>
              {data?.listed_price?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Giá: </p>{' '}
              {data?.price?.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Kích thước: </p>
              {data?.dimensions}
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Có sẵn? </p>
              {data?.available}
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>chất liệu: </p>
              {data?.material?.name}
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Trạng thái: </p>
              <p
                className={`${
                  data?.status ? 'bg-emerald-400' : 'bg-red-400'
                } h-7 text-white px-2 flex items-center rounded-lg`}
              >
                {data?.status ? 'Hoạt động' : 'Ngừng hoạt động'}
              </p>
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Category: </p>
              {data?.category.name}
            </div>
            <div className='flex'>
              <p className='font-medium pr-3 text-black'>Loại sản phẩm: </p>
              <div className='pl-2'>
                {data?.productType?.name == 'Hot' ? (
                  <HotIcon />
                ) : data?.productType?.name == 'New' ? (
                  <NewIcon />
                ) : (
                  <SaleIcon />
                )}
              </div>
            </div>
            <div className='flex col-span-2 w-full justify-between'>
              <div className='w-full'>
                <p className='font-medium pr-3 text-black'>Chi tết: </p>
                <p>{data?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
