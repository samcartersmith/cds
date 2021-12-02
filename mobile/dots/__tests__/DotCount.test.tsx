import { borderWidth } from '@cbhq/cds-common/tokens/border';
import { render } from '@testing-library/react-native';

import { OFFSET } from '@cbhq/cds-common/hooks/useDotPlacementStyles';
import { DotCount } from '../DotCount';
import { Icon } from '../../icons/Icon';

const DOTCOUNT_TESTID = 'dot-count-test';

describe('DotCount', () => {
  it('renders a DotCount', () => {
    const { getByTestId } = render(
      <DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />,
    );

    expect(getByTestId(DOTCOUNT_TESTID)).toBeTruthy();
  });

  it('renders a white border', () => {
    const { getByTestId } = render(<DotCount variant="negative" count={1} />);

    expect(getByTestId('dot-outer-container-test-id')).toHaveStyle({
      borderColor: 'white',
      borderWidth: borderWidth.button,
    });
  });

  it('renders correct count when count equals 1', () => {
    const { getByText } = render(
      <DotCount testID={DOTCOUNT_TESTID} variant="negative" count={1} />,
    );

    expect(getByText('1')).toBeTruthy();
  });

  it('renders correct count when count  0', () => {
    const { getByText } = render(<DotCount variant="negative" count={0} />);

    expect(getByText('0')).toBeTruthy();
  });

  it('renders count 99+ when count > 99', () => {
    const { getByText } = render(<DotCount variant="negative" count={120} />);

    expect(getByText('99+')).toBeTruthy();
  });

  it('DotCount is placed in the correct position relative to its children', () => {
    const { getByTestId } = render(
      <DotCount placement="bottom-start" variant="negative" count={1}>
        <Icon name="airdrop" size="m" />
      </DotCount>,
    );

    expect(getByTestId('dot-outer-container-test-id')).toHaveStyle({
      position: 'absolute',
      bottom: OFFSET,
      start: OFFSET,
    });
  });
});
