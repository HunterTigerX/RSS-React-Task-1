import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '~/themes/themeContect';
import { ThemeSwitcher } from '~/themes/themeSwitcher';
import '../components/ErrorPage.css';

const ErrorPage = () => {
  const { theme } = useContext(ThemeContext);

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
