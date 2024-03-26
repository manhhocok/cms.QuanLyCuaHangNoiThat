import { images } from '@/images';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
function CustomUploadImages({
  heightImg,
  imgURL,
  hanldeOnClientUpload,
}: {
  heightImg: string;
  imgURL: string;
  hanldeOnClientUpload: (res: any) => void;
}) {
  return (
    <div
      className={
        'bg-slate-200 w-full relative rounded-lg flex justify-center items-center ' +
        heightImg
      }
    >
      {imgURL.length > 0 ? (
        <Image
          className={'w-full rounded-lg ' + heightImg}
          src={imgURL}
          alt=''
          width={3000}
          height={3000}
        />
      ) : (
        <Image
          className=' animate-pulse'
          src={images.LoadingImg}
          alt=''
          width={200}
          height={200}
        />
      )}

      <div className='absolute top-0 right-0'>
        <UploadButton
          endpoint='imageUploader'
          appearance={{
            button:
              'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed bg-red-500 bg-none after:bg-orange-400',
            container:
              'w-[300px] flex-row rounded-md border-cyan-300 bg-slate-800 text-xs ',
            allowedContent:
              'flex h-8 flex-col items-center justify-center px-2 text-white',
          }}
          onClientUploadComplete={(res) => hanldeOnClientUpload(res)}
          onUploadError={() => {
            toast.error('Ảnh không hợp lệ');
          }}
        />
      </div>
    </div>
  );
}

export default CustomUploadImages;
