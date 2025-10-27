
import React from 'react';

import ContentCard from './ContentCard';
import ImageCard from './ImageCard';
import { Product } from '@/types/types';

interface CardProductProps {
  data: Product;
  isPage?: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CardProduct = ({ data, isPage, setProducts }: CardProductProps) => {
  return (
    <div className='relative flex !h-auto w-full flex-col !items-stretch overflow-hidden'>
      <ImageCard data={data} isPage={isPage} setProducts={setProducts} />
      <ContentCard data={data}  />
    </div>
  );
};

export default CardProduct;
