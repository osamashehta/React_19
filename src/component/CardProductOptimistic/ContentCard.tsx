import React from 'react';



import Rating from './Rating';
import { Product } from '@/types/types';

const ContentCard = ({ data }: { data: Product }) => {
  return (
    <div className='mt-5 flex w-full flex-col items-center gap-3'>
      <h3 className='mt-[17px] text-[17px] font-medium text-black'>{data.title}</h3>
      <h3 className='mt-[8px] line-clamp-2 h-auto flex-grow whitespace-pre-line break-words text-center text-[14px] text-[#797979]'>
        {data.description}
      </h3>
      <Rating rating={data?.rating } />
      <div className='flex items-center justify-center gap-[10px]'>
        <p className='flex items-center gap-1 text-[22px] font-semibold text-prepared'>
          {data.offer_price ? data.offer_price : data.price} 
        </p>
        {data.offer_price && (
          <p className='flex items-center gap-1 text-[14px] font-light text-[#9E9E9E] line-through'>
            {data.price} 
          </p>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
