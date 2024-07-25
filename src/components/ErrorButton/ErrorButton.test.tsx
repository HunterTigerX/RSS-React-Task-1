import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import ErrorButton from '@components/ErrorButton/ErrorButton';

const MockedErrorButton = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorButton errorEnable={''} />
      </BrowserRouter>
    </Provider>
  );
};

describe('ErrorButton Component', () => {
  it('renders without crashing', () => {
    render(<MockedErrorButton />);
  });
});
