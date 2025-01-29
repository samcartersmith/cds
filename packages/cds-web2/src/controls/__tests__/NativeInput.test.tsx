import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { NativeInput } from '../NativeInput';

const TEST_ID = 'native-input';

describe('NativeInput Accessibility', () => {
  const accessibilityLabel = 'label';

  it('passes accessibility', async () => {
    expect(await renderA11y(<NativeInput accessibilityLabel="label" />)).toHaveNoViolations();
  });

  it('can pass `aria-label` attribute', () => {
    render(<NativeInput accessibilityLabel={accessibilityLabel} testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
});

describe('NativeInput', () => {
  it('can change type', () => {
    render(<NativeInput testID={TEST_ID} type="number" />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('type', 'number');
  });

  it('can mark as disabled', () => {
    render(<NativeInput disabled testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });

  it('changes align style if override passed as align prop', () => {
    render(<NativeInput align="center" testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('style', 'text-align: center;');
  });
});

describe('NativeInput events', () => {
  it('fires `onClick` when clicked', () => {
    const spy = jest.fn();
    render(<NativeInput onClick={spy} testID={TEST_ID} />);

    fireEvent.click(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onFocus` when clicked', () => {
    const spy = jest.fn();
    render(<NativeInput onFocus={spy} testID={TEST_ID} />);

    fireEvent.focus(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onBlur` when clicking outside of input', () => {
    const spy = jest.fn();
    render(<NativeInput onBlur={spy} testID={TEST_ID} />);

    fireEvent.blur(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('text changes with `onChange`', () => {
    render(<NativeInput testID={TEST_ID} />);

    const input = screen.getByTestId(TEST_ID);

    fireEvent.change(input, { target: { value: 'desired text' } });

    expect(input).toHaveValue('desired text');
  });
});
