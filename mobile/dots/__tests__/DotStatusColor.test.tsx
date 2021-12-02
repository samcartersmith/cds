import { render } from '@testing-library/react-native';

import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-test';

describe('DotStatusColor', () => {
  it('renders a DotStatusColor', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />,
    );

    expect(getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });
});
