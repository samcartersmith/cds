import React, { useState } from 'react';
import { longTextTabs, sampleTabs } from '@cbhq/cds-common2/internal/data/tabs';
import type { TabNavigationProps, TabProps } from '@cbhq/cds-common2/types';

import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
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
      <Text as="p" font="headline">
        Default
      </Text>
      <Demo />
      <Text as="p" font="headline">
        With paddles
      </Text>
      <Demo tabs={sampleTabs} />
      <Text as="p" font="headline">
        With custom sized paddles
      </Text>
      <Demo style={{ transform: 'scale(0.5)' }} tabs={sampleTabs} />
      <Text as="p" font="headline">
        With long text
      </Text>
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
  percy: { enableJavaScript: true },
  a11y: a11ySkipConfig,
};
