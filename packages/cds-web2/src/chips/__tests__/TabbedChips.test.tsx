import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { sampleTabs } from '@cbhq/cds-common2/internal/data/tabs';
import type { TabNavigationProps } from '@cbhq/cds-common2/types';

import { DefaultThemeProvider } from '../../utils/test';
import { TabbedChips } from '../TabbedChips';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      observe: jest.fn(),
    };
  }),
}));

const testID = 'tabbedChip';

const Demo = () => {
  const [value, setValue] = useState<TabNavigationProps['value']>(sampleTabs[0].id);
  return (
    <DefaultThemeProvider>
      <TabbedChips onChange={setValue} tabs={sampleTabs} testID={testID} value={value} />
    </DefaultThemeProvider>
  );
};

describe('TabbedChips', () => {
  it('renders a custom tab label with injected testID', () => {
    render(<Demo />);
    expect(screen.getByTestId(sampleTabs[5].id)).toBeDefined();
  });
});
