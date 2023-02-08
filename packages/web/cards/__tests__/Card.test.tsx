import { fireEvent, render, screen } from '@testing-library/react';
import { noop } from '@cbhq/cds-utils';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { FeatureFlagProvider } from '../../system';
import { Card } from '../Card';

const CARD_TEXT = 'Some cell text';
const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

describe('Card', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Card>{CARD_TEXT}</Card>)).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(await renderA11y(<Card onPress={noop}>{CARD_TEXT}</Card>)).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(await renderA11y(<Card to={URL}>{CARD_TEXT}</Card>)).toHaveNoViolations();
  });

  it('sets an accessible label with accessibilityLabel when pressable', () => {
    render(
      <Card onPress={noop} accessibilityLabel={A11Y_TEXT}>
        {CARD_TEXT}
      </Card>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <>
        <span id={labelId}>{A11Y_TEXT}</span>
        <Card onPress={noop} accessibilityLabelledBy={labelId}>
          {CARD_TEXT}
        </Card>
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <Card onPress={noop} accessibilityHint={descriptionId}>
          {CARD_TEXT}
        </Card>
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('renders children', () => {
    render(<Card>{CARD_TEXT}</Card>);

    expect(screen.getByText(CARD_TEXT)).toBeVisible();
  });

  it('renders frontier', () => {
    render(
      <FeatureFlagProvider frontierCard>
        <Card onPress={noop}>{CARD_TEXT}</Card>
      </FeatureFlagProvider>,
    );

    expect(screen.getByText(CARD_TEXT)).toBeVisible();
  });

  it('renders button when onPress is defined', () => {
    render(<Card onPress={noop}>{CARD_TEXT}</Card>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyPress is defined', () => {
    render(<Card onKeyPress={noop}>{CARD_TEXT}</Card>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(<Card to={URL}>{CARD_TEXT}</Card>);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(<Card href={URL}>{CARD_TEXT}</Card>);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(
      <Card onPress={noop} to={URL}>
        {CARD_TEXT}
      </Card>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(
      <Card onPress={noop} href={URL}>
        {CARD_TEXT}
      </Card>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(
      <Card to={URL} target={target}>
        {CARD_TEXT}
      </Card>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onPress', () => {
    const onPressSpy = jest.fn();

    render(<Card onPress={onPressSpy}>{CARD_TEXT}</Card>);
    fireEvent.click(screen.getByRole('button'));

    expect(onPressSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyPress', () => {
    const onKeyPressSpy = jest.fn();

    render(<Card onKeyPress={onKeyPressSpy}>{CARD_TEXT}</Card>);
    fireEvent.keyPress(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyPressSpy).toHaveBeenCalledTimes(1);
  });
});
