import { render } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { Group } from '../Group';

describe('Group', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Group>Child</Group>)).toHaveNoViolations();
  });

  it('defaults to role=group', () => {
    const { queryByRole } = render(<Group>Child</Group>);
    expect(queryByRole('group')).not.toBeNull();
  });
});
