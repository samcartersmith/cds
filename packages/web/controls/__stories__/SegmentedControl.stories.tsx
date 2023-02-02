/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { useState } from 'react';
import { IconName } from '@cbhq/cds-common';

import { VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { SegmentedControl } from '../SegmentedControl';

export default {
  title: 'Core Components/Segmented Control',
  component: SegmentedControl,
};

export const Normal = () => {
  const options1 = {
    eth: 'ETH',
    usd: 'USD',
  };

  const options2 = {
    chicken: '🐔',
    egg: '🥚',
  };

  const options3 = {
    black: 'black',
    white: 'white',
  };

  return (
    <VStack gap={2}>
      <SegmentedControl options={options1} />

      <SegmentedControl options={options2} />

      <SegmentedControl options={options3} disabled />
    </VStack>
  );
};

export const Dense = () => {
  const options = {
    eth: 'ETH',
    btc: 'BTC',
    usd: 'USD',
  };

  const [value, setValue] = useState('btc');

  return (
    <ThemeProvider scale="xSmall">
      <SegmentedControl options={options} value={value} onChange={setValue} />

      <pre>Selected value: {value}</pre>
    </ThemeProvider>
  );
};

export const Icons = () => {
  const options1: Record<string, IconName> = {
    eth: 'ethereum',
    usd: 'cashUSD',
  };

  const [value, setValue] = useState('eth');

  return (
    <VStack gap={2}>
      <pre>xs</pre>
      <SegmentedControl
        type="icon"
        iconSize="xs"
        options={options1}
        value={value}
        onChange={setValue}
      />

      <pre>s</pre>
      <SegmentedControl
        type="icon"
        iconSize="s"
        options={options1}
        value={value}
        onChange={setValue}
      />

      <pre>m</pre>
      <SegmentedControl
        type="icon"
        iconSize="m"
        options={options1}
        value={value}
        onChange={setValue}
      />

      <pre>l</pre>
      <SegmentedControl
        type="icon"
        iconSize="l"
        options={options1}
        value={value}
        onChange={setValue}
      />
    </VStack>
  );
};
