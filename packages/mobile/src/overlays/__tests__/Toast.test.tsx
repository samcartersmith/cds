import { render, fireEvent } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { Toast } from '../Toast';

jest.mock('react-native/Libraries/Animated/Animated', () => {
  return {
    ...jest.requireActual<Record<string, unknown>>('react-native/Libraries/Animated/Animated'),
    parallel: () => {
      return {
        start: jest.fn((callback?: ({ finished }: { finished: boolean }) => void) => {
          callback?.({ finished: true });
        }),
      };
    },
  };
});

const animationParallelSpy = jest.spyOn(Animated, 'parallel');
const animationTimingSpy = jest.spyOn(Animated, 'timing');
jest.useFakeTimers('legacy');

describe('Toast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders text', () => {
    const text = 'Toast copy';
    const { getByText } = render(<Toast text={text} />);

    expect(getByText(text)).toBeTruthy();
  });

  it('renders action', () => {
    const onWillHide = jest.fn();
    const onDidHide = jest.fn();
    const text = 'Toast copy';
    const action = {
      label: 'Action',
      onPress: jest.fn(),
      testID: 'toast-action',
    };
    const { getByTestId } = render(
      <Toast text={text} action={action} onWillHide={onWillHide} onDidHide={onDidHide} />,
    );

    fireEvent.press(getByTestId(action.testID));
    expect(action.onPress).toHaveBeenCalledTimes(1);
    expect(onWillHide).toHaveBeenCalledTimes(1);
    expect(onDidHide).toHaveBeenCalledTimes(1);
  });

  it('triggers animation', () => {
    const text = 'Toast copy';
    render(<Toast text={text} />);

    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });
});
