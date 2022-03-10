import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { DotCount } from '../DotCount';
import { Icon } from '../../icons/Icon';

const DOTCOUNT_TESTID = 'dot-count-test';

describe('DotCount', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<DotCount variant="negative" count={1} />)).toHaveNoViolations();
  });

  it('renders a DotCount', () => {
    const { getByTestId } = render(
      <DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />,
    );

    expect(getByTestId(DOTCOUNT_TESTID)).toBeTruthy();
  });

  it('renders correct count when count equals 1', () => {
    const { getByText } = render(
      <DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />,
    );

    expect(getByText('1')).toBeTruthy();
  });

  it('renders correct count when count  0', () => {
    const { queryByText } = render(<DotCount variant="negative" count={0} />);

    expect(queryByText('0')).toBeNull();
  });

  it('renders count 99+ when count > 99', () => {
    const { getByText } = render(<DotCount variant="negative" count={120} />);

    expect(getByText('99+')).toBeTruthy();
  });

  it('Placed in the correct position relative to its children', () => {
    const { getByTestId } = render(
      <DotCount pin="top-end" variant="negative" count={1}>
        <Icon name="airdrop" size="m" />
      </DotCount>,
    );

    expect(getByTestId('dotcount-outer-container')).toHaveStyle({
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'translate(50%, -50%)',
    });
  });
});
