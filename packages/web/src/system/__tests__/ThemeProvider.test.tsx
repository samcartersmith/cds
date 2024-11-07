import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '../ThemeProvider';

describe('ThemeProvider', () => {
  it('applies default css variables', async () => {
    render(<ThemeProvider>app content</ThemeProvider>);
    expect(screen.getByText('app content')).toHaveStyle(`--foreground: rgb(var(--gray100));`);
  });

  it('applies default spectrum className', async () => {
    render(<ThemeProvider>app content</ThemeProvider>);
    expect(screen.getByText('app content')).toHaveClass('light');
  });

  it('applies dark spectrum className if spectrum=dark', async () => {
    render(<ThemeProvider spectrum="dark">app content</ThemeProvider>);
    expect(screen.getByText('app content')).toHaveClass('dark');
  });

  it('applies displayContents className if display=contents', async () => {
    render(<ThemeProvider display="contents">app content</ThemeProvider>);
    expect(screen.getByText('app content')).toHaveClass('displayContents');
  });
});
