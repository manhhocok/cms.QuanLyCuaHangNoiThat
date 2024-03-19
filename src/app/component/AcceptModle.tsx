import React from 'react';

interface HeaderProps {
  handleAccept: () => void;
  handleExit: () => void;
  title: string;
}
function AcceptModle({ handleAccept, handleExit, title }: HeaderProps) {
  return (
    <div className='fixed w-full drop-shadow-lg flex justify-center z-50 top-0 left-0'>
      <div className='bg-white w-[350px] my-[200px] rounded-lg p-5'>
        <div className='w-full flex justify-center font-semibold text-lg text-center'>
          {title}
        </div>
        <div className='flex justify-end gap-3 pt-5 font-medium'>
          <button
            onClick={() => {
              handleAccept();
            }}
            className='bg-blue-600 text-white p-2 rounded-md'
          >
            Đồng ý
          </button>
          <button
            onClick={() => {
              handleExit();
            }}
            className='bg-red-400 text-white p-2 rounded-md'
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default AcceptModle;
