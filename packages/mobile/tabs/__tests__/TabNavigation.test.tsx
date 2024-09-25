import { useState } from 'react';
import { render, screen } from '@testing-library/react-native';
import { sampleTabs as tabs } from '@cbhq/cds-common/internal/data/tabs';
import { type CustomTabProps, type TabProps } from '@cbhq/cds-common/types/TabsProps';

import { HStack } from '../../layout';
import { TextHeadline } from '../../typography';
import { TabNavigation } from '../TabNavigation';

const sampleTabs = tabs.slice(0, 4);

const MockTabNavigation = ({
  testID,
  tabs = sampleTabs,
}: {
  testID: string;
  tabs?: TabProps[];
}) => {
  const [activeTab, setActiveTab] = useState(sampleTabs[0].id);
  return <TabNavigation onChange={setActiveTab} tabs={tabs} testID={testID} value={activeTab} />;
};

const customTestID = 'custom-test-id';

const renderCustomTab = ({ label, id, ...props }: CustomTabProps) => (
  <HStack testID={`${customTestID}-${id}`} {...props}>
    <TextHeadline>{label}</TextHeadline>
  </HStack>
);

const MockTabNavigationWithCustomTabs = ({ testID }: { testID: string }) => {
  const [activeTab, setActiveTab] = useState(sampleTabs[0].id);
  return (
    <TabNavigation
      Component={renderCustomTab}
      onChange={setActiveTab}
      tabs={sampleTabs}
      testID={testID}
      value={activeTab}
    />
  );
};

const TEST_ID = 'mainTabNav';

describe('TabNavigation', () => {
  it('passes a11y', () => {
    render(<MockTabNavigation testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('Properly inherits testID from TabNavigation', () => {
    render(<MockTabNavigation testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
  });

  it("Properly applies custom testID's", () => {
    render(<MockTabNavigationWithCustomTabs testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(`${customTestID}-${sampleTabs[0].id}`)).toBeVisible();
  });

  it('should allow tabs to be disabled', () => {
    render(
      <MockTabNavigation
        tabs={sampleTabs.map((tab) => ({ ...tab, disabled: true }))}
        testID={TEST_ID}
      />,
    );

    expect(screen.getByTestId(TEST_ID)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeVisible();
    expect(screen.getByTestId(sampleTabs[0].testID as string)).toBeDisabled();
  });
});
