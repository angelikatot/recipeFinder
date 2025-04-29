// type definition, separating recipe and ingredient types
export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  ingredients?: Ingredient[];
  instructions?: string;
  readyInMinutes?: number;
  servings?: number;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
  image?: string;
}