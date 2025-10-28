import React from 'react';

const Percentage = ({ value }: { value: string }) => {
  return (
    <div
      // dir='ltr'
      className='absolute left-0 top-5 flex h-[36px] w-[85px] items-center justify-center rounded-[0px_20px_20px_0px] bg-[#EB0808] text-[18px] font-medium text-white'
    >
      {value} %
    </div>
  );
};

export default Percentage;
