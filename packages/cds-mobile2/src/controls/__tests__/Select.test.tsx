import { ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { CreateSelectProps, selectBuilderMobile } from '@cbhq/cds-common2/internal/selectBuilder';

import { DotSymbol } from '../../dots';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Tray } from '../../overlays/Tray/Tray';
import { TextBody } from '../../typography';
import { SAFE_AREA_METRICS } from '../../utils/testHelpers';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';
import { TextInput } from '../TextInput';

const { DefaultSelect } = selectBuilderMobile({
  Tray,
  Select,
  SelectOption,
  ScrollView,
  HStack,
  VStack,
  TextInput,
  Box,
  RemoteImage,
  DotSymbol,
} as CreateSelectProps);

const placeholderText = 'Choose something';

describe('Select Input', () => {
  it('passes a11y', () => {
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect placeholder={placeholderText} testID="mock-select" />
      </SafeAreaProvider>,
    );
    expect(screen.getByTestId('mock-select')).toBeAccessible();
  });
  it('renders the Select Input trigger', async () => {
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect placeholder={placeholderText} />
      </SafeAreaProvider>,
    );

    expect(screen.getByText(placeholderText)).toBeTruthy();
  });
  it('prevents press interactions when disabled', () => {
    const onPressSpy = jest.fn();
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect disabled onPress={onPressSpy} placeholder={placeholderText} />
      </SafeAreaProvider>,
    );

    fireEvent.press(screen.getByText(placeholderText));

    expect(onPressSpy).not.toHaveBeenCalled();
  });
  it('renders error icon in helper text when variant is negative', async () => {
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect helperText="helper text" placeholder={placeholderText} variant="negative" />
      </SafeAreaProvider>,
    );

    expect(screen.getByTestId('select-error-icon')).toBeTruthy();
    expect(screen.getByTestId('select-error-icon')).toBeAccessible();
  });
  it('should not render error icon when passing helper text node', async () => {
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect
          helperText={<TextBody>helper text</TextBody>}
          placeholder={placeholderText}
          variant="negative"
        />
      </SafeAreaProvider>,
    );

    expect(screen.queryByTestId('select-error-icon')).toBeFalsy();
  });
});
