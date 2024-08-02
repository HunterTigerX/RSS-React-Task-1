import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/app/reducers/root/rootReduces';
import ErrorButton from './ErrorButton';

const MockedErrorButton = () => {
  return (
    <Provider store={store}>
      <ErrorButton errorEnable={''} />
    </Provider>
  );
};

describe('ErrorButton Component', () => {
  it('renders without crashing', () => {
    render(<MockedErrorButton />);
  });
});
