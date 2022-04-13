import { memo, useState } from 'react';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TabNavigation } from '@cbhq/cds-web/tabs';

import { a11yReport } from ':cds-website/data/a11yReport';

import { A11yReportDetails } from './A11yReportDetails';

const tabs = [
  {
    id: 'all',
    label: 'Full report',
  },
  {
    id: 'critical',
    label: 'Critical issues',
    count: a11yReport.report.filter((report) =>
      report.violations.some(({ impact }) => impact === 'critical'),
    ).length,
  },
  {
    id: 'serious',
    label: 'Serious issues',
    count: a11yReport.report.filter((report) =>
      report.violations.some(({ impact }) => impact === 'serious'),
    ).length,
  },
  {
    id: 'moderate',
    label: 'Moderate issues',
    count: a11yReport.report.filter((report) =>
      report.violations.some(({ impact }) => impact === 'moderate'),
    ).length,
  },
];
export const A11yReportOverview = memo(() => {
  const [value, setValue] = useState<string>(tabs[0].id);

  return (
    <ThemeProvider>
      <TabNavigation value={value} tabs={tabs} onChange={setValue} spacingBottom={3} />
      <A11yReportDetails impact={value} />
    </ThemeProvider>
  );
});
