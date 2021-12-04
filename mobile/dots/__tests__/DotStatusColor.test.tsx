import { render } from '@testing-library/react-native';
import { OFFSET } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { paletteAliasToRgbaString } from '../../utils/palette';

import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-color-test';

describe('DotStatusColor', () => {
  it('renders a DotStatusColor', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />,
    );

    expect(getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('can change variant to negative', () => {
    const { getByTestId } = render(<DotStatusColor variant="negative" />);

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      backgroundColor: paletteAliasToRgbaString('negative', 'light'),
    });
  });

  it('can change variant to positive', () => {
    const { getByTestId } = render(<DotStatusColor variant="positive" />);

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      backgroundColor: paletteAliasToRgbaString('positive', 'light'),
    });
  });

  it('can change size to small', () => {
    const iconSize = normalScaleMap.s;

    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" size="s" />,
    );

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      width: iconSize,
      height: iconSize,
    });
  });

  it('renders a white border', () => {
    const { getByTestId } = render(<DotStatusColor variant="negative" />);

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      borderColor: 'white',
      borderWidth: borderWidth.button,
    });
  });

  it('Placed in the correct position relative to its children', () => {
    const { getByTestId } = render(
      <DotStatusColor placement="bottom-start" variant="negative">
        <div />
      </DotStatusColor>,
    );

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: OFFSET,
      start: OFFSET,
    });
  });
});
