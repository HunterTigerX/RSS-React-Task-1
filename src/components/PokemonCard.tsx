'use client';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { sideLinkUnClicked } from '../reducers/actions/actions';
import { AppDispatch } from '../reducers/root/rootReduces';

import { makeNameCapital } from './urlMethods';

import Image from 'next/image';
import Link from 'next/link';
import { IPokemonCardBasic } from '@/interfaces/interfaces';
import { ThemeContext } from '@/themes/themeContect';
import { ThemeSwitcher } from '@/themes/themeSwitcher';

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
          )}
          {error && <div>Oops! Something went wrong</div>}
        </>
      );
    };
    return <>{setResults()}</>;
  }
};

export default PokemonCard;
