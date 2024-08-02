import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { NotFound } from './NotFound';
import store from '@/app/reducers/root/rootReduces';

vi.mock('react-router-dom');
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockedNotFound = () => {
  return (
    <Provider store={store}>
      <NotFound />
    </Provider>
  );
};

describe('NotFound Component', () => {
  it('renders without crashing', () => {
    render(<MockedNotFound />);
  });
});
