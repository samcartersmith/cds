import { render, screen } from '@testing-library/react-native';
import { borderRadius } from '@cbhq/cds-common2/tokens/borderRadius';
import { AvatarSize, avatarSizeMap } from '@cbhq/cds-common2/types/AvatarSize';

import { Avatar, coloredFallbackTestID } from '../Avatar';

const name = 'Test Name';

describe('Avatar', () => {
  it('renders an image', () => {
    const src = 'https://images.coinbase.com/avatar?s=56';
    render(<Avatar alt="" name={name} src={src} testID="avatar" />);
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeTruthy();
    expect(image?.props.source).toEqual({ uri: src });

    expect(image).toBeAccessible();

    expect(screen.queryByText('T')).toBeFalsy();
  });

  it('has a border color', () => {
    render(
      <Avatar
        alt=""
        borderColor="backgroundPositive"
        src="https://images.coinbase.com/avatar?s=56"
        testID="avatar"
      />,
    );
    const box = screen.queryByTestId('avatar');
    expect(box).toBeTruthy();

    expect(box).toBeAccessible();

    expect(box).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgba(9,133,81,1)',
    });
  });

  it('renders different sizes', () => {
    function renderAvatar(size: AvatarSize) {
      const px = avatarSizeMap[size];

      render(
        <Avatar
          alt=""
          name="TestName"
          size={size}
          src="https://images.coinbase.com/avatar?s=56"
          testID="avatar"
        />,
      );

      const box = screen.queryByTestId('avatar');
      expect(box).toBeTruthy();

      expect(box).toBeAccessible();

      expect(box).toHaveStyle({
        width: px,
        height: px,
      });
    }

    for (const size of ['m', 'l', 'xl', 'xxl', 'xxxl']) {
      renderAvatar(size as AvatarSize);
    }
  });

  it('handles shapes', () => {
    render(
      <Avatar
        alt=""
        name="TestName"
        src="https://images.coinbase.com/avatar?s=56"
        testID="avatar"
      />,
    );
    let box = screen.queryByTestId('avatar');

    expect(box).toBeAccessible();

    expect(box).toHaveStyle({
      borderRadius: borderRadius[1000],
    });

    render(
      <Avatar
        alt=""
        name="TestName"
        shape="square"
        src="https://images.coinbase.com/avatar?s=56"
        testID="avatar"
      />,
    );

    box = screen.queryByTestId('avatar');

    expect(box).not.toHaveStyle({
      borderRadius: borderRadius[1000],
    });
    expect(box).toHaveStyle({
      borderRadius: borderRadius[100],
    });

    render(
      <Avatar
        alt=""
        name="TestName"
        shape="hexagon"
        src="https://images.coinbase.com/avatar?s=56"
        testID="hexagon"
      />,
    );
    box = screen.queryByTestId('hexagon');
    expect(box).toBeTruthy();
  });
  it('when passed a name prop and no src is provided it shows a fallback color and first letter of name prop', async () => {
    render(<Avatar alt="" colorScheme="pink" name="TestName" testID="avatar" />);

    await screen.findByTestId(coloredFallbackTestID);

    expect(screen.getByTestId(coloredFallbackTestID)).toBeAccessible();

    expect(screen.getByText('T')).toBeTruthy();
  });
});
