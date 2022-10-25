import { fireEvent, render, screen } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';

import { Icon } from '../../icons/Icon';
import { paletteAliasToRgbaString } from '../../utils/palette';
import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-color-test';
const INNER_CONTAINER_TESTID = 'dotstatuscolor-inner-container';

describe('DotStatusColor', () => {
  it('renders a DotStatusColor', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('can change variant to negative', () => {
    render(<DotStatusColor variant="negative" />);

    expect(screen.getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToRgbaString('negative', 'light'),
    });
  });

  it('can change variant to positive', () => {
    render(<DotStatusColor variant="positive" />);

    expect(screen.getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToRgbaString('positive', 'light'),
    });
  });

  it('can change size to small', () => {
    const iconSize = normalScaleMap.s;

    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" size="s" />);

    expect(screen.getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      width: iconSize,
      height: iconSize,
    });
  });

  it('Placed in the correct position relative to its children', () => {
    const iconSize = normalScaleMap.l;
    const dotSize = 16;

    render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} pin="bottom-start" variant="negative">
        <Icon name="airdrop" size="l" />
      </DotStatusColor>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSTATUSCOLOR_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(screen.getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
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
