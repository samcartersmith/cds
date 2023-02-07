/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import { useState } from 'react';

import { VStack } from '../../layout';
import { ThemeProvider } from '../../system/ThemeProvider';
import { IconOptions, SegmentedControl, TextOptions } from '../SegmentedControl';

export default {
  title: 'Core Components/Segmented Control',
  component: SegmentedControl,
};

export const Normal = () => {
  const options1: TextOptions = [
    {
      label: 'ETH',
      value: 'eth',
    },
    {
      label: 'USD',
      value: 'usd',
    },
  ];

  const options2: TextOptions = [
    {
      label: '🐔',
      value: 'chicken',
    },
    {
      label: '🥚',
      value: 'egg',
    },
  ];

  const options3: TextOptions = [
    {
      label: 'black',
      value: 'black',
    },
    {
      label: 'white',
      value: 'white',
    },
  ];

  return (
    <VStack gap={2}>
      <SegmentedControl options={options1} />

      <SegmentedControl options={options2} />

      <SegmentedControl options={options3} disabled />
    </VStack>
  );
};

export const Dense = () => {
  const options: TextOptions = [
    {
      label: 'ETH',
      value: 'eth',
    },
    {
      label: 'BTC',
      value: 'btc',
    },
    {
      label: 'USD',
      value: 'usd',
    },
  ];

  const [value, setValue] = useState('btc');

  return (
    <ThemeProvider scale="xSmall">
      <SegmentedControl options={options} value={value} onChange={setValue} />

      <pre>Selected value: {value}</pre>
    </ThemeProvider>
  );
};

export const Icons = () => {
  const options1: IconOptions = [
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
