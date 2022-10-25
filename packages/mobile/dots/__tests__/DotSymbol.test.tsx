import { fireEvent, render, screen } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';

import { Icon } from '../../icons/Icon';
import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-symbol-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('renders a DotSymbol', () => {
    render(<DotSymbol testID={DOTSYMBOL_TESTID} source={{ uri: src }} />);

    expect(screen.getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });

  it('renders an image', () => {
    render(<DotSymbol source={{ uri: src }} />);

    expect(screen.getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });
  it('renders an image when source is a string', () => {
    render(<DotSymbol source={src} />);

    expect(screen.getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });

  it('Placed in the correct position relative to its children', () => {
    const iconSize = normalScaleMap.l;
    const dotSize = 16;

    render(
      <DotSymbol testID={DOTSYMBOL_TESTID} pin="bottom-start" source={src}>
        <Icon name="airdrop" size="l" />
      </DotSymbol>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSYMBOL_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(screen.getByTestId('dotsymbol-inner-container')).toHaveStyle({
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
