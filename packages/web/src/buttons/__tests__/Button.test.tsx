import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Box } from '../../layout';
import { Button } from '../Button';

const testA11yLabel = 'test-a11y-label';

describe('Button', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Button>Child</Button>)).toHaveNoViolations();
  });
  it('passes accessibility when loading', async () => {
    expect(await renderA11y(<Button loading>Child</Button>)).toHaveNoViolations();
  });

  it('renders a button with an accessibility label if provided', () => {
    render(<Button accessibilityLabel={testA11yLabel}>Child</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', testA11yLabel);
  });

  it('renders a button with a custom accessibility label if provided and loading is true', () => {
    render(
      <Button loading accessibilityLabel={testA11yLabel}>
        Child
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', testA11yLabel);
  });

  it('renders a button with a loading spinner and children are visually hidden when loading is true', () => {
    render(<Button loading>Child</Button>);
    const button = screen.getByRole('button');
    const buttonChild = screen.getByText('Child');

    expect(button).toHaveAttribute('aria-label', 'Loading');
    expect(buttonChild).toHaveClass('visibilityHidden');
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

  it('renders a button with a ReactNode as endIcon', () => {
    const CustomIcon = () => <Box testID="custom-react-node">Custom Icon</Box>;
    render(<Button end={<CustomIcon />}>Child</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(screen.getByTestId('custom-react-node')).toBeInTheDocument();
  });
});
