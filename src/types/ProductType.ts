export interface ProductType {
  id: string;
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
