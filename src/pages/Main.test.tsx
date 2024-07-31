import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { Main } from './Main';
import store from '@/reducers/root/rootReduces';

vi.mock('react-router-dom');

const MockedMain = () => {
  return (
    <Provider store={store}>
      <Main pageId={undefined} pokemonId={undefined} />
    </Provider>
  );
};

describe('Main Component', () => {
  it('renders without crashing', () => {
    render(<MockedMain />);
  });
});
