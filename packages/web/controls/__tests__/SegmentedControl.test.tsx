import { fireEvent, render, screen } from '@testing-library/react';
import { renderA11y } from '@cbhq/cds-web-utils';

import { IconOptions, SegmentedControl, TextOptions } from '../SegmentedControl';

const TEXT_OPTIONS: TextOptions = [
  {
    label: 'Ethereum',
    value: 'eth',
  },
  {
    label: 'Bitcoin',
    value: 'btc',
  },
];

const ICON_OPTIONS: IconOptions = [
  {
    label: 'ethereum',
    value: 'eth',
    accessibilityLabel: 'Ethereum',
  },
  {
    label: 'cashUSD',
    value: 'usd',
    accessibilityLabel: 'CashUSD',
  },
];

describe('SegmentedControl', () => {
  it('passes accessibility with text options', async () => {
    expect(await renderA11y(<SegmentedControl options={TEXT_OPTIONS} />)).toHaveNoViolations();
  });

  it('passes accessibility with icon options', async () => {
    expect(
      await renderA11y(<SegmentedControl options={ICON_OPTIONS} type="icon" iconSize="s" />),
    ).toHaveNoViolations();
  });

  it('renders options', () => {
    render(<SegmentedControl options={TEXT_OPTIONS} />);

    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('renders text', () => {
    render(<SegmentedControl options={TEXT_OPTIONS} />);

    expect(screen.getAllByText('Ethereum')[0]).toBeVisible();
    expect(screen.getAllByText('Bitcoin')[0]).toBeVisible();
  });

  it('renders icons', () => {
    render(<SegmentedControl options={ICON_OPTIONS} type="icon" iconSize="s" />);

    expect(screen.getAllByTestId('icon-base-glyph')).toHaveLength(8);
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();

    render(<SegmentedControl options={TEXT_OPTIONS} onChange={onChange} />);

    fireEvent.click(screen.getAllByText('Bitcoin')[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('btc');
  });
});
