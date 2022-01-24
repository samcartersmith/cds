import { render, fireEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { selectBuilderMobile, CreateSelectProps } from '@cbhq/cds-common/internal/selectBuilder';

import { Select } from '../Select';
import { Tray } from '../../overlays/Tray/Tray';
import { SelectOption } from '../SelectOption';
import { SAFE_AREA_METRICS } from '../../utils/testHelpers';

const { DefaultSelect } = selectBuilderMobile({
  Tray,
  Select,
  SelectOption,
  ScrollView,
} as unknown as CreateSelectProps);

const options = [
  {
    label: 'Cake',
    value: 'CAKE',
  },
  {
    label: 'Death',
    value: 'DEATH',
  },
];

const placeholderText = 'Choose something';

describe('Select Input', () => {
  it('renders the Select Input trigger', async () => {
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect options={options} placeholder={placeholderText} />
      </SafeAreaProvider>,
    );

    expect(getByText(placeholderText)).toBeTruthy();
  });
  it('prevents press interactions when disabled', () => {
    const onPressSpy = jest.fn();
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelect
          options={options}
          placeholder={placeholderText}
          onPress={onPressSpy}
          disabled
        />
      </SafeAreaProvider>,
    );

    fireEvent.press(getByText(placeholderText));

    expect(onPressSpy).not.toHaveBeenCalled();
  });
});
