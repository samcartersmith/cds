import { memo, useState } from 'react';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TabNavigation } from '@cbhq/cds-web/tabs';

import { a11yReport } from ':cds-website/data/a11yReport';

import { A11yReportDetails } from './A11yReportDetails';

type List = readonly { count: number }[];
const getCount = (list: List) => list.reduce((prev, { count = 0 }) => prev + Number(count), 0);
const tabs = [
  {
    id: 'all',
    label: 'Full report',
  },
  {
    id: 'critical',
    label: 'Critical issues',
    count: getCount(a11yReport.critical),
  },
  {
    id: 'serious',
    label: 'Serious issues',
    count: getCount(a11yReport.serious),
  },
  {
    id: 'moderate',
    label: 'Moderate issues',
    count: getCount(a11yReport.moderate),
  },
].filter((tab) => tab.id === 'all' || (tab.count ?? 0) > 0);

export const A11yReportOverview = memo(() => {
  const [value, setValue] = useState<string>(tabs[0].id);
  return (
    <ThemeProvider>
      <TabNavigation value={value} tabs={tabs} onChange={setValue} spacingBottom={3} />
      <A11yReportDetails impact={value} />
    </ThemeProvider>
  );
});
