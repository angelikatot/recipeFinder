// server component, gets recipe data before sending it to client

import { fetchRecipes } from './recipes';
import { Recipe } from './types';
import Link from 'next/link';
import RecipeImage from './RecipeImage';

// define  props type
interface ServerPageProps {
  searchParams: Promise<{ query?: string }> | { query?: string };
}

const ServerPage = async ({ searchParams }: ServerPageProps) => {
  // Await searchParams if it's a Promise
  const resolvedParams = await (searchParams instanceof Promise ? searchParams : Promise.resolve(searchParams));
  
  
  const searchQuery = resolvedParams.query || 'soup'; // default search term
  
  // Fetch recipes
  const recipes = await fetchRecipes(searchQuery);
  
  return (
    <div>
      <h2>Recipes for "{searchQuery}"</h2>
      <div className="recipe-grid">
        {recipes.length === 0 ? (
          <p>No recipes found</p>
        ) : (
          recipes.map((recipe: Recipe) => (
            <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <h2>{recipe.title}</h2>
              <div className="image-container">
                <RecipeImage 
                  src={recipe.image} 
                  alt={recipe.title} 
                  width={200}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ServerPage;