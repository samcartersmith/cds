import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { NavigationIconButton } from '../NavigationIconButton';

describe('NavigationIconButton.test', () => {
  it('triggers onClick', () => {
    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <NavigationIconButton name="account" onClick={onClick} testID="test-nav-icon-button" />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('test-nav-icon-button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders correct icon and applies active state', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIconButton active name="account" testID="test-nav-icon-button" />
      </DefaultThemeProvider>,
    );

    const button = screen.getByTestId('test-nav-icon-button');
    expect(button.className).toContain('focusStyle');
    const iconSpan = screen.getByTestId('icon-base-glyph');
    expect(iconSpan).toHaveAttribute('data-icon-name', 'account');
    expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    expect(iconSpan.className).toContain('iconStyles');
  });

  it('applies correct styling for compact and non-compact modes', () => {
    const { rerender } = render(
      <DefaultThemeProvider>
        <NavigationIconButton compact name="account" testID="test-nav-icon-button" />
      </DefaultThemeProvider>,
    );

    let button = screen.getByTestId('test-nav-icon-button');
    expect(button).toHaveStyle({ '--width': '40px', '--height': '40px' });

    rerender(
      <DefaultThemeProvider>
        <NavigationIconButton compact={false} name="account" testID="test-nav-icon-button" />
      </DefaultThemeProvider>,
    );

    button = screen.getByTestId('test-nav-icon-button');
    expect(button).toHaveStyle({ '--width': '56px', '--height': '56px' });
  });

  it('disables the button when disabled prop is true', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIconButton disabled name="account" testID="test-nav-icon-button" />
      </DefaultThemeProvider>,
    );

    const button = screen.getByTestId('test-nav-icon-button');
    expect(button).toBeDisabled();
  });

  it('applies focus styling on click and removes it on blur', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIconButton name="account" testID="test-nav-icon-button" />
      </DefaultThemeProvider>,
    );

    const button = screen.getByTestId('test-nav-icon-button');

    fireEvent.click(button);
    expect(button.className).toContain('focusStyle');

    fireEvent.blur(button);
    expect(button.className).not.toContain('focusStyle');
  });
});
