import { useState } from 'react';
import { render } from '@testing-library/react';

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

  const observe = jest.fn();
  const disconnect = jest.fn();
  const mockResizeObserver = jest.fn(() => ({
    observe: () => {
      observe();
    },
    unobserve: () => {},
    disconnect,
  }));
  const mockResizeObserverEntry = jest.fn();

  /*
    When using the delete operator in strictNullChecks, the operand must now be any, unknown, never, or be optional
    (in that it contains undefined in the type). Otherwise, use of the delete operator is an error.
  */
  const deleteResizeObserver = () => {
    // @ts-expect-error See comment above
    delete global.ResizeObserver;
  };

  const deleteResizeObserverEntry = () => {
    // @ts-expect-error See comment above
    delete global.ResizeObserverEntry;
  };

  beforeAll(() => {
    global.ResizeObserver = mockResizeObserver;
    global.ResizeObserverEntry = mockResizeObserverEntry;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    deleteResizeObserver();
    deleteResizeObserverEntry();
  });

  it('Properly inherits testID from TabNavigation', () => {
    const { getByTestId } = render(<MockTabNavigation testID={TEST_ID} />);

    expect(getByTestId(TEST_ID)).toBeVisible();
    expect(getByTestId(`${TEST_ID}-tabLabel--first-test`)).toBeVisible();
  });

  it("Properly applies custom testID's", () => {
    const { getByTestId } = render(<MockTabNavigation testID={TEST_ID} />);

    expect(getByTestId(TEST_ID)).toBeVisible();
    expect(getByTestId('specialTestID')).toBeVisible();
  });
});
