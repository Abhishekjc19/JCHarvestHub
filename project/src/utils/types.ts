export interface Product {
  id: number;
  name: string;
  category: 'coffee' | 'arecanut' | 'pepper';
  price: number;
  description: string;
  shortDescription: string;
  imageUrl: string;
  origin: string;
  featured?: boolean;
  lastUpdated: string;
}

export interface CartItem extends Product {
  quantity: number;
}