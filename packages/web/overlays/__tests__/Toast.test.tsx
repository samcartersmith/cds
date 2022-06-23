import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Toast } from '../Toast';

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
    expect(await findByTestId('toast-close-button')).toBeVisible();
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
});
