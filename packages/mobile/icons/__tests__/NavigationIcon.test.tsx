import { render, screen } from '@testing-library/react-native';

import { NavigationIcon } from '../NavigationIcon';

describe('NavigationIcon.test', () => {
  it('passes a11y for inactive color', () => {
    render(<NavigationIcon name="account" testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeAccessible();
  });

  it('renders with default color', () => {
    render(<NavigationIcon name="account" testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('passes a11y for active color', () => {
    render(<NavigationIcon name="account" active testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeAccessible();
  });

  it('renders with active color', () => {
    render(<NavigationIcon name="account" active testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });
});
