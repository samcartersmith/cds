import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Shake } from '../Shake';

describe('Shake.test', () => {
  it('renders children', () => {
    render(
      <Shake>
        <Text>test</Text>
      </Shake>,
    );

    expect(screen.getByText).toBeTruthy();
  });
});
