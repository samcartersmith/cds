import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../Button';

describe('Button', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Button>Child</Button>)).toHaveNoViolations();
  });

  it('renders a button with a type', () => {
    render(<Button>Child</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link with a href', () => {
    render(<Button to="/">Child</Button>);
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('can mark as disabled', () => {
    render(<Button disabled>Child</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  it('can change type', () => {
    render(<Button type="submit">Child</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    render(<Button onPress={spy}>Child</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onPress` to button element', () => {
    const spy = jest.fn();
    render(<Button onPress={spy}>Child</Button>);

    expect(screen.getByRole('button')).not.toHaveAttribute('onPress');
  });
});
