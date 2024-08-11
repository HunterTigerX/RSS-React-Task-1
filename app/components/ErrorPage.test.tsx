import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, test, expect } from 'vitest';
import { ErrorPage } from '~/routes/ErrorPage';

describe('ErrorPage component', () => {
  const renderWithTheme = () => {
    return render(
      <Router>
        <ErrorPage />
      </Router>
    );
  };
  test('displays error message', () => {
    renderWithTheme();
    expect(screen.getByText(/Sorry, an unexpected error has occurred./i)).toBeInTheDocument();
  });

  test('does not render non-existent elements', () => {
    renderWithTheme();
    expect(screen.queryByText(/This should not be in the document/i)).not.toBeInTheDocument();
  });
});
