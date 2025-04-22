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
    
    // Filter out recipes without images
    return data.results
      .filter((recipe: any) => recipe.image && !recipe.image.includes('null'))
      .map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
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
    
    const recipe = await res.json();
    
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      // + other fields later
    };
    
  } catch (error) {
    console.error(`Error fetching recipe ${id}:`, error);
    return null;
  }
}