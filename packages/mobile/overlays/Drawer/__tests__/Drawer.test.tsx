import { Modal } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import {
  CreateLoremIpsumProps,
  loremIpsum,
  loremIpsumBuilder,
} from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { DrawerBaseProps } from '@cbhq/cds-common/types';

import { Button } from '../../../buttons';
import { VStack } from '../../../layout/VStack';
import { TextBody, TextLabel1 } from '../../../typography';
import { SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { Drawer } from '../Drawer';

const LoremIpsum = loremIpsumBuilder({
  TextBody,
  TextLabel1,
} as CreateLoremIpsumProps);

const MockDrawer: React.FC<Partial<DrawerBaseProps>> = ({ onCloseComplete, pin = 'bottom' }) => {
  const [isVisible, { toggleOn, toggleOff }] = useToggler(false);

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const handleRequestClose = () => {
    onCloseComplete?.();
    toggleOff();
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Button onPress={toggleOn} testID="open-drawer-button">
        Open Drawer
      </Button>
      {isVisible ? (
        <Drawer visible={isVisible} onCloseComplete={handleRequestClose} pin={pin}>
          {({ handleClose }) => (
            <VStack spacing={2}>
              <LoremIpsum />
              <Button testID="close-drawer-button" onPress={handleClose}>
                Close Drawer
              </Button>
            </VStack>
          )}
        </Drawer>
      ) : null}
    </SafeAreaProvider>
  );
};

const MockDrawerWithSafeArea = ({ ...props }) => {
  return (
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
      <MockDrawer {...props} />
    </SafeAreaProvider>
  );
};

// TODO: figure out how to write tests for overlay press (doesn't capture press event) and status bar visibility (no testId's or way of selecting)

describe('Drawer', () => {
  it('renders the Drawer', () => {
    const result = render(<MockDrawerWithSafeArea />);

    expect(result.UNSAFE_queryAllByType(Modal)).toBeTruthy();
  });
  it('opens the Drawer when trigger is pressed', () => {
    const { getByTestId, getByText } = render(<MockDrawerWithSafeArea />);

    fireEvent.press(getByTestId('open-drawer-button'));

    expect(getByText(loremIpsum)).toBeTruthy();
  });
  it('closes the Drawer when the close button is pressed', async () => {
    const onCloseComplete = jest.fn();
    const { getByText } = render(<MockDrawerWithSafeArea onCloseComplete={onCloseComplete} />);

    fireEvent.press(getByText('Open Drawer'));
    expect(getByText(loremIpsum)).toBeTruthy();

    fireEvent.press(getByText('Close Drawer'));
    // wait for animation to finish
    await waitFor(() => expect(onCloseComplete).toHaveBeenCalledTimes(1));
  });
  it('has a HandleBar by default for bottom pinned Drawer', () => {
    const { getByTestId, getByText } = render(<MockDrawerWithSafeArea pin="bottom" />);

    fireEvent.press(getByText('Open Drawer'));
    expect(getByText(loremIpsum)).toBeTruthy();

    expect(getByTestId('handleBar')).toBeTruthy();
  });
  it('does not close the drawer when preventDismissGestures is true', async () => {
    const onCloseComplete = jest.fn();
    const { getByText, getByTestId } = render(
      <MockDrawerWithSafeArea onCloseComplete={onCloseComplete} preventDismissGestures />,
    );

    fireEvent.press(getByText('Open Drawer'));
    expect(getByText(loremIpsum)).toBeTruthy();

    fireEvent.press(getByTestId('close-drawer-button'));

    // wait for animation to finish
    await waitFor(() => expect(onCloseComplete).not.toHaveBeenCalled());
  });
});
