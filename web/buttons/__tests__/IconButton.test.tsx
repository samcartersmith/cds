import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { IconButton } from '../IconButton';

describe('IconButton', () => {
  const name = 'arrowsHorizontal';

  it('passes accessibility', async () => {
    expect(
      await renderA11y(<IconButton name={name} accessibilityLabel={name} />),
    ).toHaveNoViolations();
  });

  it('renders a button', () => {
    const { container } = render(<IconButton name={name} accessibilityLabel={name} />);
    const button = container.querySelector('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link', () => {
    const { container } = render(<IconButton name={name} accessibilityLabel={name} to="/" />);
    const button = container.querySelector('a');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('can mark as disabled', () => {
    const { container } = render(<IconButton disabled name={name} accessibilityLabel={name} />);

    expect(container.querySelector('button')).toHaveAttribute('disabled');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(
      <IconButton onPress={spy} name={name} accessibilityLabel={name} />,
    );

    fireEvent.click(container.querySelector('button') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onPress` to button element', () => {
    const spy = jest.fn();
    const { container } = render(
      <IconButton onPress={spy} name={name} accessibilityLabel={name} />,
    );

    expect(container.querySelector('button')).not.toHaveAttribute('onPress');
  });
});
