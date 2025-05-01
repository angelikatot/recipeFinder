// dynamic route page: näyttää tietyn reseptin tiedot kun käyttäjä klikkaa reseptiä

import { fetchRecipeDetail } from '@/app/recipes'; // haetaan  reseptin tiedot
import Link from 'next/link'; // link navigointiin
import { notFound } from 'next/navigation'; //  404-sivu jos dataa ei löydy
import RecipeImage from '@/app/RecipeImage'; // kuva niille resepteille joilla ei ole APIssa kuva

// komponentin props-tyyppi: odotetaan id(merkkijono)
interface RecipePageProps {
  params: Promise<{ id: string }> | { id: string };
}

// server component joka näyttää reseptin tiedot, odotetaan mahdollinen Promise (kun käsitellään async funktio)
export default async function RecipePage({ params }: RecipePageProps) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  
  const recipeId = parseInt(resolvedParams.id); // muutetaan ID numeroksi, näytetään 404 jos error
  
  
  if (isNaN(recipeId)) {
    notFound();
  }

  // haetaan reseptin tiedot palvelimelta (SSR: server-side rendering)
  const recipe = await fetchRecipeDetail(recipeId);
  
  
  if (!recipe) {
    notFound();
  }
  
  return (
    <div className="container">
      {/* linkki takaisin hakusivulle */}
      <Link href="/" className="back-button">← Takaisin hakuun</Link>
      
      <div className="recipe-detail">
        <div className="recipe-header">
          <h1>{recipe.title}</h1>

          {/* Aika ja annokset */}
          <div className="recipe-meta">
            {recipe.readyInMinutes && (
              <span className="meta-item">🕒 {recipe.readyInMinutes} minutes</span>
            )}
            {recipe.servings && (
              <span className="meta-item">👥 {recipe.servings} portions</span>
            )}
          </div>

          {/* Reseptin kuva */}
          <RecipeImage
            src={recipe.image}
            alt={recipe.title}
            className="recipe-image"
          />
        </div>
        
        <div className="recipe-content">
          {/* Yhteenveto */}
          <section className="recipe-section">
            <h2>Recipe</h2>
            <div className="recipe-summary">
              {/* HTML-muotoinen teksti renderöidään turvallisesti */}
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>
          </section>
          
          {/* Ainekset */}
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
          
          {/* Valmistusohjeet */}
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


