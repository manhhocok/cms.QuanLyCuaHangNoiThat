import React from 'react';

function CustomTextarea({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (e: any) => void;
}) {
  return (
    <div className=''>
      <label
        htmlFor='message'
        className='font-medium'
      >
        {title}
      </label>
      <textarea
        id='message'
        rows={4}
        className='block p-2.5 w-full text-black bg-white rounded-lg outline-none focus:outline-[1px] focus:outline-black'
        placeholder='Nhập vào thông tin chi tiết...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default CustomTextarea;
