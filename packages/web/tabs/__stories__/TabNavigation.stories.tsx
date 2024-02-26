import React, { useCallback, useMemo, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import sample from 'lodash/sample';
import { sampleTabs } from '@cbhq/cds-common/internal/data/tabs';
import { loremIpsum } from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { CustomTabProps, TabNavigationProps } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { Chip } from '../../chips/Chip';
import { Select, SelectOption } from '../../controls';
import { HStack } from '../../layout';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system';
import { Link, TextBody, TextHeadline, TextTitle1 } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { TabNavigation } from '../TabNavigation';

import { MockTabPanel } from './MockTabPanel';

const a11ySkipConfig = {
  config: {
    /**
     * The TabNavigation docs explain the proper way to setup the tabpanel.
     * Disabled because CDS TabNavigation doesn't have associated panels.
     * @link https://cds.cbhq.net/components/tab-navigation#accessibility
     * */
    rules: [
      { id: 'aria-valid-attr-value', enabled: false },
      { id: 'duplicate-id-active', enabled: false },
      { id: 'duplicate-id', enabled: false },
    ],
  },
};

const tabs = sampleTabs.slice(0, 5);

export default {
  title: 'Core Components/Tabs/TabNavigation',
  component: TabNavigation,
} as Meta;

export const Default: Story = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack background="background" gap={2} spacing={2}>
          <TextHeadline as="p">Default (Normal)</TextHeadline>
          <TabNavigation onChange={setValue} tabs={tabs} value={value} />
        </VStack>
        <VStack background="background" gap={2} spacing={2}>
          <TextHeadline as="p">Default (Dense)</TextHeadline>
          <ThemeProvider scale="xSmall">
            <TabNavigation onChange={setValue} tabs={tabs} value={value} />
          </ThemeProvider>
        </VStack>
        <VStack background="backgroundAlternate" gap={2} spacing={2}>
          <TextHeadline as="p">Custom background</TextHeadline>
          <TabNavigation
            background="backgroundAlternate"
            onChange={setValue}
            tabs={tabs}
            value={value}
          />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack background="background" gap={2} spacing={2}>
          <TextHeadline as="p">Dark</TextHeadline>
          <TabNavigation onChange={setValue} tabs={tabs} value={value} />
        </VStack>
      </ThemeProvider>
    </>
  );
};
Default.parameters = {
  percy: enableJavascript,
  a11y: a11ySkipConfig,
};

const renderCustomTab = ({ label, ...props }: CustomTabProps) => (
  <HStack
    bordered
    background="background"
    borderRadius="roundedSmall"
    spacingHorizontal={2}
    spacingVertical={1}
    {...props}
  >
    <TextHeadline as="p">{label}</TextHeadline>
  </HStack>
);

const renderAnotherCustomTab = ({ label, ...props }: CustomTabProps) => (
  <Chip {...props}>{label}</Chip>
);

const someCustomTabs = [
  ...tabs.slice(0, 3),
  {
    id: 'custom_tab',
    label: 'Custom',
    testID: 'custom_tab',
    Component: renderCustomTab,
  },
];

export const CustomTab: Story = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <VStack gap={2}>
      <TextHeadline as="p">Custom tab</TextHeadline>
      <TabNavigation
        Component={renderCustomTab}
        gap={1}
        onChange={setValue}
        tabs={tabs}
        value={value}
      />
      <TextHeadline as="p">Custom tab with paddles</TextHeadline>
      <TabNavigation
        Component={renderCustomTab}
        gap={1}
        onChange={setValue}
        tabs={sampleTabs}
        value={value}
      />
      <TextHeadline as="p">Only one custom tab</TextHeadline>
      <TabNavigation gap={1} onChange={setValue} tabs={someCustomTabs} value={value} />
      <TextHeadline as="p">All the custom things</TextHeadline>
      <TabNavigation
        Component={renderAnotherCustomTab}
        gap={1}
        onChange={setValue}
        tabs={someCustomTabs}
        value={value}
      />
    </VStack>
  );
};

CustomTab.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

export const WithPaddles: Story = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);

  return <TabNavigation onChange={setValue} tabs={sampleTabs} value={value} />;
};
WithPaddles.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

export const WithDotCountChange: Story = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);
  const [count, setCount] = useState(0);
  // This is just a helper to make a random tab show a count
  const tabsWithDot = useMemo(() => tabs.map((tab) => ({ ...tab, count })), [count]);

  const updateCount = useCallback(() => {
    setCount(Number(count ? 0 : sample([2, 14, 100])));
  }, [count]);

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack background="background" gap={2} spacing={2}>
          <Select label="Select a tab" onChange={setValue} value={value}>
            {tabsWithDot.map((option) => (
              <SelectOption key={option.id} title={option.label} value={option.id} />
            ))}
          </Select>
          <Button onPress={updateCount}>Randomize dot count</Button>
          <TextHeadline as="p">Default (Normal)</TextHeadline>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider scale="xSmall" spectrum="light">
        <VStack background="background" gap={2} spacing={2}>
          <TextHeadline as="p">Default (Dense)</TextHeadline>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack background="background" gap={2} spacing={2}>
          <TextHeadline as="p">Dark</TextHeadline>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="light">
        <VStack background="backgroundAlternate" gap={2} spacing={2}>
          <TextHeadline as="p">Custom background</TextHeadline>
          <TabNavigation
            background="backgroundAlternate"
            onChange={setValue}
            tabs={tabsWithDot}
            value={value}
          />
        </VStack>
      </ThemeProvider>
    </>
  );
};
WithDotCountChange.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

export const Secondary: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabNavigationProps['value']>();

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack background="background" gap={2} spacing={2}>
          <TabNavigation
            onChange={setCurrentTab}
            tabs={tabs}
            value={currentTab}
            variant="secondary"
          />
        </VStack>
        <ThemeProvider scale="xSmall" spectrum="light">
          <VStack background="background" gap={2} spacing={2}>
            <TabNavigation
              onChange={setCurrentTab}
              tabs={tabs}
              value={currentTab}
              variant="secondary"
            />
          </VStack>
        </ThemeProvider>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack background="background" gap={2} spacing={2}>
          <TabNavigation
            onChange={setCurrentTab}
            tabs={tabs}
            value={currentTab}
            variant="secondary"
          />
        </VStack>
        <ThemeProvider scale="xSmall" spectrum="light">
          <VStack background="background" gap={2} spacing={2}>
            <TabNavigation
              onChange={setCurrentTab}
              tabs={tabs}
              value={currentTab}
              variant="secondary"
            />
          </VStack>
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};
Secondary.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

export const AccessibilityTest: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <VStack gap={2}>
      <TabNavigation
        accessibilityLabel="Really nice tab navigation"
        onChange={setCurrentTab}
        tabs={tabs.slice(0, 3)}
        value={currentTab}
      />
      <MockTabPanel id={tabs[0].id} isActive={currentTab === tabs[0].id}>
        <TextTitle1 as="h2" spacingBottom={2}>
          This is tab one
        </TextTitle1>
        <TextBody as="p">
          <Link to="/">This is the body</Link> of tab one. You are going to love it
        </TextBody>
        <TextBody as="p">{loremIpsum}</TextBody>
      </MockTabPanel>
      <MockTabPanel id={tabs[1].id} isActive={currentTab === tabs[1].id}>
        <TextTitle1 as="h2" spacingBottom={2}>
          Here we have tab two
        </TextTitle1>
        <TextBody as="p">
          And look, <Link to="/">this another link</Link> in the body of tab one. You are going to
          love it
        </TextBody>
        <TextBody as="p">
          {loremIpsum} {loremIpsum}
        </TextBody>
      </MockTabPanel>
      <MockTabPanel id={tabs[2].id} isActive={currentTab === tabs[2].id}>
        <TextTitle1 as="h2" spacingBottom={2}>
          Heyooo, tab three!
        </TextTitle1>
        <TextBody as="p">
          Again, we can put a link like <Link to="/">this another link</Link> in the body of tab
          one. You are going to love it
        </TextBody>
        <TextBody as="p">
          {loremIpsum} {loremIpsum}
        </TextBody>
      </MockTabPanel>
    </VStack>
  );
};
