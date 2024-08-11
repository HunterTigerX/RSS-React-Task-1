import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { IPokemonCardBasic } from '../interfaces/interfaces';
import { sideLinkUnClicked } from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';
import { ThemeContext } from '../themes/themeContect';
import { makeNameCapital } from './urlMethods';
import { ThemeSwitcher } from '../themes/themeSwitcher';
import Image from 'next/image';
import Link from 'next/link';

const PokemonCard = ({ data, oldUrl }: { data: IPokemonCardBasic; oldUrl: string }) => {
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
          <div className="pokemon-card-container">
            <ThemeSwitcher></ThemeSwitcher>
            <Link className={`shadow shadow-${theme}`} href={`${oldUrl}`}></Link>
            <div className={`pokemon-card-container-inner ${theme}`}>
              <Link href={`${oldUrl}`}>
                <button className={`button_${theme} close-card`} onClick={closeRightScreen}>
                  X
                </button>
              </Link>

              <div>
                <div>Pokemon name is {makeNameCapital(pokemonName)}</div>
                <div>Pokemon color is {makeNameCapital(pokemonColor)}</div>
                <div>{pokemonDescription}</div>
                {pokemonImage && (
                  <Image className={`pokePic`} src={pokemonImage} alt="Pokemon Image" width={96} height={96} />
                )}
              </div>
            </div>
          </div>
        </>
      );
    };
    return <>{setResults()}</>;
  }
};

export default PokemonCard;
