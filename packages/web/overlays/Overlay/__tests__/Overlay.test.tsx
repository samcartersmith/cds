import { render, waitFor } from '@testing-library/react';

import { Overlay } from '../Overlay';

describe('Overlay', () => {
  it('renders static overlay', () => {
    const { getByTestId } = render(<Overlay testID="overlay-content" />);

    expect(getByTestId('overlay-content')).toBeVisible();
  });

  it('renders animated overlay', async () => {
    const { getByTestId } = render(<Overlay testID="overlay-content" animated />);

    await waitFor(() => {
      expect(getByTestId('overlay-content-motion')).toHaveStyle({ opacity: 1 });
      expect(getByTestId('overlay-content')).toBeVisible();
    });
  });
});
