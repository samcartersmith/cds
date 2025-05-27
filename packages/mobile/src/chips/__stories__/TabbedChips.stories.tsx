import React, { useState } from 'react';
import { longTextTabs, sampleTabs } from '@cbhq/cds-common/internal/data/tabs';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import type { TabProps } from '../../tabs/TabNavigation';
import { TabbedChips, type TabbedChipsBaseProps } from '../TabbedChips';

const defaultTabs = sampleTabs.slice(0, 5);

const Demo = ({ tabs = defaultTabs }: { tabs?: TabProps[] }) => {
  const [value, setValue] = useState<TabbedChipsBaseProps['value']>(tabs[0].id);
  return <TabbedChips onChange={setValue} tabs={tabs} value={value} />;
};

const TabbedChipsScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <Demo />
      </Example>
      <Example title="Lots of tabs">
        <Demo tabs={sampleTabs} />
      </Example>
      <Example title="Long text tabs">
        <Demo tabs={longTextTabs} />
      </Example>
      <Example title="Disabled tab">
        <Demo tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))} />
      </Example>
    </ExampleScreen>
  );
};

export default TabbedChipsScreen;
