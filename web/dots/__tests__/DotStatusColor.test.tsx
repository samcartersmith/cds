import { render } from '@testing-library/react';
import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { renderA11y } from '@cbhq/jest-utils';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';
import { OFFSET } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { paletteAliasToCssVar } from '../../utils/palette';
import { DotStatusColor } from '../DotStatusColor';

const DOTSTATUSCOLOR_TESTID = 'dot-status-test';

describe('DotStatusColor', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<DotStatusColor variant="negative" />)).toHaveNoViolations();
  });

  it('renders a DotStatusColor', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />,
    );

    expect(getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('renders a children within DotStatusColor', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative">
        <div />
      </DotStatusColor>,
    );
    expect(getByTestId(DOTSTATUSCOLOR_TESTID).firstChild).toBeTruthy();
  });

  it('can change variant to negative', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />,
    );

    expect(getByTestId(DOTSTATUSCOLOR_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToCssVar('negative'),
    });
  });

  it('can change variant to positive', () => {
    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="positive" />,
    );

    expect(getByTestId(DOTSTATUSCOLOR_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToCssVar('positive'),
    });
  });

  it('can change size to small', () => {
    const iconSize = normalScaleMap.s;

    const { getByTestId } = render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" size="s" />,
    );

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      width: `${iconSize}px`,
      height: `${iconSize}px`,
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
      bottom: `${OFFSET}px`,
      left: `${OFFSET}px`,
    });
  });
});
