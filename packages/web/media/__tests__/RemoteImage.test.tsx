import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils';

import { RemoteImage } from '../RemoteImage';

const src = 'https://images.coinbase.com/avatar?s=56';
const TEST_ID = 'remote-image-test-id';
const TEST_ALT = 'An ironic image of a man throwing Bitcoin into the air';

describe('RemoteImage', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<RemoteImage source={src} testID={TEST_ID} />)).toHaveNoViolations();
  });

  it('renders as a decorative image by default', async () => {
    render(<RemoteImage source={src} testID={TEST_ID} />);
    const image = screen.getByTestId(TEST_ID);
    expect(image).toBeTruthy();

    expect(image).toHaveAttribute('alt', '');
  });

  it('handles a custom alt attribute', async () => {
    render(<RemoteImage source={src} testID={TEST_ID} alt={TEST_ALT} />);
    const image = screen.getByTestId(TEST_ID);
    expect(image).toBeTruthy();

    expect(image).toHaveAttribute('alt', TEST_ALT);
  });
});
