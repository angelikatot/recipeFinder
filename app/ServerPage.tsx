//Ottaa hakusanan osoiteriviltä (esimerkiksi ?query=chicken).
// Hakee reseptit Spoonacularin API:sta tämän hakusanan perusteella.
// Näyttää reseptit sivulla 
// toimii palvelimella, ei selaimessa:  data (reseptit) haetaan ennen kuin sivu lähetetään käyttäjälle.-
//  sivun näyttäminen nopeampaa ja hakukoneystävällisempi.

import { fetchRecipes } from './recipes';
import { use } from 'react';

const ServerPage = ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = use(searchParams);
  const searchQuery = query || 'chicken'; // Default search term
  const recipes = use(fetchRecipes(searchQuery));

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <p>{recipe.summary}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ServerPage;
