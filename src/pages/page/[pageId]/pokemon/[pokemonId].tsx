import { Main } from '@/pages/Main';
import store from '@/reducers/root/rootReduces';
import { ThemeProvider } from '@/themes/themeContect';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

const PokemonPage = () => {
  const router = useRouter();
  const { pageId, pokemonId } = router.query;
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Main pageId={pageId} pokemonId={pokemonId} />
      </ThemeProvider>
    </Provider>
  );
};

export default PokemonPage;
