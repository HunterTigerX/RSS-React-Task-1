'use client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/themes/themeContect';
import store from '../reducers/root/rootReduces';
import '../styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
