import { render, screen } from '@testing-library/react-native';
import { getNormalAvatarPixelSize } from '@cbhq/cds-common/media/useAvatarSize';
import { paletteValueToHex } from '@cbhq/cds-common/palette/paletteValueToHex';
import { borderRadius } from '@cbhq/cds-common/tokens/borderRadius';
import { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';

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
        borderColor="positive"
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
      const px = getNormalAvatarPixelSize(size);

      render(
        <Avatar
          alt=""
          size={size}
          name="TestName"
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
      borderRadius: borderRadius.roundedFull,
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
      borderRadius: borderRadius.roundedFull,
    });
    expect(box).toHaveStyle({
      borderRadius: borderRadius.roundedSmall,
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
    render(<Avatar alt="" name="TestName" colorScheme="pink" testID="avatar" />);

    const pinkBackgroundColor = paletteValueToHex('pink60', 'light');

    await screen.findByTestId(coloredFallbackTestID);

    expect(screen.getByTestId(coloredFallbackTestID)).toHaveStyle({
      backgroundColor: pinkBackgroundColor,
    });

    expect(screen.getByTestId(coloredFallbackTestID)).toBeAccessible();

    expect(screen.getByText('T')).toBeTruthy();
  });
});
