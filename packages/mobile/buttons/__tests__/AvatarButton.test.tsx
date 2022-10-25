import { Animated, Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { AvatarButton } from '../AvatarButton';

jest.mock('../../utils/debounce');

describe('AvatarButton', () => {
  it('renders an animated view', () => {
    render(<AvatarButton alt="Sneezy" />);

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    render(<AvatarButton alt="Sneezy" />);

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children Avatar', () => {
    render(
      <AvatarButton
        testID="avatar-button"
        src="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg"
        alt="Sneezy"
      />,
    );

    expect(
      // This is a false positive due to Aggressive Reporting for the linter. This is a valid, non-promise function on https://reactjs.org/docs/test-renderer.html#testinstancefindbyprops
      // however, the 'findBy*' linter from testing-library thinks this is a promise query. We should keep the aggressive reporting enabled, and just
      // disable the few functions that are 'false positives'.
      // - Emily Seibert, 10/24/2022
      // eslint-disable-next-line testing-library/await-async-query
      screen.getByTestId('avatar-button').findByProps({
        src: 'https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg',
      }),
    ).toBeTruthy();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    (debounce as jest.Mock).mockImplementation(() => spy);
    render(<AvatarButton testID="avatar-button" alt="Sneezy" onPress={spy} />);

    fireEvent.press(screen.getByTestId('avatar-button'));

    expect(spy).toHaveBeenCalled();
  });
});
