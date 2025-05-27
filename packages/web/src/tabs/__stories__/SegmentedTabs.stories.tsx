import React, { useCallback, useState } from 'react';
import { css } from '@linaria/core';
import { useTabsContext } from '@cbhq/cds-common/tabs/TabsContext';
import { TabValue } from '@cbhq/cds-common/tabs/useTabs';

import { VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { SegmentedTab } from '../SegmentedTab';
import { SegmentedTabs, type SegmentedTabsProps } from '../SegmentedTabs';
import type { TabComponent, TabsActiveIndicatorProps } from '../Tabs';
import { TabsActiveIndicator } from '../Tabs';

export default {
  title: 'Core Components/Tabs/Segmented Tabs',
  component: SegmentedTabs,
};

const CustomActiveIndicator = ({
  activeTabRect,
}: Pick<TabsActiveIndicatorProps, 'activeTabRect'>) => (
  <TabsActiveIndicator activeTabRect={activeTabRect} background="bgOverlay" />
);

const CustomSegmentedTab: TabComponent = (props) => (
  <SegmentedTab {...props} activeColor="fgWarning" color="bgPrimary" />
);

const buttonStyle = css`
  border-radius: 0;
`;

const AnotherCustomSegmentedTab: TabComponent = ({ id, label, disabled }) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  const renderedLabel = (
    <Text color={isActive ? 'fgPositive' : 'fgNegative'} font="label2" overflow="truncate">
      {label}
    </Text>
  );

  return <SegmentedTab className={buttonStyle} disabled={disabled} id={id} label={renderedLabel} />;
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
    <VStack gap={2}>
      <Text as="h2" display="block" font="title4">
        {title}
      </Text>
      <SegmentedTabs
        {...props}
        accessibilityLabel="Switch token action views"
        activeTab={activeTab}
        onChange={handleChange}
      />
    </VStack>
  );
};

export const All = () => {
  return (
    <VStack gap={2}>
      <SegmentedTabsExample
        defaultActiveTab={basicSegments[0]}
        tabs={basicSegments}
        title="Basic"
      />
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
        title="Custom Segment & Active Indicator"
      />
    </VStack>
  );
};

const disableA11yCheck = {
  a11y: {
    config: {
      /**
       * Disabled Color contrast ratio rule since the activated tab has an animated indicator which didn't catch by the a11y runner
       * @link https://dequeuniversity.com/rules/axe/4.6/color-contrast?application=axeAPI
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

All.parameters = disableA11yCheck;
