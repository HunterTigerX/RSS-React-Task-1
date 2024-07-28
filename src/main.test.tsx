import { describe, expect, it } from 'vitest';
import { renderPage } from 'main.tsx';

describe('onPageChangedFunction type', () => {
  it('should create and append root', () => {
    const mockElement: HTMLElement = document.createElement('div');
    const result = renderPage(mockElement);
    expect(result).toBe('1');
  });
});
