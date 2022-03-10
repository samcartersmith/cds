import { fireEvent, render } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { NativeTextArea } from '../NativeTextArea';

const TEST_ID = 'native-textarea';

describe('NativeTextArea Accessibility', () => {
  const accessibilityLabel = 'label';

  it('passes accessibility', async () => {
    expect(await renderA11y(<NativeTextArea accessibilityLabel="label" />)).toHaveNoViolations();
  });

  it('can pass `aria-label` attribute', () => {
    const { getByTestId } = render(
      <NativeTextArea accessibilityLabel={accessibilityLabel} testID={TEST_ID} />,
    );

    expect(getByTestId(TEST_ID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
});

describe('NativeTextArea', () => {
  it('can mark as disabled', () => {
    const { getByTestId } = render(<NativeTextArea disabled testID={TEST_ID} />);

    expect(getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });
});

describe('NativeTextArea events', () => {
  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(<NativeTextArea onPress={spy} testID={TEST_ID} />);

    fireEvent.click(container.querySelector('textarea') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onFocus` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(<NativeTextArea onFocus={spy} testID={TEST_ID} />);

    fireEvent.focus(container.querySelector('textarea') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onBlur` when clicking outside of input', () => {
    const spy = jest.fn();
    const { container } = render(<NativeTextArea onBlur={spy} testID={TEST_ID} />);

    fireEvent.blur(container.querySelector('textarea') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('text changes with `onChange`', () => {
    const { getByTestId } = render(<NativeTextArea testID={TEST_ID} />);

    const textarea = getByTestId(TEST_ID);

    fireEvent.change(textarea, { target: { value: 'desired text' } });

    expect(textarea).toHaveValue('desired text');
  });
});
