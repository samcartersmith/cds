import { render, screen } from '@testing-library/react-native';

import { NavigationIcon } from '../NavigationIcon';

describe('NavigationIcon.test', () => {
  it('renders with default color', () => {
    render(<NavigationIcon name="account" testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('renders with active color', () => {
    render(<NavigationIcon name="account" active testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });
});
