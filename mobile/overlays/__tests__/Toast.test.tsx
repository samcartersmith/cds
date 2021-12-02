import { render, fireEvent } from '@testing-library/react-native';
import { Animated } from 'react-native';
import { Toast } from '../Toast';
import { Link } from '../../typography';

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

describe('Toast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders text and close button', () => {
    const text = 'Toast copy';
    const { getByText, getByTestId } = render(<Toast text={text} />);

    expect(getByText(text)).toBeTruthy();
    expect(getByTestId('toast-close-button')).toBeTruthy();
  });

  it('renders action', () => {
    const text = 'Toast copy';
    const actionId = 'toast-action';
    const action = (
      <Link to="https://www.google.com/" testID={actionId}>
        Action
      </Link>
    );
    const { getByTestId } = render(<Toast text={text} action={action} />);

    expect(getByTestId(actionId)).toBeTruthy();
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

    fireEvent.press(getByTestId('toast-close-button'));

    expect(onWillHide).toHaveBeenCalledTimes(1);
    expect(onDidHide).toHaveBeenCalledTimes(1);
  });
});
