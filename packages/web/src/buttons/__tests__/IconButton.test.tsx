import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { IconButton } from '../IconButton';

const name = 'arrowsHorizontal';

describe('IconButton', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<IconButton accessibilityLabel="test-label" name={name} />),
    ).toHaveNoViolations();
  });

  it('renders a button by default', () => {
    render(<IconButton name={name} />);
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link when passed `to` prop', () => {
    render(<IconButton name={name} to="/" />);
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('fires `onPress` when clicked', () => {
    const spy = jest.fn();
    render(<IconButton name={name} onPress={spy} />);

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  describe('disabled', () => {
    it('disables user interaction when disabled', () => {
      const spy = jest.fn();
      render(<IconButton disabled name={name} onPress={spy} />);

      fireEvent.click(screen.getByRole('button'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('passes accessibility', async () => {
      expect(
        await renderA11y(<IconButton disabled accessibilityLabel="test-label" name={name} />),
      ).toHaveNoViolations();
    });
  });

  describe('loading', () => {
    it('disables user interaction when loading', () => {
      const spy = jest.fn();
      render(<IconButton loading name={name} onPress={spy} />);

      fireEvent.click(screen.getByRole('button'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('passes accessibility', async () => {
      expect(
        await renderA11y(<IconButton loading accessibilityLabel="test-label" name={name} />),
      ).toHaveNoViolations();
    });
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };
    render(<IconButton ref={ref} name={name} />);

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('passes down testID', () => {
    render(<IconButton name={name} testID="test-test-id" />);

    expect(screen.getByTestId('test-test-id')).toBeDefined();
  });
});
