import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ErrorButton from './ErrorButton';
import store from '../reducers/root/rootReduces';

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
