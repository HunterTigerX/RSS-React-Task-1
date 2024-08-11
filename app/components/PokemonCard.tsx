import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sideLinkUnClicked } from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { makeNameCapital } from './urlMethods';
import { IPokemonCardBasic } from '~/interfaces/interfaces';
import { ThemeContext } from '~/themes/themeContect';
import { ThemeSwitcher } from '~/themes/themeSwitcher';
import './PokemonCard.css';

const PokemonCard = ({ data, error, oldUrl }: { data: IPokemonCardBasic; error: boolean; oldUrl: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useContext(ThemeContext);

  if (data) {
    const pokemonName = data.name;
    const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
    const pokemonDescription = data.flavor_text_entries[0].flavor_text.replace('', ' ');
    const pokemonColor = data.color.name;

    const closeRightScreen = () => {
      dispatch(sideLinkUnClicked());
    };

    const setResults = () => {
      return (
        <>
          {!error && (
            <div className="pokemon-card-container">
              <ThemeSwitcher></ThemeSwitcher>
              <Link className={`shadow shadow-${theme}`} to={`${oldUrl}`}></Link>
              <div className={`pokemon-card-container-inner ${theme}`}>
                <Link to={`${oldUrl}`}>
                  <button className={`button_${theme} close-card`} onClick={closeRightScreen}>
                    X
                  </button>
                </Link>

                <div>
                  <div>Pokemon name is {makeNameCapital(pokemonName)}</div>
                  <div>Pokemon color is {makeNameCapital(pokemonColor)}</div>
                  <div>{pokemonDescription}</div>
                  {pokemonImage && <img className={`pokePic`} src={pokemonImage} alt="PokePic" />}
                </div>
              </div>
            </div>
          )}
          {error && (
            <>
              <div>Pokemon that you are looking for do now exist (yet)</div>
              <Link to={`${oldUrl}`} className="goBackLink">
                Go back to pokenons list
              </Link>
            </>
          )}
        </>
      );
    };
    return <>{setResults()}</>;
  }
};

export default PokemonCard;
