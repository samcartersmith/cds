import { Modal } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { drawerAnimationDefaultDuration } from '@cbhq/cds-common/animation/drawer';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import {
  CreateLoremIpsumProps,
  loremIpsum,
  loremIpsumBuilder,
} from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { durations } from '@cbhq/cds-common/motion/tokens';
import { DrawerBaseProps } from '@cbhq/cds-common/types';
import { delay } from '@cbhq/cds-common/utils/delay';

import { Button } from '../../../buttons';
import { VStack } from '../../../layout/VStack';
import { TextBody, TextLabel1 } from '../../../typography';
import { SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { Drawer } from '../Drawer';

// We're using the drawers animation time here just to be extra close to the implementation
const DURATION: number = Number(durations[drawerAnimationDefaultDuration ?? 'moderate3']) + 10;

const LoremIpsum = loremIpsumBuilder({
  TextBody,
  TextLabel1,
} as CreateLoremIpsumProps);

const MockDrawer = ({
  onCloseComplete,
  pin = 'bottom',
  preventDismissGestures,
}: Partial<DrawerBaseProps>) => {
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
        <Drawer
          visible={isVisible}
          onCloseComplete={handleRequestClose}
          pin={pin}
          preventDismissGestures={preventDismissGestures}
        >
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
  beforeAll(() => {
    jest.useRealTimers();
  });
  it('renders the Drawer', () => {
    render(<MockDrawerWithSafeArea />);

    expect(screen.UNSAFE_queryAllByType(Modal)).toBeTruthy();
  });
  it('opens the Drawer when trigger is pressed', () => {
    render(<MockDrawerWithSafeArea />);

    fireEvent.press(screen.getByTestId('open-drawer-button'));

    expect(screen.getByText(loremIpsum)).toBeTruthy();
  });
  it('closes the Drawer when the close button is pressed', async () => {
    const onCloseComplete = jest.fn();
    render(<MockDrawerWithSafeArea onCloseComplete={onCloseComplete} />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    fireEvent.press(screen.getByText('Close Drawer'));
    // wait for animation to finish
    await waitFor(() => expect(onCloseComplete).toHaveBeenCalledTimes(1));
  });
  it('has a HandleBar by default for bottom pinned Drawer', () => {
    render(<MockDrawerWithSafeArea pin="bottom" />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    expect(screen.getByTestId('handleBar')).toBeTruthy();
  });
  it('does not close the drawer on overlay press when preventDismissGestures is true', async () => {
    const onCloseComplete = jest.fn();
    render(<MockDrawerWithSafeArea onCloseComplete={onCloseComplete} preventDismissGestures />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    fireEvent(screen.getByTestId('drawer-overlay'), 'onTouchStart');

    // Make sure the drawer is still visible after the expected animation duration
    await delay(DURATION);
    expect(onCloseComplete).not.toHaveBeenCalled();
  });
});
