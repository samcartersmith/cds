import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Menu } from '../Menu';

describe('Menu.test', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Menu>
        <Text>test</Text>
      </Menu>,
    );

    expect(getByText('test')).toBeTruthy();
  });
});
