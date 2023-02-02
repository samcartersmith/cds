/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { fireEvent, render, screen } from '@testing-library/react';
import { IconName } from '@cbhq/cds-common';
import { renderA11y } from '@cbhq/cds-web-utils';

import { SegmentedControl } from '../SegmentedControl';

const options = {
  eth: 'Ethereum',
  usd: 'USD',
};

describe('SegmentedControl', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<SegmentedControl options={options} />)).toHaveNoViolations();
  });

  it('renders options', () => {
    render(<SegmentedControl options={options} />);

    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('renders text', () => {
    const items = {
      eth: 'Ethereum',
      btc: 'Bitcoin',
    };

    render(<SegmentedControl options={items} />);

    expect(screen.getAllByText('Ethereum')[0]).toBeVisible();
    expect(screen.getAllByText('Bitcoin')[0]).toBeVisible();
  });

  it('renders icons', () => {
    const iconNames: Record<string, IconName> = {
      eth: 'ethereum',
      usd: 'cashUSD',
    };

    render(<SegmentedControl options={iconNames} type="icon" iconSize="s" />);

    expect(screen.getAllByRole('presentation')).toHaveLength(2);
  });

  it('triggers onChange', () => {
    const onChange = jest.fn();

    render(<SegmentedControl options={options} onChange={onChange} />);

    fireEvent.click(screen.getAllByText('USD')[0]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('usd');
  });
});
