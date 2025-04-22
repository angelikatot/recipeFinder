// dynamic route page that shows detailed information about a specific recipe when users click on a recipe card


import { fetchRecipeDetail } from '@/app/recipes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RecipeImage from '@/app/RecipeImage'; 

// define the component props
interface RecipePageProps {
  params: {
    id: string;
  };
}

// Server Component for recipe details
export default async function RecipePage({ params }: RecipePageProps) {
  const recipeId = parseInt(params.id);
  
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
          <RecipeImage 
            src={recipe.image} 
            alt={recipe.title} 
            className="recipe-image"
          />
        </div>
        
        <div className="recipe-summary">
          <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </div>
        
        {/* lisataan myohemmin aineksia, etc */}
      </div>
    </div>
  );
}