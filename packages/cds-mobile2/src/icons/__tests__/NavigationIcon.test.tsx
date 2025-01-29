import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { NavigationIcon } from '../NavigationIcon';

describe('NavigationIcon.test', () => {
  it('passes a11y for inactive color', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon name="account" testID="test-nav-icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-nav-icon')).toBeAccessible();
  });

  it('renders with default color', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon name="account" testID="test-nav-icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('passes a11y for active color', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon active name="account" testID="test-nav-icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-nav-icon')).toBeAccessible();
  });

  it('renders with active color', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon active name="account" testID="test-nav-icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('sets accessibility attributes and labels', () => {
    render(
      <DefaultThemeProvider>
        <NavigationIcon
          accessibilityHint="An icon hint"
          accessibilityLabel="An icon label"
          name="account"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('An icon label')).toBeTruthy();
    expect(screen.getByHintText('An icon hint')).toBeTruthy();
  });
});
