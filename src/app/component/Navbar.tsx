'use client';
import Image from 'next/image';
import { useState } from 'react';
import { menudata } from '../utinity/menudata';
import { useRouter } from 'next/navigation';
import { images } from '@/images';
import Link from 'next/link';
import { IoExitOutline, IoMenu } from 'react-icons/io5';

function Navbar() {
  const Router = useRouter();
  const [selectedButton, setSelectedButton] = useState<number>();
  const [selectedGroup, setSelectedGroup] = useState<number>();

  const handleRoutes = (link: string, j: number, i: number) => {
    Router.push(link);
    setSelectedButton(j); // Cập nhật button được chọn
    setSelectedGroup(i);
  };

  return (
    <div className='fixed top-0 left-0 w-[80px] xl:w-[20%] bg-white drop-shadow-md z-50 px-5 hover:w-[30%] xl:hover:w-[20%] hover:px-0 xl:px-0 group'>
      <div>
        <button
          // onClick={() => handleShow()}
          className='text-3xl group-hover:hidden xl:hidden items-center'
        >
          <IoMenu />
        </button>
      </div>
      <div className='hidden xl:block group-hover:block'>
        <div className='px-5 flex justify-between'>
          <Link href={'/'}>
            <Image
              src={images.Logo}
              alt=''
              width={500}
              height={200}
            />
          </Link>
        </div>
        <div className='h-screen hover:overflow-auto pb-40 overflow-hidden px-5'>
          {menudata.length > 0 &&
            menudata.map((vl, i) => {
              return (
                <div
                  className='w-full'
                  key={i}
                >
                  <p className='uppercase pt-10'>{vl.title}</p>
                  {vl.button.map((bt, j) => {
                    var Icon = bt.icon;
                    return (
                      <button
                        onClick={() => handleRoutes(bt.link, j, i)}
                        key={j}
                        className={`w-full mt-5 text-left flex items-center gap-3 text-2xl  p-3 rounded-2xl font-medium ${
                          selectedButton === j && selectedGroup === i
                            ? 'bg-purple-900 text-white'
                            : 'bg-white hover:bg-purple-100'
                        }`}
                      >
                        <Icon />
                        <p className='text-sm capitalize'>{bt.content}</p>
                      </button>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
