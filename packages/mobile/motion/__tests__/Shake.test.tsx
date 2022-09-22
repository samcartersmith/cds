import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Shake } from '../Shake';

describe('Shake.test', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Shake>
        <Text>test</Text>
      </Shake>,
    );

    expect(getByText).toBeTruthy();
  });
});
