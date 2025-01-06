import { render, screen } from '@testing-library/react-native';

import { AndroidNavigationBar } from '../AndroidNavigationBar';

describe('AndroidNavigationBar.test', () => {
  it('returns null', () => {
    render(<AndroidNavigationBar />);

    expect(screen.toJSON()).toBeNull();
  });
});
