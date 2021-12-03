import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import { OFFSET } from '@cbhq/cds-common/hooks/useDotPlacementStyles';

import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-status-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<DotSymbol source={src} />)).toHaveNoViolations();
  });

  it('renders a DotSymbol', () => {
    const { getByTestId } = render(<DotSymbol testID={DOTSYMBOL_TESTID} source={src} />);

    expect(getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });

  it('can be attached to a children', () => {
    const { getByTestId } = render(
      <DotSymbol testID={DOTSYMBOL_TESTID} source={src}>
        <div />
      </DotSymbol>,
    );

    expect(getByTestId(DOTSYMBOL_TESTID).firstChild).toBeTruthy();
  });

  it('Placed in the correct position relative to its children', () => {
    const { getByTestId } = render(
      <DotSymbol placement="bottom-start" source={src}>
        <div />
      </DotSymbol>,
    );

    expect(getByTestId('dotsymbol-inner-container')).toHaveStyle({
      position: 'absolute',
      bottom: `${OFFSET}px`,
      left: `${OFFSET}px`,
    });
  });
});
