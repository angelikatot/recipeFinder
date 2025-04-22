// Näyttää hakukentän ja napin.Kun käyttäjä kirjoittaa hakusanan ja painaa nappia, hakusana lisätään osoiteriville (URL).

'use client';
//alussa lukee 'use client', jotta Next.js tietää, 
// että komponentti käyttää esimerkiksi Reactin useState-ominaisuuksia, jotka toimivat vain selaimessa

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ClientSearch = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?query=${query}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default ClientSearch;
