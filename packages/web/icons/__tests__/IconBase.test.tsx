import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { IconBase } from '../IconBase';

type IconBaseExampleProps = {
  accessibilityLabel?: string;
  title?: string;
};

const IconBaseExample = (props: IconBaseExampleProps) => (
  <IconBase name="copy" size="m" {...props} />
);

describe('IconBase', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<IconBaseExample />)).toHaveNoViolations();
  });

  it('is aria hidden by default', () => {
    render(<IconBaseExample />);

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('is not aria hidden and has an accessible label when `accessibilityLabel` is defined', () => {
    const label = 'some label';

    render(<IconBaseExample accessibilityLabel={label} />);

    const icon = screen.getByRole('img');

    expect(icon).toBeTruthy();
    expect(icon).toHaveAttribute('aria-label', label);
    expect(icon).toHaveAttribute('title', label);
  });
});
