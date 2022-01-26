import { SafeAreaProvider } from 'react-native-safe-area-context';
import { render } from '@testing-library/react-native';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { TextBody } from '../../../typography';
import { SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { Tray } from '../Tray';

const titleText = 'Test Title';

describe('Tray', () => {
  it('renders the Tray', () => {
    const onCloseCompleteSpy = jest.fn();
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy}>
          <TextBody>{loremIpsum}</TextBody>
        </Tray>
      </SafeAreaProvider>,
    );
    expect(getByText(loremIpsum)).toBeTruthy();
  });
  it('renders a title', () => {
    const onCloseCompleteSpy = jest.fn();
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {loremIpsum}
        </Tray>
      </SafeAreaProvider>,
    );

    expect(getByText(titleText)).toBeTruthy();
  });
  it('renders a HandleBar', () => {
    const onCloseCompleteSpy = jest.fn();
    const { getByTestId } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy}>{loremIpsum}</Tray>
      </SafeAreaProvider>,
    );
    expect(getByTestId('handleBar')).toBeTruthy();
  });
});
