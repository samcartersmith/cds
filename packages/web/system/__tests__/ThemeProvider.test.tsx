import { render } from '@testing-library/react';

import { ThemeProvider } from '../ThemeProvider';

describe('ThemeProvider', () => {
  it('applies default css variables', async () => {
    const { container } = render(<ThemeProvider>app content</ThemeProvider>);
    expect(container.firstChild).toHaveStyle(`--foreground: rgb(var(--gray100));`);
  });

  it('applies default spectrum className', async () => {
    const { container } = render(<ThemeProvider>app content</ThemeProvider>);
    expect(container.firstChild).toHaveClass('light');
  });

  it('applies dark spectrum className if spectrum=dark', async () => {
    const { container } = render(<ThemeProvider spectrum="dark">app content</ThemeProvider>);
    expect(container.firstChild).toHaveClass('dark');
  });

  it('applies displayContents className if display=contents', async () => {
    const { container } = render(<ThemeProvider display="contents">app content</ThemeProvider>);
    expect(container.firstChild).toHaveClass('displayContents');
  });
});
