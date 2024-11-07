import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { AvatarButton } from '../AvatarButton';

describe('AvatarButton', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<AvatarButton alt="Sneezy" />)).toHaveNoViolations();
  });

  it('renders a button', () => {
    render(<AvatarButton alt="Sneezy" />);
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link', () => {
    render(<AvatarButton alt="Sneezy" to="/" />);
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    render(<AvatarButton alt="Sneezy" onPress={spy} />);

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onPress` to button element', () => {
    const spy = jest.fn();
    render(<AvatarButton alt="Sneezy" onPress={spy} />);

    expect(screen.getByRole('button')).not.toHaveAttribute('onPress');
  });
});
