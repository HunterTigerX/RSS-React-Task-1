import store from '@/reducers/root/rootReduces';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { Main } from '../Main';
import { ThemeProvider } from '@/themes/themeContect';

const ResultsPage = () => {
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

export default ResultsPage;
