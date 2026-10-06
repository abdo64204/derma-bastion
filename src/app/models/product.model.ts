export interface ProductTranslation {
  name: string;
  category: string;
  description: string;
  benefits: string[];
  howToUse: string;
  ingredients: string;
  badge?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description: string;
  benefits: string[];
  howToUse: string;
  ingredients: string;
  ar?: ProductTranslation;
}
