import { Provider } from 'react-redux';
import store from './reducers/root/rootReduces';
import './styles/global.css';
import { ThemeProvider } from './themes/themeContect';

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
