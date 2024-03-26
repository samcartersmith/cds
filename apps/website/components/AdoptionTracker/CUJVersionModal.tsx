import { useState } from 'react';
import { Select, SelectOption } from '@cbhq/cds-web/controls';
import { HStack } from '@cbhq/cds-web/layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { TextBody, TextTitle4 } from '@cbhq/cds-web/typography';

import { cujSummary } from '../../data/__generated__/adoption/cujSummary';

import { getLowestVersion } from './AdopterVersionCell';
import { getSummaryCUJStats } from './CUJUtils';

const filterOptions = ['All', 'Up to Date', 'Outdated'];

export function CUJVersionModal() {
  const [selectFilter, setSelectFilter] = useState('All');

  // Filter within the mapping by conditionally returning the row
  const filteredRows = cujSummary.map((cujConfig: { id: string; label: string }) => {
    const { latest } = getSummaryCUJStats({ id: cujConfig.id });
    const { lowestVersion } = getLowestVersion(
      latest.cdsCommonVersion,
      latest.cdsWebVersion,
      latest.cdsMobileVersion,
    );

    const isUpToDate = latest.upToDate;
    let shouldRender = false;
    switch (selectFilter) {
      case 'All':
        shouldRender = true;
        break;
      case 'Up to Date':
        shouldRender = isUpToDate;
        break;
      case 'Outdated':
        shouldRender = !isUpToDate;
        break;
      default:
        shouldRender = true;
        break;
    }

    // Only return the row if it matches the filter criteria
    if (shouldRender) {
      return (
        <TableRow key={cujConfig.id}>
          <TableCell>{cujConfig.label}</TableCell>
          <TableCell>
            <TextBody tabularNumbers as="span">
              {lowestVersion}
            </TextBody>
          </TableCell>
          <TableCell>
            <TextBody tabularNumbers as="span">
              {isUpToDate ? (
                <Tag colorScheme="blue" intent="informational">
                  Up to Date
                </Tag>
              ) : (
                <Tag colorScheme="red" intent="informational">
                  Outdated
                </Tag>
              )}
            </TextBody>
          </TableCell>
        </TableRow>
      );
    }
    // Return null if the row should not be rendered based on the filter
    return null;
  });

  return (
    <>
      <HStack
        alignItems="center"
        borderRadius="roundedLarge"
        gap={2}
        justifyContent="space-between"
      >
        <TextTitle4 as="sub">CUJ Versions</TextTitle4>

        <Select
          compact
          label="Filter"
          onChange={setSelectFilter}
          placeholder="Select one"
          value={selectFilter}
          width="40%"
        >
          {filterOptions.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </Select>
      </HStack>

      <Table variant="ruled">
        <TableHeader>
          <TableRow>
            <TableCell title="CUJ" />
            <TableCell title="Version" />
            <TableCell title="Up To Date" />
          </TableRow>
        </TableHeader>
        <TableBody>{filteredRows}</TableBody>
      </Table>
    </>
  );
}
