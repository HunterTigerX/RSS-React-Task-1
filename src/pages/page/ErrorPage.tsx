import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../themes/themeContect';
import { ThemeSwitcher } from '../themes/themeSwitcher';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`error-container ${theme}`}>
      <ThemeSwitcher></ThemeSwitcher>
      <h1>Oops!</h1>
      <button className={`error-back ${theme}`}>
        <Link className={`transparent-link ${theme}`} href={``}>
          Go back
        </Link>
      </button>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};

export { ErrorPage };
