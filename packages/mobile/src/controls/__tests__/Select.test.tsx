import { ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render } from '@testing-library/react-native';
import { CreateSelectProps, selectBuilderMobile } from '@cbhq/cds-common/src/internal/selectBuilder';

import { Tray } from '../../overlays/Tray/Tray';
import { SAFE_AREA_METRICS } from '../../utils/testHelpers';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

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
