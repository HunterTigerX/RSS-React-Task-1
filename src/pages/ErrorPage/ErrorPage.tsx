import { ThemeSwitcher } from '@components/themes/themeSwitcher';
import { Link, useRouteError } from 'react-router-dom';
import './ErrorPage.css';
import { ThemeContext } from '@components/themes/themeContect';
import { useContext } from 'react';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);
  const error = useRouteError();
  console.error(error);

  return (
    <div className={`error-container ${theme}`}>
      <ThemeSwitcher></ThemeSwitcher>
      <h1>Oops!</h1>
      <button className={`error-back ${theme}`}>
        <Link className={`transparent-link ${theme}`} to={``}>
          Go back
        </Link>
      </button>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export { ErrorPage };
