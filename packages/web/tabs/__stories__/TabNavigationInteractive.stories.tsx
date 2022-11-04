import { useState } from 'react';
import { expect } from '@storybook/jest';
import { ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { TabNavigation } from '../TabNavigation';

const TEST_ID = 'cds-tab-navigation';
const tabs = [
  {
    id: 'first-test',
    label: 'First label',
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
  return <TabNavigation testID={TEST_ID} value={activeTab} tabs={tabs} onChange={setActiveTab} />;
};

export default {
  title: 'Interactive/TabNavigation',
  component: MockTabNavigation,
};

export const Story: ComponentStoryObj<typeof MockTabNavigation> = {
  args: {},
  parameters: {
    percy: {
      waitForTimeout: 500,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(canvas.getByTestId('eleventh')).toHaveFocus();
  },
};
