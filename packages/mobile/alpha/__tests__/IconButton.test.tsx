import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { IconButton } from '../IconButton';

jest.mock('../../utils/debounce');

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
(debounce as jest.Mock).mockImplementation((fn) => fn);

const name = 'allTimeHigh';

describe('IconButton', () => {
  it('passes accessibility', async () => {
    render(<IconButton accessibilityLabel="test-label" name={name} />);

    expect(screen.getByRole('button')).toBeAccessible();
  });

  it('renders an accessibility label', () => {
    render(<IconButton accessibilityLabel="test-label" name={name} />);

    expect(screen.getByLabelText('test-label')).toBeTruthy();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    render(<IconButton name={name} onPress={spy} />);

    fireEvent.press(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('disables user interaction when disabled', () => {
    const spy = jest.fn();
    render(<IconButton disabled name={name} onPress={spy} />);

    fireEvent.press(screen.getByRole('button'));

    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeAccessible({
      // disable 'disabled-state-required' since it's flagging passing disabled
      // to Interactable and unclear if we're lacking a11y affordances here
      customViolationHandler: (violations) => {
        return violations.filter(
          (v) =>
            v.problem !== "This component has a disabled state but it isn't exposed to the user",
        );
      },
    });
  });

  it('disables user interaction when loading', () => {
    const spy = jest.fn();
    render(<IconButton loading name={name} onPress={spy} />);

    fireEvent.press(screen.getByRole('button'));

    expect(spy).not.toHaveBeenCalled();
    // we want to check that loading state maps to busy accessibility state but
    // that's not actually covered by react-native-accessibility-engine yet
    expect(screen.getByRole('button')).toBeAccessible();
  });

  it('passes down testID', () => {
    render(<IconButton name={name} testID="test-test-id" />);

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });
});
