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
    render(<NavigationIcon active name="account" testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeAccessible();
  });

  it('renders with active color', () => {
    render(<NavigationIcon active name="account" testID="test-nav-icon" />);

    expect(screen.getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('sets accessibility attributes and labels', () => {
    render(
      <NavigationIcon
        accessibilityHint="An icon hint"
        accessibilityLabel="An icon label"
        name="account"
      />,
    );

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('An icon label')).toBeTruthy();
    expect(screen.getByHintText('An icon hint')).toBeTruthy();
  });
});
