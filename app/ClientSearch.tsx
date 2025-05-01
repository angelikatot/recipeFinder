// Näyttää hakukentän ja napin
  //Kun käyttäjä painaa nappia - selain ohjataan uuteen URL-osoitteeseen, mm. /?query=pizza.
//Toinen komponentti ( ServerPage) hakee reseptit ja näyttää ne sen mukaan
'use client';
//alussa lukee 'use client', jotta Next.js tietää, että tämä on client komponentti (eikä server)



import { useState } from 'react'; // Reactin tilahookki (useState)
import { useRouter } from 'next/navigation'; // reititys työkalu

const ClientSearch = () => {
  const [query, setQuery] = useState(''); // kayttajan syottama hakusana
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?query=${encodeURIComponent(query.trim())}`);
    }
  };



  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Enter ingredients or dish name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search recipes"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default ClientSearch;