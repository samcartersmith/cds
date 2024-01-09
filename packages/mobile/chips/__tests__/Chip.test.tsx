import { fireEvent, render, screen } from '@testing-library/react-native';
import { Shape } from '@cbhq/cds-common';
import { assets } from '@cbhq/cds-common/internal/data/assets';

import { Icon } from '../../icons';
import { RemoteImage } from '../../media';
import { TextHeadline } from '../../typography';
import { Chip } from '../Chip';
import { ChipProps } from '../ChipProps';

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
  accessibilityLabel: 'ethereum',
  width: 16,
};

const chipTestID = 'chip-test';

const TestChip = (props: Omit<ChipProps, 'children'>) => (
  <Chip
    end={<Icon color="foreground" name="caretDown" size="s" testID="end-test" />}
    start={<RemoteImage {...assetIconProps} testID="start-test" />}
    testID={chipTestID}
    {...props}
  >
    <TextHeadline>USD</TextHeadline>
  </Chip>
);

describe('Chip', () => {
  it('passes accessibility when start/end nodes are ReactNodes', () => {
    render(<TestChip />);
    expect(screen.getByText('USD')).toBeAccessible();
  });

  it('renders correctly with value, start, and end props', () => {
    render(<TestChip />);

    expect(screen.getByTestId('start-test')).toBeVisible();
    expect(screen.getByText('USD')).toBeVisible();
    expect(screen.getByTestId('end-test')).toBeVisible();
    expect(screen.getByTestId(chipTestID)).toBeVisible();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<TestChip onPress={onPress} />);

    fireEvent.press(screen.getByTestId(chipTestID));

    expect(onPress).toHaveBeenCalled();
  });
});
