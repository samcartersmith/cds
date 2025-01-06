import React, { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { useTabsContext } from '@cbhq/cds-common2/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common2/tabs/useTabs';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout';
import { TextLabel2 } from '../../typography';
import { SegmentedTab } from '../SegmentedTab';
import { type SegmentedTabsProps, SegmentedTabs } from '../SegmentedTabs';
import type { TabComponent, TabsActiveIndicatorProps } from '../Tabs';
import { TabsActiveIndicator } from '../Tabs';

const CustomActiveIndicator = ({
  activeTabRect,
}: Pick<TabsActiveIndicatorProps, 'activeTabRect'>) => (
  <TabsActiveIndicator activeTabRect={activeTabRect} background="backgroundOverlay" />
);

const CustomSegmentedTab: TabComponent = (props) => (
  <SegmentedTab {...props} activeColor="accentBoldPurple" color="textPrimary" />
);

const AnotherCustomSegmentedTab: TabComponent = ({ id, label, disabled }) => {
  const { activeTab, updateActiveTab, disabled: tabsDisabled } = useTabsContext();
  const isActive = activeTab?.id === id;

  const handlePress = useCallback(() => {
    updateActiveTab(id);
  }, [id, updateActiveTab]);

  return (
    <Pressable
      accessibilityRole="button"
      aria-pressed={isActive}
      disabled={disabled || tabsDisabled}
      onPress={handlePress}
    >
      <Box alignItems="center" paddingX={3} paddingY={1}>
        {typeof label === 'string' ? (
          <TextLabel2 color={isActive ? 'textPositive' : 'textNegative'} ellipsize="tail">
            {label}
          </TextLabel2>
        ) : (
          label
        )}
      </Box>
    </Pressable>
  );
};

const basicSegments = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

const longSegments = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
  { id: 'hello', label: 'Hello' },
  { id: 'world', label: 'World' },
  { id: 'something', label: 'Something' },
  { id: 'carrots', label: 'Carrots' },
  { id: 'bitcoin', label: 'Bitcoin' },
];

const basicSegmentsWithDisabled = [
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell', disabled: true },
  { id: 'convert', label: 'Convert' },
];

const customSegments = [
  { id: 'buy', label: 'Buy', Component: CustomSegmentedTab },
  { id: 'sell', label: 'Sell' },
  { id: 'convert', label: 'Convert' },
];

type SegmentedTabsExampleProps = {
  title: string;
  defaultActiveTab: TabValue | null;
} & Omit<SegmentedTabsProps, 'activeTab' | 'onChange'>;

const SegmentedTabsExample = ({ title, defaultActiveTab, ...props }: SegmentedTabsExampleProps) => {
  const [activeTab, updateActiveTab] = useState<TabValue | null>(defaultActiveTab);
  const handleChange = useCallback((activeTab: TabValue | null) => updateActiveTab(activeTab), []);

  return (
    <Example title={title}>
      <SegmentedTabs
        {...props}
        accessibilityLabel="Switch token action views"
        activeTab={activeTab}
        onChange={handleChange}
      />
    </Example>
  );
};

const SegmentedTabsScreen = () => (
  <ExampleScreen>
    <SegmentedTabsExample defaultActiveTab={basicSegments[0]} tabs={basicSegments} title="Basic" />
    <SegmentedTabsExample
      defaultActiveTab={basicSegments[0]}
      tabs={basicSegments.slice(0, 2)}
      title="Two Tabs"
    />
    <SegmentedTabsExample defaultActiveTab={longSegments[0]} tabs={longSegments} title="Long" />
    <SegmentedTabsExample
      defaultActiveTab={basicSegments[1]}
      tabs={basicSegments}
      title="Initial Value"
    />
    <SegmentedTabsExample defaultActiveTab={null} tabs={basicSegments} title="No Initial Value" />
    <SegmentedTabsExample
      disabled
      defaultActiveTab={basicSegments[0]}
      tabs={basicSegments}
      title="Disabled"
    />
    <SegmentedTabsExample
      defaultActiveTab={basicSegmentsWithDisabled[0]}
      tabs={basicSegmentsWithDisabled}
      title="Disabled Segment"
    />
    <SegmentedTabsExample
      defaultActiveTab={customSegments[0]}
      tabs={customSegments}
      title="Custom Single Segment"
    />
    <SegmentedTabsExample
      TabComponent={AnotherCustomSegmentedTab}
      TabsActiveIndicatorComponent={CustomActiveIndicator}
      borderRadius={0}
      defaultActiveTab={basicSegments[0]}
      tabs={basicSegments}
      title="Custom Single Segment"
    />
  </ExampleScreen>
);

export default SegmentedTabsScreen;
