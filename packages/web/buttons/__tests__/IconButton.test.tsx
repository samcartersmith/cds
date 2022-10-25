import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { IconButton } from '../IconButton';

describe('IconButton', () => {
  const name = 'arrowsHorizontal';

  it('passes accessibility', async () => {
    expect(
      await renderA11y(<IconButton name={name} accessibilityLabel={name} />),
    ).toHaveNoViolations();
  });

  it('renders a button', () => {
    render(<IconButton name={name} accessibilityLabel={name} />);
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link', () => {
    render(<IconButton name={name} accessibilityLabel={name} to="/" />);
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('can mark as disabled', () => {
    render(<IconButton disabled name={name} accessibilityLabel={name} />);

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    render(<IconButton onPress={spy} name={name} accessibilityLabel={name} />);

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onPress` to button element', () => {
    const spy = jest.fn();
    render(<IconButton onPress={spy} name={name} accessibilityLabel={name} />);

    expect(screen.getByRole('button')).not.toHaveAttribute('onPress');
  });
});
