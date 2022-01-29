import { render } from '@testing-library/react';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

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

  it('Placed in the correct position relative to its children', () => {
    const { getByTestId } = render(
      <DotStatusColor pin="bottom-start" variant="negative">
        <div />
      </DotStatusColor>,
    );

    expect(getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)',
    });
  });
});
