import { Recipe } from './types';

export async function fetchRecipes(query: string): Promise<Recipe[]> {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.results) {
      return [];
    }
    
    // map all recipes 
    return data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      // default image or empty string if no image is available
      image: recipe.image || "",
      summary: recipe.summary || "",
    }));
    
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function fetchRecipeDetail(id: number): Promise<Recipe | null> {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    
    const data = await res.json();
    
    return {
      id: data.id,
      title: data.title,
      image: data.image || "", // when picture is missing
      summary: data.summary,
      readyInMinutes: data.readyInMinutes,
      servings: data.servings,
      // get ingredients from extendedIngredients
      ingredients: data.extendedIngredients?.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        original: ingredient.original,
        image: ingredient.image ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}` : undefined
      })),
      // get instructions
      instructions: data.instructions
    };
    
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    return null;
  }
}