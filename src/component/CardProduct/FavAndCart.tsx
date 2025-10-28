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



  // const { toggleFav, isPendingToggleFav } = useToggleFav({
  //   data.id: data.id,
  // });

  const { token, guestId } = useSession();
  const queryClient = useQueryClient();

  const { mutate: toggleFav, isPending: isPendingToggleFav } = useMutation({

    // 🔥 API CALL
    mutationFn: () =>
      apiServiceCall("favourites/toggle", {
        method: "POST",
        headers: {
          "Accept-Language": "ar",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(guestId && { uuid: guestId }),
        },
        body: JSON.stringify({ product_id: data.id }),
      }),

    //  OPTIMISTIC UPDATE
    onMutate: async () => {
      // 1) cancel outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["mostRequestedProducts"] });

      // 2) snapshot previous data for rollback
      const previousData = queryClient.getQueryData<ProductsResponse>([
        "mostRequestedProducts",
      ]);

      // 3) apply optimistic update to the cache
      queryClient.setQueryData<ProductsResponse>(
        ["mostRequestedProducts"],
        (old) => {
          if (!old?.data?.products) return old;

          return {
            // ...old,
            data: {
              // ...old.data,
              products: old.data.products.map((product) =>
                product.id === data.id
                  ? { ...product, is_favorite: !product.is_favorite }
                  : product
              ),
            },
          };
        }
      );

      // 4) return previous value for rollback if needed
      return { previousData };
    },

    // ✅ SUCCESS → notify & sync
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["mostRequestedProducts"] });
    },

    // ❌ ERROR → rollback UI state
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["mostRequestedProducts"], context.previousData);
      }
      toast.error("Something went wrong");
    },
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
