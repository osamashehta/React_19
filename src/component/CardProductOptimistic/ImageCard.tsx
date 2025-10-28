import React from 'react';

import Image from 'next/image';



import FavAndCart from './FavAndCart';
import Percentage from './Percentage';
import Link from 'next/link';
import { Product } from '@/types/types';

const ImageCard = ({ data, isPage ,setProducts}: { data: Product, isPage?: boolean, setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) => {
  // console.log("data client",data);
  
  return (
    <div className='content relative flex h-[393px] w-full flex-col items-center rounded-[5px]'>
      <Link href={`/categories/${data.id}`}>
        <Image src={data.image} alt='Product Image' fill className='rounded-[5px] object-cover' />
      </Link>
      <FavAndCart data={data} setProducts={setProducts} />
      {data.discount_percentage && <Percentage value={data.discount_percentage} />}
    </div>
  );
};

export default ImageCard;
