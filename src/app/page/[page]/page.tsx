'use client';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import store from '@/app/reducers/root/rootReduces';
import { ThemeProvider } from '@/app/themes/themeContect';
import Main from '@/app/page';

const ResultsPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/');
  const pageId = pathParts[2];
  const pokemonId = pathParts[4];

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Main pageId={pageId} pokemonId={pokemonId} />
      </ThemeProvider>
    </Provider>
  );
};

export default ResultsPage;
