export interface Product {
  product_id: string;
  product_name: string;
  image: string;
  price: number;
  stock_amount: number | null;
  stock_status: string | null;
  sku: string;
  brand: string;
  intro: string;
  description: string;
  rating: number | null;
}
