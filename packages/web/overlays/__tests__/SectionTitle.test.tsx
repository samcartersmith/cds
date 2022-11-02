import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { SectionTitle } from '../PopoverMenu/SectionTitle';

describe('SectionTitle', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<SectionTitle text="Hi there" />)).toHaveNoViolations();
  });

  it('Uses a semantic heading element', () => {
    render(<SectionTitle text="Hi there" />);

    expect(screen.getByRole('heading')).toBeDefined();
  });
});
