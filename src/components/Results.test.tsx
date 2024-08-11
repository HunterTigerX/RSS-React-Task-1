import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Results from './Results';
import store from '../reducers/root/rootReduces';

const MockedResults = () => {
  return (
    <Provider store={store}>
      <Results />
    </Provider>
  );
};

describe('Results Component', () => {
  it('renders without crashing', () => {
    render(<MockedResults />);
  });
});
