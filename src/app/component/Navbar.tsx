'use client';
import Image from 'next/image';
import { useState } from 'react';
import { menudata } from '../utinity/menudata';
import { useRouter } from 'next/navigation';
import { images } from '@/images';

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
    <div className='fixed top-0 left-0 w-[20%] bg-white drop-shadow-md'>
      <div className='px-5'>
        <Image
          src={images.Logo}
          alt=''
          width={500}
          height={200}
        />
      </div>
      <div className='h-screen hover:overflow-auto pb-28 overflow-hidden px-5'>
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
                      <p className='text-base'>{bt.content}</p>
                    </button>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Navbar;
