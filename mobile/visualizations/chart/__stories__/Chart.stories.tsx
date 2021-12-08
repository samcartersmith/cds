import React from 'react';
import { Example, ExampleScreen } from '../../../examples/ExampleScreen';
import { AssetPriceChart } from './AssetPriceChart';

const ChartScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default" spacing={0}>
        <AssetPriceChart />
      </Example>
    </ExampleScreen>
  );
};

export default ChartScreen;
