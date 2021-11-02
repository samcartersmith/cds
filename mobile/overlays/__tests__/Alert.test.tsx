import { render, fireEvent } from '@testing-library/react-native';
import { Modal as RNModal, Animated } from 'react-native';
import { createStories, CreateAlertProps } from ':cds-storybook/stories/Alert';

import { Alert } from '../Alert';
import { Button } from '../../buttons';
import { PortalProvider } from '../PortalProvider';

jest.useFakeTimers();

const { MockAlert } = createStories({
  Alert,
  Button,
  PortalProvider,
} as CreateAlertProps);

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');

describe('Alert', () => {
  it('renders React Native Modal', () => {
    const result = render(<MockAlert />);

    expect(result.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show alert on press', () => {
    const result = render(<MockAlert />);

    expect(result.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(result.getByText('Show Alert'));

    // in animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
    expect(result.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('renders title', () => {
    const title = 'Test title';
    const { getByText } = render(<MockAlert visible title={title} />);

    expect(getByText(title)).toBeTruthy();
  });

  it('renders body', () => {
    const body = 'Test body';
    const { getByText } = render(<MockAlert visible body={body} />);

    expect(getByText(body)).toBeTruthy();
  });

  it('renders primary action', async () => {
    const primaryActionOnPress = jest.fn();
    const onRequestClose = jest.fn();

    const { getByText } = render(
      <MockAlert
        visible
        primaryActionTitle="Save"
        primaryActionOnPress={primaryActionOnPress}
        onRequestClose={onRequestClose}
      />,
    );

    fireEvent.press(getByText('Save'));

    expect(primaryActionOnPress).toHaveBeenCalledTimes(1);
    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });

  it('renders secondary action', () => {
    const secondaryActionOnPress = jest.fn();
    const onRequestClose = jest.fn();

    const { getByText } = render(
      <MockAlert
        visible
        secondaryActionTitle="Cancel"
        secondaryActionOnPress={secondaryActionOnPress}
        onRequestClose={onRequestClose}
      />,
    );

    fireEvent.press(getByText('Cancel'));

    expect(secondaryActionOnPress).toHaveBeenCalledTimes(1);
    // out animation
    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });
});
