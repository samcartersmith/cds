import { ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { CreateSelectProps, selectBuilderMobile } from '@cbhq/cds-common/internal/selectBuilder';

import { DotSymbol } from '../../dots';
import { Box, HStack, VStack } from '../../layout';
import { RemoteImage } from '../../media';
import { Tray } from '../../overlays/Tray/Tray';
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
        <DefaultSelect testID="mock-select" placeholder={placeholderText} />
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
        <DefaultSelect placeholder={placeholderText} onPress={onPressSpy} disabled />
      </SafeAreaProvider>,
    );

    fireEvent.press(screen.getByText(placeholderText));

    expect(onPressSpy).not.toHaveBeenCalled();
  });
});
