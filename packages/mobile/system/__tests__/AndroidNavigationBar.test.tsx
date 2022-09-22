import { render } from '@testing-library/react-native';

import { AndroidNavigationBar } from '../AndroidNavigationBar';

describe('AndroidNavigationBar.test', () => {
  it('returns null', () => {
    const { toJSON } = render(<AndroidNavigationBar />);

    expect(toJSON()).toBeNull();
  });
});
