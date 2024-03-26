import React from 'react';

function CustomInput({
  titles,
  value,
  type,
  onChange,
}: {
  titles: string;
  type: string;
  value: string | number;
  onChange: (e: any) => void;
}) {
  return (
    <div className='w-full'>
      <p className='font-medium pb-2'>{titles}</p>
      <input
        type={type}
        className='w-full p-2 outline-none focus:outline-[1px] focus:outline-black rounded-lg bg-white'
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
}

export default CustomInput;
