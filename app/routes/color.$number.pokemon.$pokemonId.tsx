import { useContext } from 'react';
import { Provider } from 'react-redux';
import PokemonCard from '~/components/PokemonCard';
import { IPokemonCardBasic } from '~/interfaces/interfaces';
import store from '~/reducers/root/rootReduces';
import { ThemeContext, ThemeProvider } from '~/themes/themeContect';
import { mockedIdSearch } from '../__mocks__/mockedPokemons';
import { LoaderFunctionArgs, useLoaderData } from 'react-router';
import '../styles/global.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const mockedId = mockedIdSearch;
  const { pokemonId } = params;

  const oldUrl = `/color/${params.id}`;
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`.toLowerCase());
    const result = await response.json();

    return {
      data: result,
      error: false,
      oldUrl,
    };
  } catch {
    return {
      data: mockedId,
      error: true,
      oldUrl,
    };
  }
};

const PokemonPage = () => {
  const { theme } = useContext(ThemeContext);

  interface ISearch {
    data: IPokemonCardBasic;
    error: boolean;
    oldUrl: string;
  }

  const searchResults = useLoaderData() as ISearch;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className={`${theme}`}>
          <PokemonCard
            data={searchResults.data}
            error={searchResults.error}
            oldUrl={searchResults.oldUrl}
          ></PokemonCard>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default PokemonPage;
