import { useState } from 'react';
import { Select, SelectOption } from '@cbhq/cds-web/controls';
import { HStack } from '@cbhq/cds-web/layout';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@cbhq/cds-web/tables';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import { TextBody, TextTitle4 } from '@cbhq/cds-web/typography';

import { PillarProjectData } from './types';

type VersionListModalProps = {
  totalProjectVersionsList: PillarProjectData[];
};

const pgGroupOptions = ['All', 'Developer', 'Consumer', 'Platform', 'Institutional'];
const filterOptions = ['All', 'Up to Date', 'Outdated'];

export function VersionListModal({ totalProjectVersionsList }: VersionListModalProps) {
  const [selectPGValue, setPGValue] = useState('All');
  const [selectFilter, setSelectFilter] = useState('All');

  return (
    <>
      <HStack
        alignItems="center"
        borderRadius="roundedLarge"
        gap={2}
        justifyContent="space-between"
      >
        <TextTitle4 as="sub">Project Versions</TextTitle4>
        <Select
          compact
          label="PG"
          onChange={setPGValue}
          placeholder="Select one"
          value={selectPGValue}
          width="40%"
        >
          {pgGroupOptions.map((option) => (
            <SelectOption key={option} title={option} value={option} />
          ))}
        </Select>
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
            <TableCell title="Project" />
            <TableCell title="Pillar" />
            <TableCell title="Version" />
            <TableCell title="Up To Date" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalProjectVersionsList
            .filter((entry) => entry.pillar !== 'Other')
            .map(({ allProjectVersions }) => {
              return (
                <>
                  {allProjectVersions
                    .filter((projectEntry) => {
                      // Filter based on the PG group, if selected
                      const pgFilter =
                        selectPGValue === 'All' || projectEntry.pillar === selectPGValue;

                      // Filter based on the Up to Date/Outdated status
                      let statusFilter = true;
                      if (selectFilter === 'Up to Date') {
                        statusFilter = projectEntry.upToDate;
                      } else if (selectFilter === 'Outdated') {
                        statusFilter = !projectEntry.upToDate;
                      }

                      return pgFilter && statusFilter;
                    })
                    .map((projectEntry) => {
                      return (
                        <TableRow>
                          <TableCell>{projectEntry.id}</TableCell>
                          <TableCell>
                            <TextBody tabularNumbers as="span">
                              {projectEntry.pillar}
                            </TextBody>
                          </TableCell>
                          <TableCell>
                            <TextBody tabularNumbers as="span">
                              {projectEntry.version}
                            </TextBody>
                          </TableCell>
                          <TableCell>
                            <TextBody tabularNumbers as="span">
                              {projectEntry.upToDate ? (
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
                    })}
                </>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
