// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { apiServiceCall } from '@/lib/apiServiceCall';
// import { useSession } from './useSession';
// import { Product } from '@/types/types';

// interface ProductsResponse {
//   data: {
//     products: Product[];
//   };
// }

// interface useToggleFavProps {
//   productID: string;
//   closeModal?: (value: boolean) => void;
// }

// const useToggleFav = ({ productID, closeModal }: useToggleFavProps) => {
//   const { token, guestId } = useSession();
//   const queryClient = useQueryClient();

//   const { mutate: toggleFav, isPending: isPendingToggleFav } = useMutation({

//     // 🔥 API CALL
//     mutationFn: () =>
//       apiServiceCall("favourites/toggle", {
//         method: "POST",
//         headers: {
//           "Accept-Language": "ar",
//           ...(token && { Authorization: `Bearer ${token}` }),
//           ...(guestId && { uuid: guestId }),
//         },
//         body: JSON.stringify({ product_id: productID }),
//       }),

//     //  OPTIMISTIC UPDATE
//     onMutate: async () => {
//       // 1) cancel outgoing refetches (so they don't overwrite our optimistic update)
//       await queryClient.cancelQueries({ queryKey: ["mostRequestedProducts"] });

//       // 2) snapshot previous data for rollback
//       const previousData = queryClient.getQueryData<ProductsResponse>([
//         "mostRequestedProducts",
//       ]);

//       // 3) apply optimistic update to the cache
//       queryClient.setQueryData<ProductsResponse>(
//         ["mostRequestedProducts"],
//         (old) => {
//           if (!old?.data?.products) return old;

//           return {
//             ...old,
//             data: {
//               ...old.data,
//               products: old.data.products.map((product) =>
//                 product.id === productID
//                   ? { ...product, is_favorite: !product.is_favorite }
//                   : product
//               ),
//             },
//           };
//         }
//       );

//       // 4) return previous value for rollback if needed
//       return { previousData };
//     },

//     // ✅ SUCCESS → notify & sync
//     onSuccess: (data: any) => {
//       toast.success(data.message);
//       queryClient.invalidateQueries({ queryKey: ["mostRequestedProducts"] });
//       closeModal?.(false);
//     },

//     // ❌ ERROR → rollback UI state
//     onError: (_error, _variables, context) => {
//       if (context?.previousData) {
//         queryClient.setQueryData(["mostRequestedProducts"], context.previousData);
//       }
//       toast.error("Something went wrong");
//       closeModal?.(false);
//     },
//   });

//   return { toggleFav, isPendingToggleFav };
// };

// export default useToggleFav;
