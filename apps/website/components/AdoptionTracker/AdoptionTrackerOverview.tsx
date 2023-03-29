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
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { PressableOpacity, ThemeProvider } from '@cbhq/cds-web/system';
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

const getProjects = (pillar?: string) => {
  return adopters.filter((adopter) => adopter.pillar === pillar || !pillar);
};

const getStats = (project: ProjectProps) => {
  return require(`@site/static/data/__generated__/adoption/${project.id}/stats.json`) as AdopterStats;
};

type PercentageGetterProps = { pillar?: string; average?: boolean };

const getPercentage = ({ pillar, average }: PercentageGetterProps) => {
  const projects = getProjects(pillar);
  const change =
    projects.reduce((acc, project) => {
      const stats = getStats(project);
      const latestStat = stats.latest ?? statsFallback?.latest;
      return acc + latestStat.cdsPercent;
    }, 0) / (average ? projects.length : 1);
  const variant = Number(change) >= TARGET_ADOPTION_PERCENTAGE ? 'positive' : 'negative';
  const percentage = `${getPercentageText(change)}`;

  return { variant, percentage } as const;
};

const getPercentageChange = ({ pillar, average }: PercentageGetterProps) => {
  const projects = getProjects(pillar);
  const change =
    projects.reduce((acc, project) => {
      const stats = getStats(project);
      const fallback = getFirst(stats.previous) ?? statsFallback?.latest;
      const statToCompare =
        stats.previous
          .slice()
          .reverse()
          .find((prev) => Boolean(prev.period)) ?? fallback;

      return acc + (stats.latest.cdsPercent - (statToCompare?.cdsPercent ?? 0));
    }, 0) / (average ? projects.length : 1);

  let variant: CellDetailVariant = 'foregroundMuted';
  let percentage = `${getPercentageText(change)}`;

  if (change > 0) {
    variant = 'positive';
    percentage = `+${getPercentageText(change)}`;
  }
  if (change < 0) {
    variant = 'negative';
    percentage = getPercentageText(change);
  }
  if (change === 0) {
    percentage = 'No change';
  }

  return { variant, percentage } as const;
};

const getSortedProjectPairs = (adoptersJson: Adopters) =>
  toPairs(groupBy(adoptersJson, 'pillar'))
    .sort(([pillarA], [pillarB]) => {
      // Sort projects by their total adoption percentage
      const { percentage: percentageA } = getPercentage({ pillar: pillarA, average: true });
      const { percentage: percentageB } = getPercentage({ pillar: pillarB, average: true });

      return Number(percentageA.replace('%', '')) - Number(percentageB.replace('%', ''));
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
    const { change, changeVariant } = usePercentChange();
    const statToCompare = useStatForLastPeriod();
    const comparisonTime = useMemo(
      () => `${statToCompare.period ?? statToCompare.date}`,
      [statToCompare.date, statToCompare.period],
    );

    return (
      <HStack gap={0.5} spacingStart={showParenthesis ? 1 : 0} alignSelf="flex-end">
        <TextBody as="p" color={changeVariant}>
          {showParenthesis ? `(${change})` : change}
        </TextBody>
        {showComparisonTime && (
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
      <TextBody as="p" align="end" overflow="truncate">
        {`${getPercentageText(latest.cdsPercent)} CDS`}
      </TextBody>
      <PercentChange showComparisonTime />
    </VStack>
  );

  const handlePress = useCallback(() => setActiveProject(id), [id, setActiveProject]);

  return (
    <BetaCell
      key={`project-cell-${id}`}
      priority="end"
      offsetHorizontal={1}
      start={start}
      end={end}
      selected={active}
      endAccessory={<CellAccessory type={active ? 'selected' : 'arrow'} />}
      onPress={handlePress}
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
      <VStack width="100%" flexGrow={1} spacingTop={2}>
        <AdopterStatsBreakdownCell title="CDS" detail={cds} />
        <AdopterStatsBreakdownCell title="Presentational" detail={presentational} />
        <Divider direction="horizontal" spacingVertical={1} />
        <AdopterStatsBreakdownCell title="Total" detail={totalCdsAndPresentational} />
      </VStack>
    );
    return (
      <Card
        spacing={2}
        background={expanded ? 'backgroundAlternate' : 'transparent'}
        offsetHorizontal={2}
        borderRadius={expanded ? 'roundedLarge' : 'roundedNone'}
      >
        <PressableOpacity onPress={isLatest ? undefined : toggle}>
          <HStack
            gap={2}
            justifyContent="space-between"
            alignItems="center"
            borderRadius="roundedLarge"
          >
            <TextBody as="p" overflow="truncate">
              {date} {period && `(End of ${period})`}
            </TextBody>
            <HStack gap={0.5} alignItems="center">
              <HStack justifyContent="flex-end">
                <TextBody as="p" align="end">
                  {getPercentageText(cdsPercent)}
                </TextBody>
                {percentChange}
              </HStack>
              {!isLatest && (
                <Icon
                  size="s"
                  name={expanded ? 'caretUp' : 'caretDown'}
                  color={expanded ? 'primary' : 'foregroundMuted'}
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
      <VStack gap={2} spacingVertical={4} spacingTop={7}>
        <HStack gap={2} justifyContent="space-between" alignItems="center">
          <TextDisplay3 as="h4">{label}</TextDisplay3>
          <Pictogram name="analyticsNavigation" />
        </HStack>
        <TextBody as="p" color="foregroundMuted" spacingBottom={2}>
          You’re viewing adoption metrics captured over the past week. For a more in-depth analysis,
          view all instances.
        </TextBody>
        <HStack gap={1}>
          <Button
            // @ts-expect-error This should be allowed
            as={Link}
            to={`/adoption-tracker/${id}`}
            variant="primary"
            compact
          >
            View details
          </Button>
          <Button variant="secondary" compact onPress={setAllExpanded}>
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
  const { percentage } = getPercentage({ pillar, average: true });
  const { variant: changedVariant, percentage: changePercentage } = getPercentageChange({
    pillar,
    average: true,
  });
  return (
    <VStack spacingBottom={2} gap={1}>
      <TextCaption as="span" color="foregroundMuted" id={pillar}>
        {pillar}
        <a className="hash-link" href={`#${pillar}`} title="Direct link to heading">
          &nbsp;
        </a>
      </TextCaption>
      <TextDisplay3 as="span">{percentage}</TextDisplay3>
      {changePercentage !== 'No change' && (
        <TextLabel1 as="span" color={changedVariant}>
          <HStack gap={1} alignItems="center">
            <Icon
              color={changedVariant}
              name={`diagonal${changedVariant === 'negative' ? 'Down' : 'Up'}Arrow`}
              size="s"
            />
            {changePercentage}{' '}
          </HStack>
        </TextLabel1>
      )}
    </VStack>
  );
};

export const AdoptionTrackerOverview = memo(({ hidden }: { hidden?: boolean }) => {
  const scopedAdopters = getSortedProjectPairs(hidden ? hiddenAdopters : adopters);
  // Sort projects by pillar adoption, and make sure projects are also sorted
  const { variant, percentage } = getPercentage({ average: true });
  const { variant: changedVariant, percentage: changePercentage } = getPercentageChange({
    average: true,
  });
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
      <VStack gap={2} spacingVertical={4} spacingTop={7}>
        <HStack gap={2} justifyContent="space-between" alignItems="center">
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
      <VStack spacingBottom={4} gap={5} alignItems="baseline" maxWidth={900}>
        <TextDisplay1 as="h1" spacingBottom={0} dangerouslySetClassName={titleClass}>
          Adoption
        </TextDisplay1>
        <TextTitle2 as="span" color="foregroundMuted">
          Our Adoption Tool allows us to view component level insight into CDS adoption. Today, CDS
          adoption across all products is{' '}
          <TextTitle2 as="span" color={variant}>
            {percentage}.{' '}
          </TextTitle2>
          {changePercentage !== 'No change' && (
            <TextTitle2 as="span" color="foregroundMuted">
              {direction}{' '}
              <TextTitle2 as="span" color={changedVariant}>
                {changePercentage}
              </TextTitle2>{' '}
              for the quarter.
            </TextTitle2>
          )}
        </TextTitle2>
      </VStack>
      <Divider direction="horizontal" />
      <SplitScreenStack start={start} end={end} />
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
