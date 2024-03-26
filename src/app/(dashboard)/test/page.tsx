'use client';

import { images } from '@/images';
import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [imgURL, setImgURL] = useState('');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <UploadButton
        endpoint='imageUploader'
        appearance={{
          button:
            'ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400',
          container: 'w-max flex-row rounded-md border-cyan-300 bg-slate-800',
          allowedContent:
            'flex h-8 flex-col items-center justify-center px-2 text-white',
        }}
        onClientUploadComplete={(res) => {
          setImgURL(res[0].url);
        }}
      />
      <div className='bg-slate-200 w-full'>
        {imgURL.length > 0 ? (
          <Image
            src={imgURL}
            alt=''
            width={3000}
            height={3000}
          />
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
