import { render, screen, waitFor } from '@testing-library/react-native';
import LottieView from 'lottie-react-native';
import {
  LottieStatusAnimationProps,
  LottieStatusAnimationType,
  useStatusAnimationPoller,
} from '@cbhq/cds-common2';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

type UseStatusAnimationPollerParams = {
  onFinish?: () => void;
};

type UseStatusAnimationPollerReturn = ReturnType<typeof useStatusAnimationPoller>;

type CdsCommonMockTypes = {
  useStatusAnimationPoller: typeof useStatusAnimationPoller;
};

jest.mock('@cbhq/cds-common2', () => {
  const actual: CdsCommonMockTypes = jest.requireActual('@cbhq/cds-common2');

  return {
    ...actual,
    useStatusAnimationPoller: jest
      .fn<UseStatusAnimationPollerReturn, [UseStatusAnimationPollerParams]>()
      .mockImplementation(({ onFinish }) => {
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 1000);
        return jest.fn();
      }),
  };
});

describe('LottieStatusAnimation', () => {
  it('renders a LottieStatusAnimation', () => {
    render(<LottieStatusAnimation height="100" testID="lottie-status-animation-test" />);

    expect(screen.UNSAFE_queryAllByType(LottieView)).toHaveLength(1);
    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
  });

  it('renders a LottieStatusAnimation and calls onFinish', async () => {
    const mockOnFinish = jest.fn();

    render(
      <LottieStatusAnimation
        height="100"
        onFinish={mockOnFinish}
        testID="lottie-status-animation-test"
      />,
    );

    expect(screen.getByTestId('lottie-status-animation-test')).toBeTruthy();
    await waitFor(() => expect(mockOnFinish).toHaveBeenCalled(), { timeout: 1500 });
  });

  it('renders LottieStatusAnimation with different status values', () => {
    const testStatuses: LottieStatusAnimationType[] = ['loading', 'success', 'failure', 'pending'];

    testStatuses.forEach((status) => {
      const props: LottieStatusAnimationProps = {
        status,
        testID: `lottie-status-animation-${status}`,
        height: '100',
      };

      render(<LottieStatusAnimation {...props} />);
      expect(screen.getByTestId(`lottie-status-animation-${status}`)).toBeTruthy();
    });
  });
});
