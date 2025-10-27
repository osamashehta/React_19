'use client';

import React, { useOptimistic, useTransition } from 'react';
import Image from 'next/image';
import useToggleFav from '@/hooks/useToggleFav';
import { Product } from '@/types/types';
import { useQueryClient } from '@tanstack/react-query';

interface FavAndCartProps {
  data: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const FavAndCart: React.FC<FavAndCartProps> = ({ data, setProducts }) => {
  const queryClient = useQueryClient();

  // useOptimistic for immediate UI feedback


  const { toggleFav, isPendingToggleFav } = useToggleFav({
    productID: data.id,
  });

  const handleToggleFav = () => {
    toggleFav();
  };

  return (
    <div className='cart-fav absolute right-5 top-5'>
      <button
        disabled={isPendingToggleFav}
        onClick={handleToggleFav}
        className={`fav cursor-pointer transition-opacity `}
        aria-label={data.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Image
          src={data.is_favorite ? '/images/fav-heart.svg' : '/images/fav.svg'}
          width={34}
          height={34}
          alt="favorite"
        />
      </button>
    </div>
  );
};

export default FavAndCart;
