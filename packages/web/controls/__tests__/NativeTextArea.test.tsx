import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { NativeTextArea } from '../NativeTextArea';
import { TextInput } from '../TextInput';

const TEST_ID = 'native-textarea';

describe('NativeTextArea Accessibility', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<TextInput inputNode={<NativeTextArea />} label="label" />),
    ).toHaveNoViolations();
  });
});

describe('NativeTextArea', () => {
  it('can mark as disabled', () => {
    render(<NativeTextArea disabled testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });
});

describe('NativeTextArea events', () => {
  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    render(<NativeTextArea onPress={spy} testID={TEST_ID} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onFocus` when clicked', () => {
    const spy = jest.fn();
    render(<NativeTextArea onFocus={spy} testID={TEST_ID} />);

    fireEvent.focus(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onBlur` when clicking outside of input', () => {
    const spy = jest.fn();
    render(<NativeTextArea onBlur={spy} testID={TEST_ID} />);

    fireEvent.blur(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('text changes with `onChange`', () => {
    render(<NativeTextArea testID={TEST_ID} />);

    const textarea = screen.getByTestId(TEST_ID);

    fireEvent.change(textarea, { target: { value: 'desired text' } });

    expect(textarea).toHaveValue('desired text');
  });
});
