import { render, fireEvent } from '@testing-library/react-native';
import { Animated, Pressable } from 'react-native';

import { debounce } from '../../utils/debounce';
import { AvatarButton } from '../AvatarButton';

jest.mock('../../utils/debounce');

describe('AvatarButton', () => {
  it('renders an animated view', () => {
    const result = render(<AvatarButton alt="Sneezy" />);

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    const result = render(<AvatarButton alt="Sneezy" />);

    expect(result.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children Avatar', () => {
    const result = render(
      <AvatarButton
        testID="avatar-button"
        src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
        alt="Sneezy"
      />,
    );

    expect(
      result.getByTestId('avatar-button').findByProps({
        src: 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg',
      }),
    ).toBeTruthy();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    const result = render(<AvatarButton testID="avatar-button" alt="Sneezy" onPress={spy} />);

    fireEvent.press(result.getByTestId('avatar-button').findByProps({ alt: 'Sneezy' }));

    expect(spy).toHaveBeenCalled();
  });
});
