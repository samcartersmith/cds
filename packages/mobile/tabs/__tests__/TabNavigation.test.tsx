import { useState } from 'react';
import { render, screen } from '@testing-library/react-native';

import { TabNavigation } from '../TabNavigation';

const tabs = [
  {
    id: 'first-test',
    label: 'First label',
  },
  {
    id: 'second-test',
    label: 'second label',
    testID: 'specialTestID',
  },
];

const MockTabNavigation = ({ testID }: { testID: string }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return <TabNavigation testID={testID} value={activeTab} tabs={tabs} onChange={setActiveTab} />;
};
describe('TabNavigation', () => {
  const TEST_ID = 'mainTabNav';

  it('passes a11y', () => {
    render(<MockTabNavigation testID={TEST_ID} />);
    expect(screen.getByTestId(TEST_ID)).toBeAccessible();
  });

  it('Properly inherits testID from TabNavigation', () => {
    render(<MockTabNavigation testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).not.toBeNull();
    expect(screen.getByTestId(`${TEST_ID}-tabLabel--first-test`)).not.toBeNull();
  });

  it("Properly applies custom testID's", () => {
    render(<MockTabNavigation testID={TEST_ID} />);

    expect(screen.getByTestId(TEST_ID)).not.toBeNull();
    expect(screen.getByTestId('specialTestID')).not.toBeNull();
  });
});
