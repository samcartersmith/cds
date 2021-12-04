import { render, fireEvent, waitFor } from '@testing-library/react';

import { renderA11y } from '@cbhq/jest-utils';
import { Toast } from '../Toast';
import { Animated } from '../../animation/Animated';

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');

const mockAction = {
  label: 'Action',
  onPress: jest.fn(),
  testID: 'toast-action',
};

describe('Toast', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<Toast text="toast copy" />)).toHaveNoViolations();
  });

  it('renders text and close button', () => {
    const text = 'Toast copy';
    const { getByText, getByTestId } = render(<Toast text={text} />);

    expect(getByText(text)).toBeTruthy();
    expect(getByTestId('toast-close-button')).toBeTruthy();
  });

  it('renders action', () => {
    const text = 'Toast copy';

    const { getByTestId } = render(<Toast text={text} action={mockAction} />);

    fireEvent.click(getByTestId(mockAction.testID));
    expect(mockAction.onPress).toHaveBeenCalledTimes(1);
  });

  it('triggers animation', () => {
    const text = 'Toast copy';
    render(<Toast text={text} />);

    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });

  it('fires callbacks on close', async () => {
    const text = 'Toast copy';
    const onWillHide = jest.fn();
    const onDidHide = jest.fn();

    jest.useFakeTimers();

    const { getByTestId } = render(
      <Toast text={text} onWillHide={onWillHide} onDidHide={onDidHide} />,
    );

    fireEvent.click(getByTestId('toast-close-button'));

    expect(onWillHide).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(onDidHide).toHaveBeenCalledTimes(1));
  });
});
