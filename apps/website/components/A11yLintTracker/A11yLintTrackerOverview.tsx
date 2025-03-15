import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionItem } from '@cbhq/cds-web/accordion';
import { Button } from '@cbhq/cds-web/buttons';
import { ListCell } from '@cbhq/cds-web/cells';
import { SelectChip } from '@cbhq/cds-web/chips';
import { SelectOption } from '@cbhq/cds-web/controls';
import { Icon } from '@cbhq/cds-web/icons';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import {
  Link,
  TextBody,
  TextCaption,
  TextLabel1,
  TextLabel2,
  TextTitle2,
  TextTitle3,
} from '@cbhq/cds-web/typography';

import { a11yLintRepos } from ':cds-website/data/__generated__/a11yLintConfig/a11yLintRepos';

import { SplitScreenStack } from '../SplitScreenStack';

import {
  A11yLintConfig,
  A11yLintListCellType,
  DisabledRule,
  filterGroupedData,
  formatFilePath,
  getA11yDisableLintDataByRepo,
  getA11yLintCodeOwnersPerRepo,
  getA11yLintDataByRepo,
  getTotalDisabledRulesByRepo,
  getTotalWarningsByRepo,
  groupByRule,
  GroupedByRuleId,
  groupMessagesByRuleId,
  ProjectData,
  showComplexRepoBreakdownByProject,
} from './utils/A11yLintTrackerUtils';

const innerCellSpacing = { spacingHorizontal: 1 } as const;
const outerCellSpacing = { spacingStart: 2, spacingEnd: 4 } as const;

const A11yLintListCell = memo(
  ({ id, isActive, repoData, onPress, index }: A11yLintListCellType) => {
    return (
      <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'}>
        <ListCell
          accessory={isActive ? 'selected' : 'arrow'}
          description={`${
            getTotalWarningsByRepo(id) > 0
              ? `${getTotalWarningsByRepo(id)} total warnings`
              : 'No warnings'
          } | ${
            getTotalDisabledRulesByRepo(id) > 0
              ? `${getTotalDisabledRulesByRepo(id)} disabled`
              : 'No disabled warnings'
          }`}
          innerSpacing={innerCellSpacing}
          media={<Icon name="warning" size="m" />}
          onPress={() => onPress(id)}
          outerSpacing={outerCellSpacing}
          selected={isActive}
          subdetail=""
          title={`${repoData.name} | ${repoData.repo} `}
        />
      </div>
    );
  },
);
A11yLintListCell.displayName = 'A11yLintListCell';

const EmptyA11yPanel = memo(() => {
  return (
    <VStack width="100%">
      <VStack gap={2}>
        <TextTitle3 as="h3">Select a Repository </TextTitle3>
        <TextBody as="p">Select any repository on the left.</TextBody>
      </VStack>
    </VStack>
  );
});

const RepoLintBreakDownOverviewCell = memo(
  ({
    title,
    detail,
    link,
  }: {
    title: string;
    detail: number | string | undefined;
    link?: string;
  }) => {
    return (
      <HStack gap={1} spacingTop={1}>
        <TextLabel1 as="p">{title}</TextLabel1>
        {link && detail ? (
          <Link color="primary" href={link} variant="label1">
            {detail}
          </Link>
        ) : (
          <TextLabel2 align="end" as="p">
            {detail}
          </TextLabel2>
        )}
      </HStack>
    );
  },
);

const ShowA11yWarningsBreakDown = memo(
  ({
    groupedData,
    repoDataOverview,
  }: {
    groupedData: GroupedByRuleId;
    repoDataOverview: A11yLintConfig;
  }) => {
    const groupedDataKeys = Object.keys(groupedData);
    return (
      <VStack gap={2}>
        <TextTitle3 as="h3">Warnings</TextTitle3>

        {groupedDataKeys.length > 0 ? (
          <Accordion>
            {/* Iterate over the keys of the groupedData object */}
            {groupedDataKeys.map((ruleId) => {
              return (
                <AccordionItem
                  key={ruleId + repoDataOverview.id}
                  itemKey={ruleId + repoDataOverview.id}
                  subtitle={`${groupedData[ruleId].length} total warnings`}
                  title={ruleId}
                >
                  <Accordion>
                    <VStack>
                      {groupedData[ruleId].map((item, index) => {
                        const formattedFilePath = formatFilePath(item.filePath);
                        return (
                          <AccordionItem
                            key={formattedFilePath + repoDataOverview.id + index}
                            itemKey={formattedFilePath}
                            title={formattedFilePath}
                          >
                            <VStack>
                              <RepoLintBreakDownOverviewCell
                                detail={formattedFilePath}
                                link={`https://github.cbhq.net/${
                                  repoDataOverview.repo
                                }/tree/master/${formatFilePath(
                                  `${item.filePath}#L${item.line}`,
                                  true,
                                )}`}
                                title="filePath"
                              />
                              <RepoLintBreakDownOverviewCell
                                detail={item.message}
                                title="Message"
                              />
                              <RepoLintBreakDownOverviewCell detail={item.line} title="Line #" />
                              <RepoLintBreakDownOverviewCell
                                detail={item.column}
                                title="Column #"
                              />
                            </VStack>
                          </AccordionItem>
                        );
                      })}
                    </VStack>
                  </Accordion>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <TextBody as="p">No warnings found for this project.</TextBody>
        )}
      </VStack>
    );
  },
);

// Component to display complex repo breakdown by project when repoDataOverview.repoType is 'complex'
const ComplexRepoSummaryInfoByProject = memo(
  ({ repoData, repoDataOverview }: { repoData: ProjectData; repoDataOverview: A11yLintConfig }) => {
    // handle complex repo breakdown
    return (
      <VStack gap={2}>
        <TextTitle3 as="h3">Warnings Breakdown by Target Project</TextTitle3>

        <Accordion>
          {Object.keys(repoData).map((targetProject) => {
            const projectLintData = repoData[targetProject];

            const groupedData = groupMessagesByRuleId(projectLintData);
            return (
              <AccordionItem
                itemKey={targetProject + repoDataOverview.id}
                title={`Target NX Project:  ${targetProject}`}
              >
                <ShowA11yWarningsBreakDown
                  groupedData={groupedData}
                  repoDataOverview={repoDataOverview}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      </VStack>
    );
  },
);

const RepoSummaryInfo = memo(
  ({
    repoDataOverview,
    codeOwnersToFilterFor,
  }: {
    repoDataOverview: A11yLintConfig;
    codeOwnersToFilterFor: string[];
  }) => {
    const repoData = getA11yLintDataByRepo(repoDataOverview.id);

    const groupedData: GroupedByRuleId = groupMessagesByRuleId(repoData.fullRepo);

    const filteredGroupedDataParams = {
      groupedData,
      codeOwnersToFilterFor,
    };
    const filteredGroupedData = filterGroupedData(filteredGroupedDataParams);

    return (
      <VStack>
        {showComplexRepoBreakdownByProject && repoDataOverview.repoType === 'complex' && (
          <ComplexRepoSummaryInfoByProject
            repoData={repoData}
            repoDataOverview={repoDataOverview}
          />
        )}
        <ShowA11yWarningsBreakDown
          groupedData={filteredGroupedData}
          repoDataOverview={repoDataOverview}
        />
      </VStack>
    );
  },
);

const DisablesBreakDownSummaryInfo = memo(
  ({
    repoDataOverview,
    codeOwnersToFilterFor,
  }: {
    repoDataOverview: A11yLintConfig;
    codeOwnersToFilterFor: string[];
  }) => {
    const disablesData: DisabledRule[] = getA11yDisableLintDataByRepo(repoDataOverview.id);
    const groupedData = groupByRule(disablesData);

    const filteredGroupedDataParams = {
      groupedData,
      codeOwnersToFilterFor,
    };

    const filteredGroupedData = filterGroupedData(filteredGroupedDataParams);

    const groupDataEntries = Object.entries(filteredGroupedData);

    return (
      <VStack gap={2}>
        <TextTitle3 as="h3">Disabled Rules</TextTitle3>

        {groupDataEntries.length > 0 ? (
          <Accordion>
            {groupDataEntries.map(([rule, entries]) => (
              <AccordionItem
                key={rule + repoDataOverview.id}
                itemKey={rule + repoDataOverview.id}
                subtitle={`${entries.length} disable instances`}
                title={rule}
              >
                <VStack>
                  {entries.map((item) => (
                    <>
                      <Divider />
                      <RepoLintBreakDownOverviewCell
                        detail={formatFilePath(item.filePath)}
                        link={`https://github.cbhq.net/${
                          repoDataOverview.repo
                        }/tree/master/${formatFilePath(
                          `${item.filePath}#L${item.lineNumber}`,
                          true,
                        )}`}
                        title="filePath"
                      />
                      <RepoLintBreakDownOverviewCell detail={item.lineNumber} title="Line #" />
                    </>
                  ))}
                </VStack>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <TextBody as="p">No disabled rules found.</TextBody>
        )}
      </VStack>
    );
  },
);

const A11yLintDetails = memo(({ repoId }: { repoId: string }) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const codeOwners = getA11yLintCodeOwnersPerRepo(repoId);
  const repoDataOverview = a11yLintRepos.find((repo) => repo.id === repoId);

  useEffect(() => {
    // This will reset the selected filter every time the repoId changes.
    setValue(undefined);
  }, [repoId]);

  const handleClearSearch = () => {
    setValue(undefined);
  };

  const handleChange = (selectedOption: string) => {
    if (codeOwners[selectedOption]) {
      setValue(selectedOption);
    } else {
      // Clearing the result will reset and show all.
      setValue(undefined);
    }
  };
  const content = (
    <VStack>
      <HStack spacing={2}>
        <TextCaption as="p">CODEOWNERS</TextCaption>
      </HStack>

      {Object.keys(codeOwners) && Object.keys(codeOwners).length > 0 ? (
        Object.keys(codeOwners).map((codeowner) => (
          <SelectOption key={codeowner} title={codeowner} value={codeowner} />
        ))
      ) : (
        <TextBody as="sub" spacing={2}>
          No code owners available.
        </TextBody>
      )}
    </VStack>
  );

  // Memoize the filtered code owners to prevent unnecessary re-renders
  const codeOwnersToFilterFor = useMemo(() => {
    return value ? codeOwners[value] : [];
  }, [value, codeOwners]);

  return (
    <VStack width="100%">
      <HStack gap={2} justifyContent="space-between" spacing={1}>
        <TextTitle3 as="h3" spacingTop={1}>
          {value || 'Showing All Warnings'}
        </TextTitle3>
        <HStack justifyContent="flex-end">
          <SelectChip
            active={value !== undefined}
            content={content}
            minWidth={500}
            onChange={(selectedOption: string) => handleChange(selectedOption)}
            placeholder="Filter"
            value={value || undefined}
            valueLabel={value || undefined}
          />
          <Button compact onPress={handleClearSearch} variant="secondary">
            Clear
          </Button>
        </HStack>
      </HStack>
      <Divider />
      {repoDataOverview ? (
        <VStack gap={2} spacingVertical={2}>
          <RepoSummaryInfo
            codeOwnersToFilterFor={codeOwnersToFilterFor}
            repoDataOverview={repoDataOverview}
          />
          <DisablesBreakDownSummaryInfo
            codeOwnersToFilterFor={codeOwnersToFilterFor}
            repoDataOverview={repoDataOverview}
          />
        </VStack>
      ) : (
        <>Repo Data Not Found.</>
      )}
    </VStack>
  );
});

export const A11yLintTrackerOverview = memo(() => {
  const [activeId, setActiveId] = useState(a11yLintRepos[0].id);

  const handlePress = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const start = (
    <>
      {a11yLintRepos.map((repo, index) => {
        return (
          <A11yLintListCell
            key={repo.id}
            id={repo.id}
            index={index}
            isActive={repo.id === activeId}
            onPress={handlePress}
            repoData={repo}
          />
        );
      })}
    </>
  );
  const end = activeId ? <A11yLintDetails repoId={activeId} /> : <EmptyA11yPanel />;

  return (
    <>
      <VStack alignItems="baseline" gap={5} maxWidth="100%" spacingBottom={4}>
        <TextTitle2 as="span" color="foregroundMuted">
          Track accessibility warnings, errors, and disabled ESLint rules. See the{' '}
          <Link to="https://docs.google.com/document/d/1zZvMw53YysvSuPd9Uph7Yr3JewpIfSVK_a9eeJ6Xktw/edit?usp=sharing">
            P/PS
          </Link>{' '}
          for more information on how CDS is driving accessibility remediation.
        </TextTitle2>
        <HStack gap={1} justifyContent="space-between" width="100%">
          <TextBody as="p">
            <Link to="https://docs.google.com/document/d/1vafx_gnf8VKF9Kc6O-HGIftymI0obnn0-HnriOnWCE0/edit?usp=sharing">
              Fixing A11y Issues Guidebook
            </Link>
          </TextBody>
        </HStack>
      </VStack>

      <Divider direction="horizontal" />
      <SplitScreenStack end={end} start={start} />
    </>
  );
});

A11yLintTrackerOverview.displayName = 'A11yLintTrackerOverview';
