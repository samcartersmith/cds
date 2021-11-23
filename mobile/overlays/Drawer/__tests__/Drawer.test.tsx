import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Modal, ScrollView } from 'react-native';
import { SelectOptionCell } from '@cbhq/cds-mobile/controls/SelectOptionCell';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from '../../../buttons';
import { Drawer } from '../Drawer';
import { VStack } from '../../../layout/VStack';
import { createStories, CreateDrawerProps } from ':cds-storybook/stories/Drawer';
import { SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import {
  createLoremIpsum,
  CreateLoremIpsumProps,
  loremIpsum,
} from ':cds-storybook/stories/LoremIpsum';
import { TextBody, TextLabel1 } from '../../../typography';

const LoremIpsum = createLoremIpsum({
  TextBody,
  TextLabel1,
} as CreateLoremIpsumProps);

const { MockDrawer } = createStories({
  Drawer,
  Button,
  LoremIpsum,
  VStack,
  ScrollView,
  SelectOptionCell,
} as CreateDrawerProps);

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
