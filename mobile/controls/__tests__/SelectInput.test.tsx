import { render, fireEvent } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import {
  selectInputBuilderMobile,
  CreateSelectInputProps,
} from '@cbhq/cds-common/internal/selectInputBuilder';

import { SelectInput } from '../SelectInput';
import { Tray } from '../../overlays/Tray/Tray';
import { SelectOptionCell } from '../SelectOptionCell';
import { SAFE_AREA_METRICS } from '../../utils/testHelpers';

const { DefaultSelectInput } = selectInputBuilderMobile({
  Tray,
  SelectInput,
  SelectOptionCell,
  ScrollView,
} as CreateSelectInputProps);

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
        <DefaultSelectInput options={options} placeholder={placeholderText} />
      </SafeAreaProvider>,
    );

    expect(getByText(placeholderText)).toBeTruthy();
  });
  it('prevents press interactions when disabled', () => {
    const onPressSpy = jest.fn();
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <DefaultSelectInput
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
