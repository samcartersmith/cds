import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Icon } from '../../icons/Icon';
import { DotCount } from '../DotCount';

const DOTCOUNT_TESTID = 'dot-count-test';

describe('DotCount', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<DotCount variant="negative" count={1} />)).toHaveNoViolations();
  });

  it('renders a DotCount', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />);

    expect(screen.getByTestId(DOTCOUNT_TESTID)).toBeTruthy();
  });

  it('renders correct count when count equals 1', () => {
    render(<DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />);

    expect(screen.getByText('1')).toBeTruthy();
  });

  it('renders correct count when count  0', () => {
    render(<DotCount variant="negative" count={0} />);

    expect(screen.queryByText('0')).toBeNull();
  });

  it('renders count 99+ when count > 99', () => {
    render(<DotCount variant="negative" count={120} />);

    expect(screen.getByText('99+')).toBeTruthy();
  });

  it('Placed in the correct position relative to its children', () => {
    render(
      <DotCount pin="top-end" variant="negative" count={1}>
        <Icon name="airdrop" size="m" />
      </DotCount>,
    );

    expect(screen.getByTestId('dotcount-outer-container')).toHaveStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)',
    });
  });
});
