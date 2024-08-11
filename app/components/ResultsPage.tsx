import { useContext } from 'react';
import Cart from '~/components/Cart';
import ErrorButton from '~/components/ErrorButton';
import FlyoutCart from '~/components/FlyoutCart';
import Pagination from '~/components/Pagination';
import Results from '~/components/Results';
import Search from '~/components/Search';
import { ISearchDataBasic } from '~/interfaces/interfaces';
import { ThemeContext } from '~/themes/themeContect';
import { ThemeSwitcher } from '~/themes/themeSwitcher';
import './ResultsPage.css';

const ResultsPage = ({ data, error, lastSearch }: { data: ISearchDataBasic; error: boolean; lastSearch: string }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`${theme} results-container-main`}>
        <div className="top-container resultsX-container">
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <div className="middle-container resultsX-container">
          <Search data={data} error={error} lastSearch={lastSearch}></Search>
          <ErrorButton errorEnable={''}></ErrorButton>
          <Results error={error}></Results>
          <Pagination data={data} error />
          <Cart></Cart>
        </div>
        <FlyoutCart></FlyoutCart>
      </div>
    </>
  );
};

export default ResultsPage;
