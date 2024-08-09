'use client';
import PokemonCard from '@/components/PokemonCard';
import { IPokemonCardBasic } from '@/interfaces/interfaces';
import store from '@/reducers/root/rootReduces';
import { ThemeContext, ThemeProvider } from '@/themes/themeContect';

import { useContext } from 'react';
import { Provider } from 'react-redux';

const PokemonPage = ({ data, error, oldUrl }: { data: IPokemonCardBasic; error: boolean; oldUrl: string }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className={`${theme}`}>
          <PokemonCard data={data} error={error} oldUrl={oldUrl}></PokemonCard>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export async function getServerSideProps(context: { query: { pokemon: string }; resolvedUrl: string }) {
  const pokemonId = context.query.pokemon;
  const oldUrl = `${context.resolvedUrl.replace(`pokemon/${pokemonId}`, '')}`;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId.toLowerCase()}`);
    const data = await res.json();
    return {
      props: {
        data,
        error: false,
        oldUrl,
      },
    };
  } catch (error) {
    return {
      props: { error: 'The pokemon you were looking were not found' },
      error: true,
      oldUrl,
    };
  }
}

export default PokemonPage;
