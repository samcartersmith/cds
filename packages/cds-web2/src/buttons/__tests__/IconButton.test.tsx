/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { DefaultThemeProvider } from '../../utils/test';
import { IconButton } from '../IconButton';

const name = 'arrowsHorizontal';

describe('IconButton', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <IconButton accessibilityLabel="test-label" name={name} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders a button by default', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} />
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders a link when passed `to` prop', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} to="/" />
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('link');

    expect(button).toBeDefined();
    expect(button).toHaveAttribute('href', '/');
  });

  it('fires `onClick` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton name={name} onClick={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  describe('disabled', () => {
    it('disables user interaction when disabled', () => {
      const spy = jest.fn();
      render(
        <DefaultThemeProvider>
          <IconButton disabled name={name} onClick={spy} />
        </DefaultThemeProvider>,
      );

      fireEvent.click(screen.getByRole('button'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('passes accessibility', async () => {
      expect(
        await renderA11y(
          <DefaultThemeProvider>
            <IconButton disabled accessibilityLabel="test-label" name={name} />
          </DefaultThemeProvider>,
        ),
      ).toHaveNoViolations();
    });
  });

  describe('loading', () => {
    it('disables user interaction when loading', () => {
      const spy = jest.fn();
      render(
        <DefaultThemeProvider>
          <IconButton loading name={name} onClick={spy} />
        </DefaultThemeProvider>,
      );

      fireEvent.click(screen.getByRole('button'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('passes accessibility', async () => {
      expect(
        await renderA11y(
          <DefaultThemeProvider>
            <IconButton loading accessibilityLabel="test-label" name={name} />
          </DefaultThemeProvider>,
        ),
      ).toHaveNoViolations();
    });
  });

  it('sets forwarded ref', () => {
    const ref = { current: null };
    render(
      <DefaultThemeProvider>
        <IconButton ref={ref} name={name} />
      </DefaultThemeProvider>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('passes down testID', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toBeDefined();
  });
});
