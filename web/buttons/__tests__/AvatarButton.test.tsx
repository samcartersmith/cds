import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';

import { AvatarButton } from '../AvatarButton';

describe('AvatarButton', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<AvatarButton alt="Sneezy" />)).toHaveNoViolations();
  });

  it('renders a button', () => {
    const { container } = render(<AvatarButton alt="Sneezy" />);
    const button = container.querySelector('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link', () => {
    const { container } = render(<AvatarButton alt="Sneezy" to="/" />);
    const button = container.querySelector('a');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('can mark as disabled', () => {
    const { container } = render(<AvatarButton alt="Sneezy" disabled />);

    expect(container.querySelector('button')).toHaveAttribute('disabled');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(<AvatarButton alt="Sneezy" onPress={spy} />);

    fireEvent.click(container.querySelector('button') as Element);

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onPress` to button element', () => {
    const spy = jest.fn();
    const { container } = render(<AvatarButton alt="Sneezy" onPress={spy} />);

    expect(container.querySelector('button')).not.toHaveAttribute('onPress');
  });
});
