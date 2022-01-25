import { fireEvent, render } from '@testing-library/react-native';
import { normalScaleMap } from '@cbhq/cds-common/hooks/useIconSize';
import { borderWidth } from '@cbhq/cds-common/tokens/border';

import { Icon } from '../../icons/Icon';
import { DotCount } from '../DotCount';

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

    expect(getByTestId('dotcount-inner-container')).toHaveStyle({
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
    const { queryByText } = render(<DotCount variant="negative" count={0} />);

    expect(queryByText('0')).toBeNull();
  });

  it('renders count 99+ when count > 99', () => {
    const { getByText } = render(<DotCount variant="negative" count={120} />);

    expect(getByText('99+')).toBeTruthy();
  });

  it('DotCount is placed in the correct position relative to its children', () => {
    const iconSize = normalScaleMap.l;
    const dotSize = 24;

    const { getByTestId } = render(
      <DotCount pin="top-end" testID={DOTCOUNT_TESTID} variant="negative" count={1}>
        <Icon name="airdrop" size="l" />
      </DotCount>,
    );

    // Trigger onLayout for the icon
    fireEvent(getByTestId(DOTCOUNT_TESTID), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    // Trigger onLayout for the dot
    fireEvent(getByTestId('dotcount-inner-container'), 'layout', {
      nativeEvent: { layout: { height: dotSize, width: dotSize } },
    });

    expect(getByTestId('dotcount-inner-container')).toHaveStyle({
      position: 'absolute',
      transform: [
        {
          translateX: iconSize - dotSize / 2,
        },
        {
          translateY: -(dotSize / 2),
        },
      ],
    });
  });
});
