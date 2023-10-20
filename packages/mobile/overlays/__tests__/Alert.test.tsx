import { Animated, Modal as RNModal } from 'react-native';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';

import { Button } from '../../buttons';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

const { MockAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');

describe('Alert', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders React Native Modal', () => {
    render(<MockAlert />);

    expect(screen.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show alert on press', () => {
    const title = 'Alert title';

    render(<MockAlert title={title} />);

    expect(screen.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(screen.getByText('Show Alert'));

    // in animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
    expect(screen.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('renders title and passes a11y', () => {
    const title = 'Test title';
    render(<MockAlert testID="mock-alert" title={title} />);

    fireEvent.press(screen.getByText('Show Alert'));

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByTestId('mock-alert')).toBeAccessible();
  });

  it('renders body and passes a11y', () => {
    const body = 'Test body';
    render(<MockAlert body={body} testID="mock-alert" />);

    fireEvent.press(screen.getByText('Show Alert'));

    expect(screen.getByText(body)).toBeTruthy();
    expect(screen.getByTestId('mock-alert-pictogram')).toBeTruthy();
    expect(screen.getByTestId('mock-alert')).toBeAccessible();
  });

  it('renders preferred action and passes a11y', () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();

    render(
      <MockAlert
        visible
        onPreferredActionPress={onPreferredActionPress}
        onRequestClose={onRequestClose}
        preferredActionLabel="Save"
        testID="mock-alert"
      />,
    );

    expect(screen.getByTestId('mock-alert')).toBeAccessible();

    fireEvent.press(screen.getByText('Save'));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);
    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });

  it('renders dismiss action and passes a11y', () => {
    const onRequestClose = jest.fn();

    render(
      <MockAlert
        visible
        dismissActionLabel="Cancel"
        onRequestClose={onRequestClose}
        testID="mock-alert"
      />,
    );

    expect(screen.getByTestId('mock-alert')).toBeAccessible();

    fireEvent.press(screen.getByText('Cancel'));

    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });
});
