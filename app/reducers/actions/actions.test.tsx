import { describe, it, expect, vi } from 'vitest';
import {
  changePage,
  searchMain,
  searchFailed,
  savePokemonsList,
  searchSide,
  updateInput,
  saveInput,
  setLoadingRight,
  goToPageOne,
  openRightPanel,
  closeRightPanel,
  sideLinkClicked,
  sideLinkUnClicked,
} from './actions';
import { mockedColorSearch, mockedIdSearch } from '~/__mocks__/mockedPokemons';

describe('should dispatch the correct actions', () => {
  it('should change page', async () => {
    const mockDispatch = vi.fn();
    const newPage = 2;
    const action = changePage(newPage);
    await action(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'CHANGE_PAGE', payload: newPage });
  });

  it('should search pokemon by color', async () => {
    const mockDispatch = vi.fn();

    const action = searchMain(mockedColorSearch);

    await action(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(2);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'FETCH_MAIN_DATA_SUCCESS', payload: mockedColorSearch });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, { type: 'SAVE_CURRENT_POKEMONS' });
  });

  it('should update data if search failed', async () => {
    const mockDispatch = vi.fn();
    const errorText = 'searchFailed';
    const action = searchFailed(errorText);

    await action(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'FETCH_DATA_FAILURE', payload: errorText });
  });

  it('should save pokemon in array', async () => {
    const action = savePokemonsList();
    expect(action).toEqual({ type: 'SAVE_CURRENT_POKEMONS' });
  });

  it('should store data for pokemon card', async () => {
    const mockDispatch = vi.fn();

    const action = searchSide(mockedIdSearch);

    await action(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'FETCH_POKEMON_DATA_SUCCESS', payload: mockedIdSearch });
  });

  it('should show okemon card', async () => {
    const action = openRightPanel();
    expect(action).toEqual({ type: 'OPEN_RIGHT_PANEL' });
  });
  it('should close okemon card', async () => {
    const action = closeRightPanel();
    expect(action).toEqual({ type: 'CLOSE_RIGHT_PANEL' });
  });

  it('should update search input', async () => {
    const mockDispatch = vi.fn();
    const input = 'text';
    const action = updateInput(input);

    await action(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'UPDATE_INPUT', payload: input });
  });

  it('should save last searched value', async () => {
    const mockDispatch = vi.fn();
    const input = 'text';
    const action = saveInput(input);

    await action(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: 'SAVE_INPUT', payload: input });
  });

  it('should show loading animation', async () => {
    const action = setLoadingRight();
    expect(action).toEqual({ type: 'SET_LOADING_RIGHT' });
  });

  it('should redirect to first page', async () => {
    const action = goToPageOne();
    expect(action).toEqual({ type: 'CHANGE_PAGE_ONE' });
  });
});

it('side link was clicked', async () => {
  const action = sideLinkClicked();
  expect(action).toEqual({ type: 'SIDE_LINK_CLICKED' });
});

it('side link status changed', async () => {
  const action = sideLinkUnClicked();
  expect(action).toEqual({ type: 'SIDE_LINK_UNCLICKED' });
});
