import { useDispatch, useSelector } from 'react-redux';
import { toggleRightPanel } from 'reducers/actions/actions';
import { AppDispatch } from 'reducers/root/rootReduces';

import './pokemonCard.css';
import { IState } from 'reducers/reducers/Interfaces';

const PokemonCard = () => {
  const pokemonName = useSelector((state: IState) => state.searchSide.pokemonName);
  const pokemonImage = useSelector((state: IState) => state.searchSide.pokemonImage);
  const pokemonDescription = useSelector((state: IState) => state.searchSide.pokemonDescription);
  const loadingRight = useSelector((state: IState) => state.searchSide.loadingRight);

  const dispatch = useDispatch<AppDispatch>();

  const makeNameCapital = (name: string) => {
    if (name.length > 0) {
      return name[0].toUpperCase() + name.slice(1);
    }
  };

  const closeRightScreen = () => {
    dispatch(toggleRightPanel());
  };

  const setResults = () => {
    return (
      <>
        <button onClick={closeRightScreen}>X</button>
        {loadingRight && <div id="loading2"></div>}
        {!loadingRight && (
          <div>
            <div>Pokemon name is {makeNameCapital(pokemonName)}</div>
            <div>{pokemonDescription}</div>
            <img className="pokePic" src={pokemonImage} alt="React Image" />
          </div>
        )}
      </>
    );
  };

  return <>{setResults()}</>;
};

export default PokemonCard;
