import { render } from '@testing-library/react';

import { NavigationIcon } from '../NavigationIcon';

describe('NavigationIcon.test', () => {
  it('renders with default color', () => {
    const { getByTestId } = render(<NavigationIcon name="account" testID="test-nav-icon" />);

    expect(getByTestId('test-nav-icon')).toBeTruthy();
  });

  it('renders with active color', () => {
    const { getByTestId } = render(<NavigationIcon name="account" active testID="test-nav-icon" />);

    expect(getByTestId('test-nav-icon')).toBeTruthy();
  });
});
