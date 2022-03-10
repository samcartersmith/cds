import { render } from '@testing-library/react-native';

import { AvatarSize } from '@cbhq/cds-common/types/AvatarSize';
import { getNormalAvatarPixelSize } from '@cbhq/cds-common/media/useAvatarSize';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('renders an image', () => {
    const name = 'Test Name';
    const src = 'https://images.coinbase.com/avatar?s=56';
    const { queryByTestId, queryByText } = render(<Avatar alt={name} src={src} testID="avatar" />);
    const image = queryByTestId('avatar-image');
    expect(image).toBeTruthy();
    expect(image?.props.source).toEqual({ uri: src });

    expect(queryByText('T')).toBeFalsy();
  });

  it('has a border color', () => {
    const { queryByTestId } = render(
      <Avatar
        alt="TestName"
        borderColor="positive"
        src="https://images.coinbase.com/avatar?s=56"
        testID="avatar"
      />,
    );
    const box = queryByTestId('avatar');
    expect(box).toBeTruthy();

    expect(box).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgba(9,133,81,1)',
    });
  });

  it('renders different sizes', () => {
    function renderAvatar(size: AvatarSize) {
      const px = getNormalAvatarPixelSize(size);

      const { queryByTestId } = render(
        <Avatar
          size={size}
          alt="TestName"
          src="https://images.coinbase.com/avatar?s=56"
          testID="avatar"
        />,
      );

      const box = queryByTestId('avatar');
      expect(box).toBeTruthy();

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
    let { queryByTestId } = render(
      <Avatar alt="TestName" src="https://images.coinbase.com/avatar?s=56" testID="avatar" />,
    );
    let box = queryByTestId('avatar');

    expect(box).toHaveStyle({
      borderRadius: 100,
    });

    queryByTestId = render(
      <Avatar
        alt="TestName"
        shape="square"
        src="https://images.coinbase.com/avatar?s=56"
        testID="avatar"
      />,
    ).queryByTestId;
    box = queryByTestId('avatar');

    expect(box).not.toHaveStyle({
      borderRadius: 100,
    });
  });
});
