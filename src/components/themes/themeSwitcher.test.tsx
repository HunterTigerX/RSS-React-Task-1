import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'reducers/root/rootReduces';
import { ThemeSwitcher } from '@components/themes/themeSwitcher';

const MockedThemeSwitcher = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeSwitcher />
      </BrowserRouter>
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockedThemeSwitcher />);
  });
});
