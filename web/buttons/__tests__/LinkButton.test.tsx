import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { LinkButton } from '../LinkButton';

describe('LinkButton', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<LinkButton>Child</LinkButton>)).toHaveNoViolations();
  });

  it('should render with anchor element', async () => {
    const { container } = render(<LinkButton>Child</LinkButton>);
    expect(container.querySelector('button')).toBeTruthy();
  });

  it('able to set accessibilityLabel', async () => {
    const { container } = render(<LinkButton accessibilityLabel="link-label">Child</LinkButton>);
    expect(container.querySelector('button')).toHaveAttribute('aria-label', 'link-label');
  });

  it('can set disabled', async () => {
    const { container } = render(<LinkButton disabled>Child</LinkButton>);
    expect(container.querySelector('button')).toHaveAttribute('disabled');
  });

  it('fires `onPress` when pressed', async () => {
    const spy = jest.fn();
    const result = render(<LinkButton onPress={spy}>Child</LinkButton>);

    fireEvent.click(result.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });
});
