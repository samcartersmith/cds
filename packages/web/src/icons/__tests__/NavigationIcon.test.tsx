import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { DefaultThemeProvider } from '../../utils/test';
import { NavigationIcon } from '../NavigationIcon';

type IconExampleProps = {
  accessibilityLabel?: string;
  title?: string;
};

const NavigationIconExample = (props: IconExampleProps) => (
  <DefaultThemeProvider>
    <NavigationIcon name="copy" size="m" {...props} />
  </DefaultThemeProvider>
);

describe('NavigationIcon.test', () => {
  it('renders with default color', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon name="account" testID="test-nav-icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('renders with active color', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon active name="account" testID="test-nav-icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<NavigationIconExample />)).toHaveNoViolations();
  });

  it('is aria hidden by default', () => {
    render(<NavigationIconExample />);

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('is not aria hidden and has an accessible label when `accessibilityLabel` is defined', () => {
    const label = 'some label';

    render(<NavigationIconExample accessibilityLabel={label} />);

    const icon = screen.getByRole('img');

    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('aria-label', label);
    expect(icon).toHaveAttribute('title', label);
  });
});
