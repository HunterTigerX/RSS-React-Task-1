'use client';
import './styles/Search.css';
import './styles/PokemonCard.css';
import './styles/Cart.css';
import './styles/FlyoutCart.css';
import './styles/ErrorPage.css';
import './styles/Main.css';
import './styles/Button.css';
import './styles/Results.css';
import './styles/Pagination.css';
import { Provider } from 'react-redux';
import store from './reducers/root/rootReduces';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {' '}
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
