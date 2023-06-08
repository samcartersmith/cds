import { render } from '@testing-library/react';
import { nux } from '@cbhq/cds-lottie-files/nux';

import { Lottie } from '../Lottie';

describe('Lottie', () => {
  it('renders a div', () => {
    const { container } = render(<Lottie source={nux} />);
    // It's generally discouraged to use the container or DOM traversing, however this is explicitly testing that a div is created.
    // General recommendation is to query by Role instead, but we do not have an aria role for Lottie divs.
    // - Emily Seibert, 10/24/2022
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelectorAll('div')).toHaveLength(1);
  });
});
