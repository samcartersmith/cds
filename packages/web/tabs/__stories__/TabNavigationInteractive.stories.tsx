import { useState } from 'react';
import { expect } from '@storybook/jest';
import { ComponentStoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';

import { VStack } from '../../layout';
import { TextTitle1 } from '../../typography';
import { pauseStory } from '../../utils/storybook';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { TabNavigation, tabNavigationStaticClassName } from '../TabNavigation';

const WAIT = 200;
const TEST_IDS = {
  paddle: {
    left: `${tabNavigationStaticClassName}--paddle-left`,
    right: `${tabNavigationStaticClassName}--paddle-right`,
  },
  tabNavigation: tabNavigationStaticClassName,
};

const tabs = [
  {
    id: 'first-test',
    label: 'First label',
    testID: 'first',
  },
  {
    id: 'second-test',
    label: 'second label',
    testID: 'second',
  },
  {
    id: 'third-test',
    label: 'third label',
  },
  {
    id: 'fourth-test',
    label: 'fourth label',
  },
  {
    id: 'fifth-test',
    label: 'fifth label',
  },
  {
    id: 'sixth-test',
    label: 'sixth label',
  },
  {
    id: 'seventh-test',
    label: 'seventh label',
    testID: 'seventh',
  },
  {
    id: 'eighth-test',
    label: 'eighth label',
  },
  {
    id: 'ninth-test',
    label: 'ninth label',
  },
  {
    id: 'tenth-test',
    label: 'tenth label',
    testID: 'tenth',
  },
  {
    id: 'eleventh-test',
    label: 'eleventh label',
    testID: 'eleventh',
  },
];

const MockTabNavigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <VStack gap={2}>
      <TabNavigation
        onChange={setActiveTab}
        tabs={tabs}
        testID={TEST_IDS.tabNavigation}
        value={activeTab}
      />
      <VStack
        bordered
        accessibilityLabelledBy={`tab--${activeTab}`}
        background="primaryWash"
        borderRadius="rounded"
        id={`tabpanel--${activeTab}`}
        role="tabpanel"
        spacing={2}
      >
        <TextTitle1 as="h2">This is tab {activeTab}</TextTitle1>
      </VStack>
    </VStack>
  );
};

export default {
  title: 'Interactive/TabNavigation',
  component: MockTabNavigation,
};
export const Story: ComponentStoryObj<typeof MockTabNavigation> = {
  args: {},
  parameters: {
    percy: { waitForTimeout: tabs.length * WAIT, enableJavascript },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const firstTab = canvas.getByText(tabs[0].label).closest('button');
    const lastTab = canvas.getByText(tabs[tabs.length - 1].label).closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    expect(firstTab).toHaveFocus();

    for (const { label } of tabs) {
      const tabButton = canvas.getByText(label).closest('button') ?? canvas.getByText(label);
      if (tabButton !== lastTab) {
        // Tab again and expect the paddle to be in focus
        fireEvent.keyDown(tabButton, { key: 'ArrowRight' });
      }
      // eslint-disable-next-line no-await-in-loop
      await pauseStory(WAIT);
    }
  },
};
