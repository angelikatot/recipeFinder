import ClientSearch from './ClientSearch';
import ServerPage from './ServerPage';

const Home = ({ searchParams }: { searchParams: { query?: string } }) => {
  return (
    <div>
      <h1>Recipe Finder</h1>
      <ClientSearch />
      <ServerPage searchParams={searchParams} />
    </div>
  );
};

export default Home;
