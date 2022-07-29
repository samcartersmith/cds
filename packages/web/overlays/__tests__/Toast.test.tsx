import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Toast } from '../Toast';

const MOCK_A11Y_LABEL = 'We can jam';
const MOCK_CLOSE_LABEL = 'We can slam';
const MOCK_A11Y_PROPS = { accessibilityLabel: MOCK_CLOSE_LABEL };
const mockAction = {
  label: 'Action',
  onPress: jest.fn(),
  testID: 'toast-action',
};

describe('Toast', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<Toast text="toast copy" />)).toHaveNoViolations();
  });

  it('renders text and close button', async () => {
    const text = 'Toast copy';
    const { findByText, findByTestId } = render(<Toast text={text} />);

    expect(await findByText(text)).toBeVisible();
    expect(await findByTestId('cds-toast-close-button')).toBeVisible();
    expect(await findByTestId('cds-toast-close-button')).toHaveAccessibleName('close');
  });

  it('renders action', () => {
    const text = 'Toast copy';

    const { getByTestId } = render(<Toast text={text} action={mockAction} />);

    fireEvent.click(getByTestId(mockAction.testID));
    expect(mockAction.onPress).toHaveBeenCalledTimes(1);
  });

  it('has correct styles at the end of animation', async () => {
    const text = 'Toast copy';
    const { getByTestId } = render(<Toast text={text} action={mockAction} testID="mock-toast" />);

    await waitFor(() =>
      expect(getByTestId('mock-toast-motion')).toHaveStyle({ opacity: 1, transform: 'none' }),
    );
  });

  it('can provide a11y props', async () => {
    const text = 'Toast copy';
    const { findByTestId } = render(
      <Toast
        text={text}
        action={mockAction}
        testID="mock-toast"
        accessibilityLabel={MOCK_A11Y_LABEL}
        closeButtonAccessibilityProps={MOCK_A11Y_PROPS}
      />,
    );

    expect(await findByTestId('mock-toast-close-button')).toHaveAccessibleName(MOCK_CLOSE_LABEL);
    expect(await findByTestId('mock-toast')).toHaveAccessibleName(MOCK_A11Y_LABEL);
  });
});
