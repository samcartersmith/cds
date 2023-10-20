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

      <SegmentedControl disabled options={options3} />
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
      <SegmentedControl onChange={setValue} options={options} value={value} />

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
        iconSize="xs"
        onChange={setValue}
        options={options1}
        type="icon"
        value={value}
      />

      <pre>s</pre>
      <SegmentedControl
        iconSize="s"
        onChange={setValue}
        options={options1}
        type="icon"
        value={value}
      />

      <pre>m</pre>
      <SegmentedControl
        iconSize="m"
        onChange={setValue}
        options={options1}
        type="icon"
        value={value}
      />

      <pre>l</pre>
      <SegmentedControl
        iconSize="l"
        onChange={setValue}
        options={options1}
        type="icon"
        value={value}
      />
    </VStack>
  );
};
