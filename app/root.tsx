import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import './tailwind.css';
import { NotFound } from './routes/notFound';

export function ErrorBoundary() {
  interface IError {
    status: number;
    message: string;
  }

  const error = useRouteError() as IError;

  if (error.status === 404) {
    return <NotFound />;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
