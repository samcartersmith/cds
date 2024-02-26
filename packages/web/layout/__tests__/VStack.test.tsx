import { render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { VStack } from '../VStack';

const overrideStyle = { marginTop: 100 };

describe('VStack', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<VStack>Child</VStack>)).toHaveNoViolations();
  });

  it('applies margin styles when VStack is ul', () => {
    render(<VStack as="ul">Child</VStack>);

    expect(screen.getByRole('list')).not.toBeNull();
    expect(screen.getByRole('list')).toHaveStyle({ marginTop: 0, marginBottom: 0 });
  });

  it('can override a11y styles when VStack is ul with style', () => {
    render(
      <VStack as="ul" style={overrideStyle}>
        Child
      </VStack>,
    );
    expect(screen.getByRole('list')).not.toBeNull();
    expect(screen.getByRole('list')).toHaveStyle({ marginTop: 100, marginBottom: 0 });
  });
});
