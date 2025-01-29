import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@cbhq/cds-utils';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Cell } from '../Cell';

const CELL_TEXT = 'Some cell text';
const EXPECTED_TEXT = 'Some expected text';
const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

describe('Cell', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Cell>{CELL_TEXT}</Cell>)).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(await renderA11y(<Cell onPress={noop}>{CELL_TEXT}</Cell>)).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(await renderA11y(<Cell to={URL}>{CELL_TEXT}</Cell>)).toHaveNoViolations();
  });

  it('sets an accessible label with accessibilityLabel when pressable', () => {
    render(
      <Cell accessibilityLabel={A11Y_TEXT} onPress={noop}>
        {CELL_TEXT}
      </Cell>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <>
        <span id={labelId}>{A11Y_TEXT}</span>
        <Cell accessibilityLabelledBy={labelId} onPress={noop}>
          {CELL_TEXT}
        </Cell>
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <Cell accessibilityHint={descriptionId} onPress={noop}>
          {CELL_TEXT}
        </Cell>
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('renders children', () => {
    render(<Cell>{CELL_TEXT}</Cell>);

    expect(screen.getByText(CELL_TEXT)).toBeVisible();
  });

  it('renders media', () => {
    render(<Cell media={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>);

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders intermediary', () => {
    render(<Cell intermediary={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>);

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders detail', () => {
    render(<Cell detail={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>);

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders accessory', () => {
    render(<Cell accessory={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>);

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders button when onPress is defined', () => {
    render(<Cell onPress={noop}>{CELL_TEXT}</Cell>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyUp is defined', () => {
    render(<Cell onKeyUp={noop}>{CELL_TEXT}</Cell>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyDown is defined', () => {
    render(<Cell onKeyDown={noop}>{CELL_TEXT}</Cell>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(<Cell to={URL}>{CELL_TEXT}</Cell>);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(<Cell href={URL}>{CELL_TEXT}</Cell>);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(
      <Cell onPress={noop} to={URL}>
        {CELL_TEXT}
      </Cell>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(
      <Cell href={URL} onPress={noop}>
        {CELL_TEXT}
      </Cell>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(
      <Cell target={target} to={URL}>
        {CELL_TEXT}
      </Cell>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onPress', () => {
    const onPressSpy = jest.fn();

    render(<Cell onPress={onPressSpy}>{CELL_TEXT}</Cell>);
    fireEvent.click(screen.getByRole('button'));

    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyUp', () => {
    const onKeyUpSpy = jest.fn();

    render(<Cell onKeyUp={onKeyUpSpy}>{CELL_TEXT}</Cell>);
    fireEvent.keyUp(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyUpSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyDown', () => {
    const onKeyDownSpy = jest.fn();

    render(<Cell onKeyDown={onKeyDownSpy}>{CELL_TEXT}</Cell>);
    fireEvent.keyDown(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });
});
