import { render, screen } from '@testing-library/react';

import { PatternTag } from '../PatternTag';

describe('PatternTag', () => {
  it('should render children', () => {
    render(
      <PatternTag error>
        <div>Some children</div>
      </PatternTag>,
    );

    expect(screen.getByText('Some children')).toBeVisible();
  });
});
