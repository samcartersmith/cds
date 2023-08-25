import { render, screen } from '@testing-library/react';
import glyphMap from '@cbhq/cds-icons/__generated__/glyphMap';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders a check icon when checked', () => {
    render(<Checkbox checked>Checked</Checkbox>);

    const icon = screen.getByText(glyphMap['ui-checkmark-16']);
    expect(icon).toBeTruthy();
  });

  it('renders a minus icon when indeterminate', () => {
    render(<Checkbox indeterminate>Indeterminate</Checkbox>);

    const icon = screen.getByText(glyphMap['ui-minus-16']);
    expect(icon).toBeTruthy();
  });
});
