export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  meta: {
    createdAt: string;
    updatedAt: string;
  };
  thumbnail: string;
}
