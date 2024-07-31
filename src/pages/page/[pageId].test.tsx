import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ResultsPage from './[pageId]';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: {
      pageId: '1',
      pokemonId: '25',
    },
  })),
}));

describe('ResultsPage', () => {
  it('renders Main component with correct props', () => {
    const { getByText } = render(<ResultsPage />);
    expect(getByText(/Enable/i)).toBeInTheDocument();
  });
});
