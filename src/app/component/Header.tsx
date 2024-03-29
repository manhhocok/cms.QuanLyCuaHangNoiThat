import React from 'react';
import { IoMenu } from 'react-icons/io5';
import { RiAdminFill } from 'react-icons/ri';
// interface HeaderProps {
//   handleShow: () => void; // Giả sử đây là một hàm không nhận tham số và không trả về giá trị gì
// }
function Header() {
  return (
    <div className='fixed top-0 left-0 w-[100%] xl:left-[20%] xl:w-[80%] max-h-[80px] h-20 bg-slate-100 z-50 px-5'>
      <div className='flex justify-between items-center pt-2'>
        <div className='flex'>
          <button
            // onClick={() => handleShow()}
            className='text-3xl'
          >
            <IoMenu />
          </button>
          <form
            action=''
            className='flex pl-10'
          >
            <input
              type='text'
              className='rounded-l-3xl outline-none pl-5'
            />
            <button className='text-xl bg-white pr-2 rounded-r-3xl'>🔍</button>
          </form>
        </div>
        <div className='flex'>
          <p className='text-lg font-semibold'>Xin chào, Admin</p>{' '}
          <RiAdminFill className='text-3xl' />
        </div>
      </div>
    </div>
  );
}

export default Header;
