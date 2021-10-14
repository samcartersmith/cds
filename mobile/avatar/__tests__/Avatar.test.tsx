import { render } from '@testing-library/react-native';

import { ViewStyle } from 'react-native';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  it('has text fallback', () => {
    const { queryByText } = render(<Avatar name="TestName" />);
    expect(queryByText('T')).toBeTruthy();
  });

  it('renders an image', () => {
    const name = 'Test Name';
    const src = 'https://images.coinbase.com/avatar?s=56';
    const { queryByTestId, queryByText } = render(<Avatar name={name} src={src} />);
    const image = queryByTestId('avatar-image');
    expect(image).toBeTruthy();
    expect(image?.props.source).toEqual({ uri: src });

    expect(queryByText('T')).toBeFalsy();
  });

  it('has a border color', () => {
    const { queryByTestId } = render(<Avatar name="TestName" borderColor="positive" />);
    const box = queryByTestId('avatar-box');
    expect(box).toBeTruthy();

    const hasBorderColor =
      (box?.props.style as ViewStyle[]).findIndex(
        (style: ViewStyle) => style.borderColor === 'rgba(9,133,81,1)',
      ) > -1;

    const hasBorderWidth =
      (box?.props.style as ViewStyle[]).findIndex((style: ViewStyle) => style.borderWidth === 2) >
      -1;

    expect(hasBorderColor).toEqual(true);
    expect(hasBorderWidth).toEqual(true);
  });

  it('renders a custom size', () => {
    const { queryByTestId } = render(<Avatar name="TestName" dangerouslySetSize={100} />);

    const box = queryByTestId('avatar-box');
    expect(box).toBeTruthy();

    const hasWidth =
      (box?.props.style as ViewStyle[]).findIndex((style: ViewStyle) => style.width === 100) > -1;

    const hasHeight =
      (box?.props.style as ViewStyle[]).findIndex((style: ViewStyle) => style.height === 100) > -1;

    expect(hasWidth).toEqual(true);
    expect(hasHeight).toEqual(true);
  });

  it('handles shapes', () => {
    let { queryByTestId } = render(<Avatar name="TestName" />);
    let box = queryByTestId('avatar-box');

    const hasCircleBorderRadius =
      (box?.props.style as ViewStyle[]).findIndex(
        (style: ViewStyle) => style.borderRadius === 100,
      ) > -1;
    expect(hasCircleBorderRadius).toEqual(true);

    queryByTestId = render(<Avatar name="TestName" shape="squircle" />).queryByTestId;
    box = queryByTestId('avatar-box');

    const hasRegularBorderRadius =
      (box?.props.style as ViewStyle[]).findIndex((style: ViewStyle) => style.borderRadius === 8) >
      -1;

    expect(hasRegularBorderRadius).toEqual(true);
  });
});
