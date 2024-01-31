import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { TextTitle4 } from '@cbhq/cds-web/typography';

import { COMPANY_WIDE_ADOPTION } from './constants';
import { type OverallSummaryStats } from './types';

type OverallStatsSummaryModalProps = {
  latestOverallStatsSummary: OverallSummaryStats;
  statForLatestCdsVersionPublished3MonthsAgo: string;
};

const cellSpacing = {
  inner: { spacingHorizontal: 3 },
} as const;

export function OverallStatsSummaryModal({
  latestOverallStatsSummary,
}: OverallStatsSummaryModalProps) {
  const { summaryReport } = latestOverallStatsSummary;
  const {
    companyWide: { cdsAdoption, latestCDSAdoption },
  } = summaryReport;
  return (
    <>
      <TextTitle4 as="sub">Overall Adoption Stats</TextTitle4>

      <Table cellSpacing={cellSpacing} variant="ruled">
        <TableHeader>
          <TableRow>
            <TableCell title="PG" />
            <TableCell title="% CDS Adoption" />
            <TableCell title="% Products Using Latest CDS" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Company Wide</TableCell>
            <TableCell>{cdsAdoption}</TableCell>
            <TableCell>{latestCDSAdoption} %</TableCell>
          </TableRow>

          {Object.keys(summaryReport)
            .filter((key) => key !== COMPANY_WIDE_ADOPTION)
            .map((entry) => (
              <TableRow key={entry}>
                <TableCell>{entry}</TableCell>
                <TableCell>{summaryReport[entry]?.cdsAdoption || ''}</TableCell>
                <TableCell>{summaryReport[entry]?.latestCDSAdoption || ''}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
