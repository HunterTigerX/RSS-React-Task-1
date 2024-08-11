import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import { ThemeProvider } from '@/themes/themeContect';
import '../src/styles/global.css';

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: Record<string, string>;
}) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
