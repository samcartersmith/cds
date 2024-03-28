import { useContext } from 'react';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { render, screen } from '@testing-library/react-native';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { TextBody, TextTitle2 } from '../../../typography';
import { SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { Tray, TrayContext } from '../Tray';

const titleText = 'Test Title';

describe('Tray', () => {
  it('renders the Tray and passes a11y', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy} testID="mock-tray">
          <TextBody>{loremIpsum}</TextBody>
        </Tray>
      </SafeAreaProvider>,
    );
    expect(screen.getByText(loremIpsum)).toBeTruthy();
    expect(screen.getByTestId('mock-tray')).toBeAccessible();
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

  it('renders a custom node for title', () => {
    const onCloseCompleteSpy = jest.fn();
    const customTitle = <TextTitle2 testID="test-title">Test Title</TextTitle2>;
    render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy} title={customTitle}>
          {loremIpsum}
        </Tray>
      </SafeAreaProvider>,
    );

    expect(screen.getByTestId('test-title')).toBeTruthy();
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

  it('calls onVibilityChange callback on open and close', () => {
    const onVisibilityChangeSpy = jest.fn();
    const onCloseCompleteSpy = jest.fn();
    const { unmount } = render(
      <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
        <Tray onCloseComplete={onCloseCompleteSpy} onVisibilityChange={onVisibilityChangeSpy}>
          {loremIpsum}
        </Tray>
      </SafeAreaProvider>,
    );

    expect(onVisibilityChangeSpy).toHaveBeenCalledWith('visible');

    unmount();

    expect(onVisibilityChangeSpy).toHaveBeenCalledWith('hidden');
  });

  it('renders correctly and provides the correct context value', () => {
    const verticalDrawerPercentageOfView = 0.75;
    const titleHeight = 0;

    // Create a test component that will consume the context value and render it
    const TestComponent = () => {
      const contextValue = useContext(TrayContext);
      return <Text testID="context-value">{JSON.stringify(contextValue)}</Text>;
    };

    render(
      <TrayContext.Provider value={{ verticalDrawerPercentageOfView, titleHeight }}>
        <TestComponent />
      </TrayContext.Provider>,
    );

    const contextValueElement = screen.getByTestId('context-value');

    // eslint-disable-next-line testing-library/no-node-access
    expect(contextValueElement.props.children).toBe(
      JSON.stringify({ verticalDrawerPercentageOfView, titleHeight }),
    );
  });
});
