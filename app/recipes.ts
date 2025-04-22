export async function fetchRecipes(query: string) {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    if (!data.results) {
      return []; // Return an empty array if results are undefined
    }

    return data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; // Return an empty array in case of error
  }
}
