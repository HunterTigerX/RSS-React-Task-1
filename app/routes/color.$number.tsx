import { Provider } from 'react-redux';
import ResultsPage from '~/components/ResultsPage';
import { ISearchDataBasic } from '~/interfaces/interfaces';
import store from '~/reducers/root/rootReduces';
import { ThemeProvider } from '~/themes/themeContect';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';
import '../styles/global.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${id}`);
    const result = await response.json();
    return {
      data: result,
      error: false,
      lastSearch: id,
    };
  } catch {
    return {
      data: {},
      error: true,
      lastSearch: id,
    };
  }
};

const MainSearchPage = () => {
  interface ISearch {
    data: ISearchDataBasic;
    error: boolean;
    lastSearch: string;
  }
  const searchResults = useLoaderData() as ISearch;

  return (
    <ThemeProvider>
      <Provider store={store}>
        <ResultsPage
          data={searchResults.data}
          error={searchResults.error}
          lastSearch={searchResults.lastSearch}
        ></ResultsPage>
      </Provider>
    </ThemeProvider>
  );
};

export default MainSearchPage;
