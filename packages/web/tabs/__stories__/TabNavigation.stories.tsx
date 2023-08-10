import React, { useCallback, useMemo, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import sample from 'lodash/sample';
import { loremIpsum } from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { TabNavigationProps, TabProps } from '@cbhq/cds-common/types';

import { VStack } from '../../alpha/VStack';
import { Button } from '../../buttons/Button';
import { Select, SelectOption } from '../../controls';
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
    ],
  },
};

const longTabs: TabProps[] = [
  {
    id: 'first_primary_tab',
    label: 'Tab one',
    testID: 'customTestId',
  },
  {
    id: 'second_primary_tab',
    label: 'Tab two',
  },
  {
    id: 'third_primary_tab',
    label: 'Tab three',
  },
  {
    id: 'fourth_primary_tab',
    label: 'Tab four',
  },
  {
    id: 'fifth_primary_tab',
    label: 'Tab five',
  },
  {
    id: 'sixth_primary_tab',
    label: 'Tab six',
  },
  {
    id: 'seventh_primary_tab',
    label: 'Tab seven',
  },
  {
    id: 'eighth_primary_tab',
    label: 'Tab eight',
  },
  {
    id: 'ninth_primary_tab',
    label: 'Tab nine',
  },
  {
    id: 'tenth_primary_tab',
    label: 'Tab ten',
  },
];
const tabs = longTabs.slice(0, 5);

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export default {
  title: 'Core Components/Tabs/TabNavigation (deprecated - moved to cds-web-overlays)',
  component: TabNavigation,
} as Meta;

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const Default: Story = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="background">
          <TextHeadline as="p">Default (Normal)</TextHeadline>
          <TabNavigation value={value} tabs={tabs} onChange={setValue} />
        </VStack>
        <VStack spacing={2} gap={2} background="background">
          <TextHeadline as="p">Default (Dense)</TextHeadline>
          <ThemeProvider scale="xSmall">
            <TabNavigation value={value} tabs={tabs} onChange={setValue} />
          </ThemeProvider>
        </VStack>
        <VStack spacing={2} gap={2} background="backgroundAlternate">
          <TextHeadline as="p">Custom background</TextHeadline>
          <TabNavigation
            background="backgroundAlternate"
            value={value}
            tabs={tabs}
            onChange={setValue}
          />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TextHeadline as="p">Dark</TextHeadline>
          <TabNavigation value={value} tabs={tabs} onChange={setValue} />
        </VStack>
      </ThemeProvider>
    </>
  );
};
Default.parameters = {
  percy: enableJavascript,
  a11y: a11ySkipConfig,
};

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const WithPaddles: Story = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(tabs[0].id);

  return <TabNavigation value={value} tabs={longTabs} onChange={setValue} />;
};
WithPaddles.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
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
        <VStack spacing={2} gap={2} background="background">
          <Select value={value} onChange={setValue} label="Select a tab">
            {tabsWithDot.map((option) => (
              <SelectOption value={option.id} title={option.label} key={option.id} />
            ))}
          </Select>
          <Button onPress={updateCount}>Randomize dot count</Button>
          <TextHeadline as="p">Default (Normal)</TextHeadline>
          <TabNavigation value={value} tabs={tabsWithDot} onChange={setValue} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="light" scale="xSmall">
        <VStack spacing={2} gap={2} background="background">
          <TextHeadline as="p">Default (Dense)</TextHeadline>
          <TabNavigation value={value} tabs={tabsWithDot} onChange={setValue} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TextHeadline as="p">Dark</TextHeadline>
          <TabNavigation value={value} tabs={tabsWithDot} onChange={setValue} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="backgroundAlternate">
          <TextHeadline as="p">Custom background</TextHeadline>
          <TabNavigation
            background="backgroundAlternate"
            value={value}
            tabs={tabsWithDot}
            onChange={setValue}
          />
        </VStack>
      </ThemeProvider>
    </>
  );
};
WithDotCountChange.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const Secondary: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabNavigationProps['value']>();

  return (
    <>
      <ThemeProvider spectrum="light">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            value={currentTab}
            tabs={tabs}
            variant="secondary"
            onChange={setCurrentTab}
          />
        </VStack>
        <ThemeProvider spectrum="light" scale="xSmall">
          <VStack spacing={2} gap={2} background="background">
            <TabNavigation
              tabs={tabs}
              variant="secondary"
              value={currentTab}
              onChange={setCurrentTab}
            />
          </VStack>
        </ThemeProvider>
      </ThemeProvider>
      <ThemeProvider spectrum="dark">
        <VStack spacing={2} gap={2} background="background">
          <TabNavigation
            value={currentTab}
            tabs={tabs}
            variant="secondary"
            onChange={setCurrentTab}
          />
        </VStack>
        <ThemeProvider spectrum="light" scale="xSmall">
          <VStack spacing={2} gap={2} background="background">
            <TabNavigation
              tabs={tabs}
              variant="secondary"
              value={currentTab}
              onChange={setCurrentTab}
            />
          </VStack>
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};
Secondary.parameters = { percy: enableJavascript, a11y: a11ySkipConfig };

/**
 * @deprecated this component will be removed from cds-web Q22023. It has been moved to cds-web-overlays.
 */
export const AccessibilityTest: Story = () => {
  const [currentTab, setCurrentTab] = useState<TabNavigationProps['value']>(tabs[0].id);

  return (
    <VStack gap={2}>
      <TabNavigation
        accessibilityLabel="Really nice tab navigation"
        value={currentTab}
        tabs={tabs.slice(0, 3)}
        onChange={setCurrentTab}
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
