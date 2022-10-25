import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Pulse } from '../Pulse';

describe('Pulse.test', () => {
  it('renders children', () => {
    render(
      <Pulse>
        <Text>test</Text>
      </Pulse>,
    );

    expect(screen.getByText).toBeTruthy();
  });
});
