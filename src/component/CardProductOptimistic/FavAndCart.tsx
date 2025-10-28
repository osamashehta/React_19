'use client';

import React, { useOptimistic, useTransition } from 'react';
import Image from 'next/image';
import { Product } from '@/types/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/hooks/useSession';
import { apiServiceCall } from '@/lib/apiServiceCall';
import toast from 'react-hot-toast';

interface ProductsResponse {
  data: {
    products: Product[];
  };
}

interface FavAndCartProps {
  data: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const FavAndCart: React.FC<FavAndCartProps> = ({ data, setProducts }) => {
  const [isPending, startTransition] = useTransition();

  // 🧠 Create optimistic local copy of the product
  const [optimisticState, addOptimistic] = useOptimistic(
    data,
    (state: Product, newIsFav: boolean) => ({
      ...state,
      is_favorite: newIsFav,
    })
  );

  const { token, guestId } = useSession();
  const queryClient = useQueryClient();

  // ⚙️ Mutation for toggling favorite
  const { mutate: toggleFav, isPending: isPendingToggleFav } = useMutation({
    mutationFn: () =>
      apiServiceCall('favourites/toggle', {
        method: 'POST',
        headers: {
          'Accept-Language': 'ar',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(guestId && { uuid: guestId }),
        },
        body: JSON.stringify({ product_id: data.id }),
      }),

    onSuccess: (response: any) => {
      toast.success(response.message);

      // ✅ Sync with react-query cache
      queryClient.invalidateQueries({ queryKey: ['mostRequestedProducts'] });
    },

    onError: () => {
      // ❌ Rollback if failed
      toast.error('حدث خطأ أثناء تحديث المفضلة');
      // ✅ Sync with react-query cache
      // queryClient.invalidateQueries({ queryKey: ['mostRequestedProducts'] });
      // Rollback parent list
      setProducts((prev) =>
        prev.map((p) =>
          p.id === data.id ? { ...p, is_favorite: !data.is_favorite } : p
        )
      );
    },
  });

  const handleToggleFav = () => {
    // 🌀 Immediately flip favorite state in UI
    startTransition(() => {
      const newIsFav = !optimisticState.is_favorite;
      addOptimistic(newIsFav);

      // Also optimistically update parent products list
      setProducts((prev) =>
        prev.map((p) =>
          p.id === data.id ? { ...p, is_favorite: newIsFav } : p
        )
      );
    });

    // 🚀 Then trigger API in background
    toggleFav();
  };

  return (
    <div className='cart-fav absolute right-5 top-5'>
      <button
        disabled={isPending || isPendingToggleFav}
        onClick={handleToggleFav}
        className={`fav cursor-pointer transition-opacity`}
        aria-label={
          optimisticState.is_favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
      >
        <Image
          src={
            optimisticState.is_favorite
              ? '/images/fav-heart.svg'
              : '/images/fav.svg'
          }
          width={34}
          height={34}
          alt='favorite'
        />
      </button>
    </div>
  );
};

export default FavAndCart;
