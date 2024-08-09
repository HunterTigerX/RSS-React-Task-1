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
