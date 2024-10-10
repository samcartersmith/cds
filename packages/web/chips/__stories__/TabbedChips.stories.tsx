/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { useState } from 'react';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common';
import { longTextTabs, sampleTabs } from '@cbhq/cds-common/internal/data/tabs';

import { VStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { TabbedChips } from '../TabbedChips';

export default {
  title: 'Core Components/Chips/TabbedChips',
  component: TabbedChips,
};

const defaultTabs = sampleTabs.slice(0, 5);

const Demo = ({
  tabs = defaultTabs,
  style,
}: {
  tabs?: TabProps[];
  style?: React.CSSProperties;
}) => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);
  return <TabbedChips onChange={setValue} paddleStyle={style} tabs={tabs} value={value} />;
};

export const Default = () => {
  return (
    <VStack gap={2}>
      <TextHeadline as="p">Default</TextHeadline>
      <Demo />
      <TextHeadline as="p">With paddles</TextHeadline>
      <Demo tabs={sampleTabs} />
      <TextHeadline as="p">With custom sized paddles</TextHeadline>
      <Demo style={{ transform: 'scale(0.5)' }} tabs={sampleTabs} />
      <TextHeadline as="p">With long text</TextHeadline>
      <Demo tabs={longTextTabs} />
      <Demo tabs={sampleTabs.map((tab, index) => ({ ...tab, disabled: index === 1 }))} />
    </VStack>
  );
};

const a11ySkipConfig = {
  config: {
    rules: [
      { id: 'aria-valid-attr-value', enabled: false },
      { id: 'duplicate-id-active', enabled: false },
      { id: 'duplicate-id', enabled: false },
      { id: 'duplicate-id-aria', enabled: false },
    ],
  },
};

Default.parameters = {
  percy: enableJavascript,
  a11y: a11ySkipConfig,
};
