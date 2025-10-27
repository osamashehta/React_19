export interface Product {
  id: string;
  title: string | null;
  description: string;
  image: string;
  price: string;
  offer_price: string;
  discount_percentage: string;
  rating: number;
  is_favorite: boolean;
}
export type ApiResponse = {
  data?: {
    products?: Product[];
  }
};