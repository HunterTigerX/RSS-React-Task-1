import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import Results from '@components/results/Results';

const MockedResults = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Results />
      </BrowserRouter>
    </Provider>
  );
};

describe('Results Component', () => {
  it('renders without crashing', () => {
    render(<MockedResults />);
  });
});
