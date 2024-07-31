import type { AppProps } from 'next/app';
import '../styles/Search.css';
import '../styles/PokemonCard.css';
import '../styles/Cart.css';
import '../styles/FlyoutCart.css';
import '../styles/ErrorPage.css';
import '../styles/Main.css';
import '../styles/Button.css';
import '../styles/Results.css';
import '../styles/Pagination.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
