import { ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render } from '@testing-library/react-native';
import { CreateSelectProps, selectBuilderMobile } from '@cbhq/cds-common/internal/selectBuilder';

import { HStack, VStack } from '../../layout';
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
} as CreateSelectProps);

const placeholderText = 'Choose something';

describe('Select Input', () => {
  it('renders the Select Input trigger', async () => {
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect placeholder={placeholderText} />
      </SafeAreaProvider>,
    );

    expect(getByText(placeholderText)).toBeTruthy();
  });
  it('prevents press interactions when disabled', () => {
    const onPressSpy = jest.fn();
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect placeholder={placeholderText} onPress={onPressSpy} disabled />
      </SafeAreaProvider>,
    );

    fireEvent.press(getByText(placeholderText));

    expect(onPressSpy).not.toHaveBeenCalled();
  });
});
