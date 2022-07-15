import { memo, useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TabNavigation } from '@cbhq/cds-web/tabs';

import { a11yReport } from ':cds-website/data/a11yReport';
import { a11yReport as originalA11yReport } from ':cds-website/data/a11yReport_original';

import { A11yReportDetails, ReportDoc } from './A11yReportDetails';

type List = readonly { count: number }[];
const getCount = (list: List) => list.reduce((prev, { count = 0 }) => prev + Number(count), 0);
const reports = [
  {
    id: 'current',
    label: 'Today',
  },
  {
    id: 'original',
    label: 'March 24th, 2022',
  },
];
export const A11yReportOverview = memo(() => {
  const [report, setReport] = useState<string>('current');
  const isToday = useMemo(() => report === 'current', [report]);
  const reportDoc = useMemo(() => (isToday ? a11yReport : originalA11yReport), [isToday]);
  const tabs = useMemo(
    () =>
      [
        {
          id: 'all',
          label: 'Full report',
        },
        {
          id: 'critical',
          label: 'Critical issues',
          count: getCount(reportDoc.critical),
        },
        {
          id: 'serious',
          label: 'Serious issues',
          count: getCount(reportDoc.serious),
        },
        {
          id: 'moderate',
          label: 'Moderate issues',
          count: getCount(reportDoc.moderate),
        },
      ].filter((t) => t.id === 'all' || (t.count ?? 0) > 0),
    [reportDoc],
  );
  const [tab, setTab] = useState<string>(tabs[0].id);
  const getOnReportChangeHandler = useCallback(
    function getOnReportChangeHandler() {
      return function handleReportChange(tabId: string) {
        setReport(tabId);
        setTab(tabs[0].id);
      };
    },
    [tabs],
  );

  return (
    <ThemeProvider>
      <TabNavigation
        value={report}
        tabs={reports}
        onChange={getOnReportChangeHandler()}
        spacingBottom={3}
        variant="secondary"
      />
      <TabNavigation value={tab} tabs={tabs} onChange={setTab} spacingBottom={3} />
      {/* TODO fix this type */}
      <A11yReportDetails impact={tab} reportDoc={reportDoc as unknown as ReportDoc} />
    </ThemeProvider>
  );
});
