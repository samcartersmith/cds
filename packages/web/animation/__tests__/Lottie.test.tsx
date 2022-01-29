import { render } from '@testing-library/react';
import { nux } from '@cbhq/cds-lottie-files/nux';

import { Lottie } from '../Lottie';

describe('Lottie', () => {
  it('renders a div', () => {
    const { container } = render(<Lottie source={nux} />);
    expect(container.querySelectorAll('div')).toHaveLength(1);
  });
});
