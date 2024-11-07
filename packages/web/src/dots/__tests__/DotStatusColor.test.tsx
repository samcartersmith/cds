import { render, screen, within } from '@testing-library/react';
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
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toBeDefined();
  });

  it('renders children within DotStatusColor', () => {
    render(
      <DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative">
        <div>Test</div>
      </DotStatusColor>,
    );

    const dot = screen.getByTestId(DOTSTATUSCOLOR_TESTID);
    expect(within(dot).getByText('Test')).toBeTruthy();
  });

  it('can change variant to negative', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToCssVar('negative'),
    });
  });

  it('can change variant to positive', () => {
    render(<DotStatusColor testID={DOTSTATUSCOLOR_TESTID} variant="positive" />);

    expect(screen.getByTestId(DOTSTATUSCOLOR_TESTID)).toHaveStyle({
      backgroundColor: paletteAliasToCssVar('positive'),
    });
  });

  it('can change size to small', () => {
    const iconSize = normalScaleMap.s;

    render(<DotStatusColor size="s" testID={DOTSTATUSCOLOR_TESTID} variant="negative" />);

    expect(screen.getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      width: `${iconSize}px`,
      height: `${iconSize}px`,
    });
  });

  it('Placed in the correct position relative to its children', () => {
    render(
      <DotStatusColor pin="bottom-start" variant="negative">
        <div />
      </DotStatusColor>,
    );

    expect(screen.getByTestId('dotstatuscolor-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'translate(-50%, 50%)',
    });
  });
});
