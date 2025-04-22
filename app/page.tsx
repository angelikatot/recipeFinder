//home page, static url
// contains  search interface where users can look for recipes and shows results

// Displays the ClientSearch component for searching
// Shows ServerPage component that fetches and displays recipe search results
// Handles URL query parameters for searches (e.g., /?query=chicken)

import ClientSearch from './ClientSearch';
import ServerPage from './ServerPage';

const Home = ({ searchParams }: { searchParams: { query?: string } }) => {
  return (
    <div className="container">
      <h1>Recipe Finder</h1>
      <ClientSearch />
      <ServerPage searchParams={searchParams} />
    </div>
  );
};

export default Home;