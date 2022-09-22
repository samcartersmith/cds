import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Pulse } from '../Pulse';

describe('Pulse.test', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Pulse>
        <Text>test</Text>
      </Pulse>,
    );

    expect(getByText).toBeTruthy();
  });
});
