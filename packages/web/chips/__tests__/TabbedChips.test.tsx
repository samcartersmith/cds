import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { TabNavigationProps } from '@cbhq/cds-common';
import { sampleTabs } from '@cbhq/cds-common/internal/data/tabs';

import { TabbedChips } from '../TabbedChips';

const testID = 'tabbedChip';

const Demo = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(sampleTabs[0].id);
  return <TabbedChips onChange={setValue} tabs={sampleTabs} testID={testID} value={value} />;
};

describe('TabbedChips', () => {
  it('renders a custom tab label with injected testID', () => {
    render(<Demo />);
    expect(screen.getByTestId(sampleTabs[5].id)).toBeDefined();
  });
});
