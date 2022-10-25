import { SafeAreaProvider } from 'react-native-safe-area-context';
import { render, screen } from '@testing-library/react-native';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { TextBody } from '../../../typography';
import { SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { Tray } from '../Tray';

const titleText = 'Test Title';

describe('Tray', () => {
  it('renders the Tray', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy}>
          <TextBody>{loremIpsum}</TextBody>
        </Tray>
      </SafeAreaProvider>,
    );
    expect(screen.getByText(loremIpsum)).toBeTruthy();
  });
  it('renders a title', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {loremIpsum}
        </Tray>
      </SafeAreaProvider>,
    );

    expect(screen.getByText(titleText)).toBeTruthy();
  });
  it('renders a HandleBar', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy}>{loremIpsum}</Tray>
      </SafeAreaProvider>,
    );
    expect(screen.getByTestId('handleBar')).toBeTruthy();
  });
});
