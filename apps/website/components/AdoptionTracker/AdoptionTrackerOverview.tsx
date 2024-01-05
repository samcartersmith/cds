/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import { css } from 'linaria';
import getFirst from 'lodash/first';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import { CellDetailVariant, join, SetState, useToggler } from '@cbhq/cds-common';
import { Card } from '@cbhq/cds-web/alpha/Card';
import { Button } from '@cbhq/cds-web/buttons';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Modal, ModalBody } from '@cbhq/cds-web/overlays';
import { PressableOpacity, ThemeProvider } from '@cbhq/cds-web/system';
import { Tag } from '@cbhq/cds-web/tag/Tag';
import {
  TextBody,
  TextCaption,
  TextDisplay1,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextTitle2,
} from '@cbhq/cds-web/typography';

import { BetaCell } from ':cds-website/components/BetaCell';
import { adopters } from ':cds-website/data/__generated__/adoption/adopters';
import { hiddenAdopters } from ':cds-website/data/__generated__/adoption/adopters-hidden';

import { SplitScreenStack } from '../SplitScreenStack';

import { AdopterProjectInfoProvider } from './context/AdopterProjectInfoProvider';
import { AdopterStatsProvider, statsFallback } from './context/AdopterStatsProvider';
import { useAdopterProjectInfo } from './hooks/useAdopterProjectInfo';
import { useAdopterStats } from './hooks/useAdopterStats';
import { getPercentageText } from './utils/getPercentageText';
import { AdopterStatsBreakdownCell } from './AdopterStatsBreakdown';
import { ComponentUsageTable } from './ComponentUsageTable';
import type { Adopter, Adopters, AdopterStatsItem } from './types';
import { AdopterProjectInfo, AdopterStats } from './types';

const TARGET_ADOPTION_PERCENTAGE = 0.8;

type SetActiveProject = SetState<Adopter>;
type ProjectProps = { id: Adopter };
type ProjectCellProps = { active: boolean; setActiveProject: SetActiveProject };

const titleClass = css`
  && {
    margin-bottom: 0 !important;
  }
`;

function useProject(id: Adopter) {
  const projectInfo =
    require(`@site/static/data/__generated__/adoption/${id}/info.json`) as AdopterProjectInfo;
  const stats =
    require(`@site/static/data/__generated__/adoption/${id}/stats.json`) as AdopterStats;
  return useMemo(() => ({ projectInfo, stats }), [projectInfo, stats]);
}

// Get the last period marker or the first entry recorded
function useStatForLastPeriod() {
  const { previous } = useAdopterStats();
  const fallback = getFirst(previous) ?? statsFallback?.latest;
  return (
    previous
      .slice()
      .reverse()
      .find((prev) => Boolean(prev.period)) ?? fallback
  );
}

// Get projects by pillar
const getProjects = (pillar?: string) => {
  return adopters.filter((adopter) => adopter.pillar === pillar || !pillar);
};

// Get stats for each project
const getStats = (project: ProjectProps) => {
  return require(`@site/static/data/__generated__/adoption/${project.id}/stats.json`) as AdopterStats;
};

// Get total number of component instances across all projects
const getTotalInstancesLatest = (
  key: 'cds' | 'presentational' | 'totalCdsAndPresentational',
  pillar?: string,
) => {
  const projects = getProjects(pillar);
  return projects.reduce((acc, project) => {
    const stats = getStats(project);
    const latestStat = stats.latest ?? statsFallback?.latest;
    return acc + latestStat[key];
  }, 0);
};

const getTotalInstancesPrevious = (
  key: 'cds' | 'presentational' | 'totalCdsAndPresentational',
  pillar?: string,
) => {
  const projects = getProjects(pillar);
  return projects.reduce((acc, project) => {
    const stats = getStats(project);
    const fallback = getFirst(stats.previous) ?? statsFallback?.latest;
    const previous =
      stats.previous
        .slice()
        .reverse()
        .find((prev) => Boolean(prev.period)) ?? fallback;

    return acc + previous[key];
  }, 0);
};

/**
 * Gets the adoption percentage for a given pillar.
 * Returns overall percentage if no pillar provided.
 *
 * @param pillar - Optional pillar name to get percentage for.
 * @returns The percentage as a string formatted like "85%".
 */
const getPercentage = (pillar?: string) => {
  const totalCds = getTotalInstancesLatest('cds', pillar);
  const totalCdsAndPresentational = getTotalInstancesLatest('totalCdsAndPresentational', pillar);
  const percentage = totalCds / totalCdsAndPresentational;

  const variant = Number(percentage) >= TARGET_ADOPTION_PERCENTAGE ? 'positive' : 'negative';
  const percentageText = getPercentageText(percentage);

  return { variant, percentageText, percentage } as const;
};

/**
 * Calculates the percentage change for a given pillar from the adoption stats.
 * Returns overall percentage change if no pillar provided.
 *
 * @param pillar - The pillar to calculate percentage change for.
 * @returns The percentage change as a string formatted like "+10%" or "-5%".
 */
const getPercentageChange = (pillar?: string) => {
  const { percentage: latestPercentage } = getPercentage(pillar);
  const totalCdsPrevious = getTotalInstancesPrevious('cds', pillar);
  const totalCdsAndPresentationalPrevious = getTotalInstancesPrevious(
    'totalCdsAndPresentational',
    pillar,
  );
  const previousPercentage = totalCdsPrevious / totalCdsAndPresentationalPrevious;

  const change = latestPercentage - previousPercentage;

  let variant: CellDetailVariant = 'foregroundMuted';
  let changePercentageText = getPercentageText(change);

  if (change > 0) {
    variant = 'positive';
    changePercentageText = `+${getPercentageText(change)}`;
  }
  if (change < 0) {
    variant = 'negative';
    changePercentageText = getPercentageText(change);
  }
  if (change === 0) {
    changePercentageText = 'No change';
  }

  return { variant, changePercentageText } as const;
};

const getSortedProjectPairs = (adoptersJson: Adopters) =>
  toPairs(groupBy(adoptersJson, 'pillar'))
    .sort(([pillarA], [pillarB]) => {
      // Check if either pillar is 'Other', and sort accordingly

      // Force 'Other' to be at the bottom
      if (pillarA === 'Other') return 1;
      if (pillarB === 'Other') return -1;

      // Sort projects by their total adoption percentage
      const { percentage: percentageA } = getPercentage(pillarA);
      const { percentage: percentageB } = getPercentage(pillarB);

      return percentageA - percentageB;
    })
    .map(([pillar, projectsInPillar]) => {
      return [
        pillar,
        (projectsInPillar as ProjectProps[]).sort((a, b) => {
          // Sort projects by their total adoption percentage
          const statsA = getStats(a);
          const statsB = getStats(b);
          const latestStatA = statsA.latest ?? statsFallback?.latest;
          const latestStatB = statsB.latest ?? statsFallback?.latest;

          return latestStatA.cdsPercent - latestStatB.cdsPercent;
        }),
      ] as const;
    });

function usePercentChange() {
  const { latest } = useAdopterStats();
  const statToCompare = useStatForLastPeriod();

  return useMemo(() => {
    let changeVariant: CellDetailVariant = 'foregroundMuted';
    let change: string | undefined;
    const percentChange = latest.cdsPercent - statToCompare.cdsPercent;

    if (percentChange > 0) {
      changeVariant = 'positive';
      change = `+${getPercentageText(percentChange)}`;
    }
    if (percentChange < 0) {
      changeVariant = 'negative';
      change = getPercentageText(percentChange);
    }
    if (percentChange === 0) {
      change = 'No change';
    }

    return { change, changeVariant };
  }, [latest, statToCompare]);
}

const PercentChange = memo(
  ({
    showParenthesis,
    showComparisonTime,
  }: {
    showParenthesis?: boolean;
    showComparisonTime?: boolean;
  }) => {
    const { previous } = useAdopterStats();
    const isNew = previous.length === 0;
    const { change, changeVariant } = usePercentChange();
    const statToCompare = useStatForLastPeriod();
    const comparisonTime = useMemo(
      () => `${statToCompare.period ?? statToCompare.date}`,
      [statToCompare.date, statToCompare.period],
    );

    return (
      <HStack alignSelf="flex-end" gap={0.5} spacingStart={showParenthesis ? 1 : 0}>
        {isNew ? (
          <Tag colorScheme="blue" intent="promotional">
            New
          </Tag>
        ) : (
          <TextBody as="p" color={changeVariant}>
            {showParenthesis ? `(${change})` : change}
          </TextBody>
        )}
        {showComparisonTime && !isNew && (
          <TextBody as="p" color="foregroundMuted">
            ({comparisonTime})
          </TextBody>
        )}
      </HStack>
    );
  },
);

PercentChange.displayName = 'PercentChange';

export const ProjectCell = memo(({ active, setActiveProject }: ProjectCellProps) => {
  const { label, id } = useAdopterProjectInfo();
  const { latest } = useAdopterStats();

  const start = (
    <VStack>
      <TextHeadline as="p" overflow="truncate">
        {label}
      </TextHeadline>
    </VStack>
  );

  const end = (
    <VStack>
      <TextBody align="end" as="p" overflow="truncate">
        {`${getPercentageText(latest.cdsPercent)} CDS`}
      </TextBody>
      <PercentChange showComparisonTime />
    </VStack>
  );

  const handlePress = useCallback(() => setActiveProject(id), [id, setActiveProject]);

  return (
    <BetaCell
      key={`project-cell-${id}`}
      end={end}
      endAccessory={<CellAccessory type={active ? 'selected' : 'arrow'} />}
      offsetHorizontal={1}
      onPress={handlePress}
      priority="end"
      selected={active}
      start={start}
    />
  );
});

ProjectCell.displayName = 'ProjectCell';

export const Project: React.FC<React.PropsWithChildren<ProjectProps>> = memo(({ id, children }) => {
  const { projectInfo, stats } = useProject(id);
  return (
    <AdopterProjectInfoProvider {...projectInfo}>
      <AdopterStatsProvider {...stats}>{children}</AdopterStatsProvider>
    </AdopterProjectInfoProvider>
  );
});

Project.displayName = 'Project';

const DetailStatCell = memo(
  ({
    allExpanded,
    cdsPercent,
    cds,
    presentational,
    totalCdsAndPresentational,
    date,
    period,
    percentChange,
    isLatest,
  }: AdopterStatsItem & {
    allExpanded?: boolean;
    percentChange?: React.ReactNode;
    isLatest?: boolean;
  }) => {
    const [expanded, { toggle, toggleOn, toggleOff }] = useToggler(false);
    useEffect(() => {
      if (allExpanded || isLatest) {
        toggleOn();
      } else {
        toggleOff();
      }
    }, [allExpanded, toggleOn, toggleOff, isLatest]);
    const expandedDetailsNode = (
      <VStack flexGrow={1} spacingTop={2} width="100%">
        <AdopterStatsBreakdownCell detail={cds} title="CDS" />
        <AdopterStatsBreakdownCell detail={presentational} title="Presentational" />
        <Divider direction="horizontal" spacingVertical={1} />
        <AdopterStatsBreakdownCell detail={totalCdsAndPresentational} title="Total" />
      </VStack>
    );
    return (
      <Card
        background={expanded ? 'backgroundAlternate' : 'transparent'}
        borderRadius={expanded ? 'roundedLarge' : 'roundedNone'}
        offsetHorizontal={2}
        spacing={2}
      >
        <PressableOpacity onPress={isLatest ? undefined : toggle}>
          <HStack
            alignItems="center"
            borderRadius="roundedLarge"
            gap={2}
            justifyContent="space-between"
          >
            <TextBody as="p" overflow="truncate">
              {date} {period && `(End of ${period})`}
            </TextBody>
            <HStack alignItems="center" gap={0.5}>
              <HStack justifyContent="flex-end">
                <TextBody align="end" as="p">
                  {getPercentageText(cdsPercent)}
                </TextBody>
                {percentChange}
              </HStack>
              {!isLatest && (
                <Icon
                  color={expanded ? 'primary' : 'foregroundMuted'}
                  name={expanded ? 'caretUp' : 'caretDown'}
                  size="s"
                />
              )}
            </HStack>
          </HStack>
        </PressableOpacity>
        <Collapsible collapsed={!isLatest && !expanded}>{expandedDetailsNode}</Collapsible>
      </Card>
    );
  },
);

DetailStatCell.displayName = 'DetailStatCell';

export const ActiveProject = memo(() => {
  const { label, id } = useAdopterProjectInfo();
  const { latest, previous } = useAdopterStats();
  const [allExpanded, { toggle: setAllExpanded }] = useToggler(false);
  const previousStats = useMemo(() => {
    const previousNodes = [...previous]
      .reverse()
      .map((item) => <DetailStatCell key={item.date} allExpanded={allExpanded} {...item} />);
    return join(previousNodes, <Divider direction="horizontal" />);
  }, [allExpanded, previous]);

  return (
    <VStack gap={3}>
      <VStack gap={2} spacingTop={7} spacingVertical={4}>
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <TextDisplay3 as="h4">{label}</TextDisplay3>
          <Pictogram name="analyticsNavigation" />
        </HStack>
        <TextBody as="p" color="foregroundMuted" spacingBottom={2}>
          You’re viewing adoption metrics captured over the past week. For a more in-depth analysis,
          view all instances.
        </TextBody>
        <HStack gap={1}>
          <Button
            compact
            // @ts-expect-error This should be allowed
            as={Link}
            to={`/adoption-tracker/${id}`}
            variant="primary"
          >
            View details
          </Button>
          <Button compact onPress={setAllExpanded} variant="secondary">
            {allExpanded ? 'Collapse all' : 'Expand all'}
          </Button>
        </HStack>
      </VStack>
      <DetailStatCell isLatest percentChange={<PercentChange showParenthesis />} {...latest} />
      {previousStats}
    </VStack>
  );
});

ActiveProject.displayName = 'ActiveProject';

const ProjectTitle = ({ pillar }: { pillar: string }) => {
  const { percentageText } = getPercentage(pillar);
  const { variant: changedVariant, changePercentageText } = getPercentageChange(pillar);
  return (
    <VStack gap={1} spacingBottom={2}>
      <TextCaption as="span" color="foregroundMuted" id={pillar}>
        {pillar}
        <a className="hash-link" href={`#${pillar}`} title="Direct link to heading">
          &nbsp;
        </a>
      </TextCaption>
      <TextDisplay3 as="span">{percentageText}</TextDisplay3>
      {changePercentageText !== 'No change' && (
        <TextLabel1 as="span" color={changedVariant}>
          <HStack alignItems="center" gap={1}>
            <Icon
              color={changedVariant}
              name={`diagonal${changedVariant === 'negative' ? 'Down' : 'Up'}Arrow`}
              size="s"
            />
            {changePercentageText}{' '}
          </HStack>
        </TextLabel1>
      )}
    </VStack>
  );
};

export const AdoptionTrackerOverview = memo(({ hidden }: { hidden?: boolean }) => {
  const [usageModalIsVisible, { toggleOff, toggleOn }] = useToggler(false);
  const scopedAdopters = getSortedProjectPairs(hidden ? hiddenAdopters : adopters);
  // Sort projects by pillar adoption, and make sure projects are also sorted
  const { variant, percentageText } = getPercentage();
  const { variant: changedVariant, changePercentageText } = getPercentageChange();
  const direction = changedVariant === 'negative' ? 'Down' : 'Up';
  const [activeProjectId, setActiveProject] = useState<Adopter>(scopedAdopters[0][1][0].id);

  const projects = useMemo(() => {
    return scopedAdopters.map(([pillar, projectsInPillar]) => {
      return (
        <VStack key={pillar} gap={1} spacingBottom={5}>
          <ProjectTitle pillar={pillar} />
          {projectsInPillar.map(({ id }) => (
            <Project key={id} id={id}>
              <ProjectCell active={activeProjectId === id} setActiveProject={setActiveProject} />
            </Project>
          ))}
          <Divider direction="horizontal" offsetEnd={3} offsetStart={1} spacingTop={5} />
        </VStack>
      );
    });
  }, [activeProjectId, scopedAdopters]);

  const start = (
    <VStack gap={2} spacingEnd={3}>
      <VStack gap={2} spacingTop={7} spacingVertical={4}>
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <TextDisplay3 as="h2">Scoreboard</TextDisplay3>
          <Pictogram name="congratulations" />
        </HStack>
        <TextBody as="p" color="foregroundMuted">
          To help us reach our goal, we’re tracking each product surface on their CDS Adoption
          journey!
        </TextBody>
      </VStack>
      {projects}
    </VStack>
  );

  const end = (
    <Project id={activeProjectId}>
      <ActiveProject />
    </Project>
  );

  return (
    <ThemeProvider>
      <VStack alignItems="baseline" gap={5} maxWidth={900} spacingBottom={4}>
        <TextDisplay1 as="h1" dangerouslySetClassName={titleClass} spacingBottom={0}>
          Adoption
        </TextDisplay1>
        <TextTitle2 as="span" color="foregroundMuted">
          Our Adoption Tool allows us to view component level insight into CDS adoption. Today, CDS
          adoption across all products is{' '}
          <TextTitle2 as="span" color={variant}>
            {percentageText}.{' '}
          </TextTitle2>
          {changePercentageText !== 'No change' && (
            <TextTitle2 as="span" color="foregroundMuted">
              {direction}{' '}
              <TextTitle2 as="span" color={changedVariant}>
                {changePercentageText}
              </TextTitle2>{' '}
              for the quarter.
            </TextTitle2>
          )}
        </TextTitle2>
      </VStack>
      <Box spacingBottom={4}>
        <Button compact onPress={toggleOn} variant="secondary">
          Show current component usage
        </Button>
      </Box>
      <Divider direction="horizontal" />
      <SplitScreenStack end={end} start={start} />
      <Modal onRequestClose={toggleOff} visible={usageModalIsVisible}>
        <ModalBody>
          <ComponentUsageTable />
        </ModalBody>
      </Modal>
    </ThemeProvider>
  );
});

AdoptionTrackerOverview.displayName = 'AdoptionTrackerOverview';

export const tableOfContents = [
  ...toPairs(groupBy(adopters, 'pillar')).map(([pillar]) => {
    return {
      id: pillar,
      level: 2,
      value: pillar,
    };
  }),
];
