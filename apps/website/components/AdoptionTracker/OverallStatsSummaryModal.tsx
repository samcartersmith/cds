import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { TextTitle4 } from '@cbhq/cds-web/typography';

import { type PillarAdoptionData, type PillarProjectData } from './types';

type OverallStatsSummaryModalProps = {
  totalProjectVersionsList: PillarProjectData[];
  pillarCDSAdoptionList: PillarAdoptionData[];
  companyWideAdoptionPercentage: string;
  companyWideAdoptionPercentageUpToDate: string;
  statForLatestCdsVersionPublished3MonthsAgo: string;
};

const excludedPillars = ['Other'];

/**
 * Calculates the percentage of projects that are up-to-date with the latest CDS guidance.
 * It can calculate this percentage either for a specific pillar or across all pillars.
 *
 * @param totalProjectVersionsList - An array of objects, each representing a pillar with its associated project versions.
 * @param pillar - Optional string parameter to specify a pillar for which to calculate the percentage. If omitted, calculates for all pillars.
 * @returns The percentage of projects that are up-to-date, either within the specified pillar or across all pillars.
 */
export function getPercentProductsWithinCDS({
  totalProjectVersionsList,
  pillar,
  excludedPillars,
}: {
  totalProjectVersionsList: PillarProjectData[];
  pillar?: string;
  excludedPillars?: string[];
}) {
  const percentPGProjectsUpToDate = totalProjectVersionsList
    .filter((project) => !(excludedPillars && excludedPillars.includes(project.pillar)))
    .reduce(
      (count, entry) =>
        count +
        entry.allProjectVersions.filter(
          (projectEntry) => (!pillar || projectEntry.pillar === pillar) && projectEntry.upToDate,
        ).length,
      0,
    );

  const percentPGProjectsAll = totalProjectVersionsList
    .filter(
      (project) =>
        // Exclude the projects that belong to the excluded pillars, if any are specified
        !(excludedPillars && excludedPillars.includes(project.pillar)),
    )
    .reduce(
      (count, entry) =>
        count +
        entry.allProjectVersions.filter((projectEntry) => !pillar || projectEntry.pillar === pillar)
          .length,
      0,
    );

  // Check to prevent division by zero when calculating percentage
  if (percentPGProjectsAll === 0) return 0;
  return (percentPGProjectsUpToDate / percentPGProjectsAll) * 100;
}

const cellSpacing = {
  inner: { spacingHorizontal: 3 },
} as const;

export function OverallStatsSummaryModal({
  totalProjectVersionsList,
  pillarCDSAdoptionList,
  companyWideAdoptionPercentage,
  statForLatestCdsVersionPublished3MonthsAgo,
}: OverallStatsSummaryModalProps) {
  return (
    <>
      <TextTitle4 as="sub">Overall Adoption Stats</TextTitle4>

      <Table cellSpacing={cellSpacing} variant="ruled">
        <TableHeader>
          <TableRow>
            <TableCell title="PG" />
            <TableCell title="% CDS Adoption" />
            <TableCell
              title={`% Products within Latest CDS (${statForLatestCdsVersionPublished3MonthsAgo} or higher)`}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Company Wide</TableCell>
            <TableCell>{companyWideAdoptionPercentage}</TableCell>
            <TableCell>
              {getPercentProductsWithinCDS({ totalProjectVersionsList, excludedPillars }).toFixed(
                2,
              )}
              %
            </TableCell>
          </TableRow>

          {pillarCDSAdoptionList
            .filter((entry) => entry.pillar !== 'Other')
            .map((entry) => (
              <TableRow>
                <TableCell>{entry.pillar}</TableCell>
                <TableCell>{entry.cdsPercentAdoption}</TableCell>
                <TableCell>
                  {`${getPercentProductsWithinCDS({
                    totalProjectVersionsList,
                    pillar: entry.pillar,
                    excludedPillars,
                  }).toFixed(2)}%`}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
