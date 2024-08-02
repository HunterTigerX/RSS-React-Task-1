import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from './reducers/root/rootReduces';
import Main from './page';

vi.mock('react-router-dom');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

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
