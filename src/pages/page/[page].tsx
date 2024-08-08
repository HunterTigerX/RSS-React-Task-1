import { ThemeContext } from '@/pages/themes/themeContect';
import { usePathname } from 'next/navigation';
import { IPageContextQuery, ISearchDataBasic } from '../interfaces/interfaces';
import Cart from '../components/Cart';
import ErrorButton from '../components/ErrorButton';
import FlyoutCart from '../components/FlyoutCart';
import Pagination from '../components/Pagination';
import Results from '../components/Results';
import Search from '../components/Search';
import { useContext } from 'react';
import { ThemeSwitcher } from '../themes/themeSwitcher';

const ResultsPage = ({ data, error }: { data: ISearchDataBasic; error: string }) => {
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);
  const pathParts = pathname.split('/');
  const pokemonId = pathParts[4];

  return (
    <div className={`${theme} results-container-main`}>
      <div className="top-container resultsX-container">
        <ThemeSwitcher></ThemeSwitcher>
      </div>
      <div className="middle-container resultsX-container">
        <Search data={data} error={error}></Search>
        <ErrorButton errorEnable={''}></ErrorButton>
        <Results pokemonId={pokemonId} searchData={data}></Results>
        <Pagination />
        <Cart></Cart>
      </div>
      <div className="bottom-container resultsX-container">
        <FlyoutCart></FlyoutCart>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: { query: IPageContextQuery; params: { page: number } }) {
  const keys = Object.keys(context.query);
  const searchedValue = keys[0] === 'page' ? '1' : keys[0];
  const currentPage = context.params.page;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${searchedValue}`);
    const data = await res.json();
    return {
      props: {
        data,
        currentPage,
      },
    };
  } catch (error) {
    return {
      props: { error: 'The pokemon you were looking were not found' },
    };
  }
}

export default ResultsPage;
