// dynamic route page that shows detailed information about a specific recipe when users click on a recipe card
// app/recipe/[id]/page.tsx


import { fetchRecipeDetail } from '@/app/recipes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RecipeImage from '@/app/RecipeImage';

// Define the component props
interface RecipePageProps {
  params: Promise<{ id: string }> | { id: string };
}

// Server Component for recipe details
export default async function RecipePage({ params }: RecipePageProps) {
  // Await params if it's a Promise
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  
  const recipeId = parseInt(resolvedParams.id);
  
  // Handle invalid IDs
  if (isNaN(recipeId)) {
    notFound();
  }
  
  const recipe = await fetchRecipeDetail(recipeId);
  
  // Handle recipe not found
  if (!recipe) {
    notFound();
  }
  
  return (
    <div className="container">
      <Link href="/" className="back-button">← Back to Search</Link>
      <div className="recipe-detail">
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            {recipe.readyInMinutes && (
              <span className="meta-item">🕒 {recipe.readyInMinutes} minutes</span>
            )}
            {recipe.servings && (
              <span className="meta-item">👥 {recipe.servings} servings</span>
            )}
          </div>
          <RecipeImage
            src={recipe.image}
            alt={recipe.title}
            className="recipe-image"
          />
        </div>
        
        <div className="recipe-content">
          {/* Summary Section */}
          <section className="recipe-section">
            <h2>About this Recipe</h2>
            <div className="recipe-summary">
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>
          </section>
          
          {/* Ingredients Section */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <section className="recipe-section">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <div className="ingredient-content">
                      {ingredient.image && (
                        <RecipeImage
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="ingredient-image"
                          width={50}
                          height={50}
                        />
                      )}
                      <span className="ingredient-text">{ingredient.original}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Instructions Section */}
          {recipe.instructions && (
            <section className="recipe-section">
              <h2>Instructions</h2>
              <div
                className="recipe-instructions"
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}