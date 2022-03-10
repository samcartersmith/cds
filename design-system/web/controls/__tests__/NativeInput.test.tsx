import { renderA11y } from '@cbhq/jest-utils';
import { render, fireEvent } from '@testing-library/react';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'native-input';

describe('NativeInput Accessibility', () => {
  const accessibilityLabel = 'label';

  it('passes accessibility', async () => {
    expect(await renderA11y(<NativeInput accessibilityLabel="label" />)).toHaveNoViolations();
  });

  it('can pass `aria-label` attribute', () => {
    const { getByTestId } = render(
      <NativeInput accessibilityLabel={accessibilityLabel} testID={TEST_ID} />,
    );

    expect(getByTestId(TEST_ID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
});

describe('NativeInput', () => {
  it('can change type', () => {
    const { getByTestId } = render(<NativeInput testID={TEST_ID} type="number" />);

    expect(getByTestId(TEST_ID)).toHaveAttribute('type', 'number');
  });

  it('can mark as disabled', () => {
    const { getByTestId } = render(<NativeInput disabled testID={TEST_ID} />);

    expect(getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });
});

describe('NativeInput events', () => {
  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(<NativeInput onPress={spy} testID={TEST_ID} />);

    fireEvent.click(container.querySelector('input') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onFocus` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(<NativeInput onFocus={spy} testID={TEST_ID} />);

    fireEvent.focus(container.querySelector('input') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onBlur` when clicking outside of input', () => {
    const spy = jest.fn();
    const { container } = render(<NativeInput onBlur={spy} testID={TEST_ID} />);

    fireEvent.blur(container.querySelector('input') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('text changes with `onChange`', () => {
    const { getByTestId } = render(<NativeInput testID={TEST_ID} />);

    const input = getByTestId(TEST_ID);

    fireEvent.change(input, { target: { value: 'desired text' } });

    expect(input).toHaveValue('desired text');
  });
});
