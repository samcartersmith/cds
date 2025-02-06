import { fireEvent, render, screen } from '@testing-library/react';
import { Shape } from '@cbhq/cds-common2';
import { assets } from '@cbhq/cds-common2/internal/data/assets';
import { renderA11y } from '@cbhq/cds-web-utils';

import { Icon } from '../../icons/Icon';
import { RemoteImage } from '../../media';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';
import { Chip } from '../Chip';
import { ChipProps } from '../ChipProps';

const assetIconProps = {
  height: 16,
  shape: 'circle' as Shape,
  source: assets.eth.imageUrl,
  width: 16,
};

const testID = 'chip-test';

const customContentStyle = { maxWidth: 300 };

const ChipWithNodes = (props: Omit<ChipProps, 'children'>) => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    <Chip
      end={<Icon color="fg" name="caretDown" size="s" testID="start-test" />}
      start={<RemoteImage {...assetIconProps} testID="end-test" />}
      testID={testID}
      {...props}
    >
      <Text as="span" font="headline">
        USD
      </Text>
    </Chip>
  </ThemeProvider>
);

describe('Chip', () => {
  it('passes accessibility when start/end nodes are ReactElements', async () => {
    expect(await renderA11y(<ChipWithNodes />)).toHaveNoViolations();
  });

  it('renders correctly with value, start, and end props', () => {
    render(<ChipWithNodes />);

    expect(screen.getByTestId('start-test')).toBeVisible();
    expect(screen.getByText('USD')).toBeVisible();
    expect(screen.getByTestId('end-test')).toBeVisible();
    expect(screen.getByTestId(testID)).toBeVisible();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<ChipWithNodes onPress={onPress} />);

    fireEvent.click(screen.getByText('USD'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when passing custom styles to contentStyle prop', () => {
    render(<ChipWithNodes contentStyle={customContentStyle} />);

    expect(screen.getByTestId(testID)).toHaveStyle(`max-width: ${customContentStyle.maxWidth}px`);
  });
});
