import { Animated, Modal as RNModal } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { alertBuilder, CreateAlertProps } from '@cbhq/cds-common/internal/alertBuilder';

import { Button } from '../../buttons';
import { Alert } from '../Alert';
import { PortalProvider } from '../PortalProvider';

jest.useFakeTimers({
  legacyFakeTimers: true,
});

const { MockAlert } = alertBuilder({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');

describe('Alert', () => {
  it('renders React Native Modal', () => {
    render(<MockAlert />);

    expect(screen.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show alert on press', () => {
    render(<MockAlert />);

    expect(screen.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(screen.getByText('Show Alert'));

    // in animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
    expect(screen.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('renders title', () => {
    const title = 'Test title';
    render(<MockAlert visible title={title} />);

    expect(screen.getByText(title)).toBeTruthy();
  });

  it('renders body', () => {
    const body = 'Test body';
    render(<MockAlert visible body={body} />);

    expect(screen.getByText(body)).toBeTruthy();
  });

  it('renders preferred action', async () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();

    render(
      <MockAlert
        visible
        preferredActionLabel="Save"
        onPreferredActionPress={onPreferredActionPress}
        onRequestClose={onRequestClose}
      />,
    );

    fireEvent.press(screen.getByText('Save'));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);
    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });

  it('renders dismiss action', () => {
    const onRequestClose = jest.fn();

    render(<MockAlert visible dismissActionLabel="Cancel" onRequestClose={onRequestClose} />);

    fireEvent.press(screen.getByText('Cancel'));

    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });
});
