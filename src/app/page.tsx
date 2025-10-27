import CardProduct from "@/component/CardProduct";
import HomePage from "@/component/HomePage/HomePage";
import { apiServiceCall } from "@/lib/apiServiceCall";

import { Product } from "@/types/types";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const guestId = cookieStore.get('uuid')?.value;
  const data = await apiServiceCall("products/most-recent", {
    headers: {
      'Accept-Language': "ar",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(guestId && { uuid: guestId }),
      "Content-Type": "application/json",
    },
  }) as { data?: { products?: Product[] } };
  const mostRequestedProducts: Product[] = data?.data?.products || [];
  console.log("mostRequestedProducts", mostRequestedProducts);

  return (
    <div className="container w-[95%] mx-auto my-12 ">
      <HomePage mostRequestedProducts={mostRequestedProducts} token={token} guestId={guestId} />
    </div>
  );
}
