/* eslint-disable react-native/no-raw-text */

import { render } from '@testing-library/react-native';

import { Link } from '../Link';

describe('Link', () => {
  it('renders a children text', () => {
    const result = render(
      <Link variant="body" to="/">
        Child
      </Link>
    );

    expect(result.queryByText('Child')).not.toBeNull();
  });
});
