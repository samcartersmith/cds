import { fireEvent, render } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common/src/hooks/useIconSize';

import { Icon } from '../../icons/Icon';
import { paletteAliasToRgbaString } from '../../utils/palette';
import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-color-test';
const INNER_CONTAINER_TESTID = 'dotstatuscolor-inner-container';

describe('DotStatusColor', () => {
  it('renders a DotStatusColor', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />,
    );

    expect(getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('can change variant to negative', () => {
    const { getByTestId } = render(<DotStatusColor variant="negative" />);

    expect(getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToRgbaString('negative', 'light'),
    });
  });

  it('can change variant to positive', () => {
    const { getByTestId } = render(<DotStatusColor variant="positive" />);

    expect(getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToRgbaString('positive', 'light'),
    });
  });

  it('can change size to small', () => {
    const iconSize = normalScaleMap.s;

    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" size="s" />,
    );

    expect(getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
      width: iconSize,
      height: iconSize,
    });
  });

  it('Placed in the correct position relative to its children', () => {
    const iconSize = normalScaleMap.l;
    const dotSize = 16;

    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} pin="bottom-start" variant="negative">
        <Icon name="airdrop" size="l" />
      </DotStatusColor>,
    );

    // Trigger onLayout for the icon
    fireEvent(getByTestId(DOTSTATUSCOLOR_TESTID), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(getByTestId(INNER_CONTAINER_TESTID)).toHaveStyle({
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
