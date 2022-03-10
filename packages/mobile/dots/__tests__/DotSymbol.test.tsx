import { fireEvent, render } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';

import { Icon } from '../../icons/Icon';
import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-symbol-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('renders a DotSymbol', () => {
    const { getByTestId } = render(<DotSymbol testID={DOTSYMBOL_TESTID} source={{ uri: src }} />);

    expect(getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });

  it('renders an image', () => {
    const { getByTestId } = render(<DotSymbol source={{ uri: src }} />);

    expect(getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });
  it('renders an image when source is a string', () => {
    const { getByTestId } = render(<DotSymbol source={src} />);

    expect(getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });

  it('Placed in the correct position relative to its children', () => {
    const iconSize = normalScaleMap.l;
    const dotSize = 16;

    const { getByTestId } = render(
      <DotSymbol testID={DOTSYMBOL_TESTID} pin="bottom-start" source={src}>
        <Icon name="airdrop" size="l" />
      </DotSymbol>,
    );

    // Trigger onLayout for the icon
    fireEvent(getByTestId(DOTSYMBOL_TESTID), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(getByTestId('dotsymbol-inner-container')).toHaveStyle({
      position: 'absolute',
      transform: [
        {
          translateX: -(dotSize / 2),
        },
        {
          translateY: iconSize - dotSize / 2,
        },
      ],
    });
  });
});
