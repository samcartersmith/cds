import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { Button } from '../Button';

describe('Button', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Button>Child</Button>)).toHaveNoViolations();
  });

  it('renders a button with a type', () => {
    const { container } = render(<Button>Child</Button>);
    const button = container.querySelector('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link with a href', () => {
    const { container } = render(<Button to="/">Child</Button>);
    const button = container.querySelector('a');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('can mark as disabled', () => {
    const { container } = render(<Button disabled>Child</Button>);

    expect(container.querySelector('button')).toHaveAttribute('disabled');
  });

  it('can change type', () => {
    const { container } = render(<Button type="submit">Child</Button>);

    expect(container.querySelector('button')).toHaveAttribute('type', 'submit');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    const { container } = render(<Button onPress={spy}>Child</Button>);

    fireEvent.click(container.querySelector('button') as HTMLButtonElement);

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt pass `onPress` to button element', () => {
    const spy = jest.fn();
    const { container } = render(<Button onPress={spy}>Child</Button>);

    expect(container.querySelector('button')).not.toHaveAttribute('onPress');
  });
});
