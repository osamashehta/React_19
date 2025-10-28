"use client"
import { Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { apiServiceCall } from "@/lib/apiServiceCall";
import { useEffect, useState } from "react";
import CardProduct from "../CardProductOptimistic";
interface OptimisticProps {
    mostRequestedProducts: Product[];
    token: string | undefined;
    guestId: string | undefined;
}
const Optimistic = ({ mostRequestedProducts, token, guestId }: OptimisticProps) => {
    const [products, setProducts] = useState<Product[]>(mostRequestedProducts);

    const { data, isLoading } = useQuery({
        queryKey: ['mostRequestedProducts'],
        queryFn: async () => apiServiceCall("products/most-recent", {
            headers: {
                'Accept-Language': "ar",
                ...(token && { Authorization: `Bearer ${token}` }),
                ...(guestId && { uuid: guestId }),
                "Content-Type": "application/json",
            },
        }),
        initialData: mostRequestedProducts,

    }) as { data?: { data: { products?: Product[] } }, isLoading: boolean };
    useEffect(() => {
        if (data?.data?.products) {
            setProducts(data.data.products);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product: Product) => (
                <CardProduct key={product.id} data={product} setProducts={setProducts} />
            ))}
        </div>
    )
}
export default Optimistic;