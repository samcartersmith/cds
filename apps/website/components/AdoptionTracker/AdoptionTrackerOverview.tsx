/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import getFirst from 'lodash/first';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import { CellDetailVariant, join, SetState, useToggler } from '@cbhq/cds-common';
import { Button } from '@cbhq/cds-web/buttons';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { Icon } from '@cbhq/cds-web/icons';
import { Card, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextBody, TextDisplay2, TextHeadline, TextTitle2 } from '@cbhq/cds-web/typography';

import { BetaCell } from ':cds-website/components/BetaCell';
import { adopters } from ':cds-website/data/adopters';
import { hiddenAdopters } from ':cds-website/data/hidden-adopters';

import { SplitScreenStack } from '../SplitScreenStack';

import { AdopterProjectInfoProvider } from './context/AdopterProjectInfoProvider';
import { AdopterStatsProvider, statsFallback } from './context/AdopterStatsProvider';
import { useAdopterProjectInfo } from './hooks/useAdopterProjectInfo';
import { useAdopterStats } from './hooks/useAdopterStats';
import { getPercentageText } from './utils/getPercentageText';
import { AdopterStatsBreakdownCell } from './AdopterStatsBreakdown';
import type { Adopter, AdopterStatsItem } from './types';
import { AdopterProjectInfo, AdopterStats } from './types';

type SetActiveProject = SetState<Adopter>;
type ProjectProps = { id: Adopter };
type ProjectCellProps = { active: boolean; setActiveProject: SetActiveProject };

function useProject(id: Adopter) {
  const projectInfo =
    require(`@site/static/data/adoption/${id}/project.json`) as AdopterProjectInfo;
  const stats = require(`@site/static/data/adoption/${id}/stats.json`) as AdopterStats;
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

export const Project: React.FC<ProjectProps> = memo(({ id, children }) => {
  const { projectInfo, stats } = useProject(id);
  return (
    <AdopterProjectInfoProvider {...projectInfo}>
      <AdopterStatsProvider {...stats}>{children}</AdopterStatsProvider>
    </AdopterProjectInfoProvider>
  );
});

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
  }: AdopterStatsItem & { allExpanded?: boolean; percentChange?: React.ReactNode }) => {
    const { id } = useAdopterProjectInfo();
    const [expanded, { toggle, toggleOn, toggleOff }] = useToggler(false);
    useEffect(() => {
      if (allExpanded) {
        toggleOn();
      } else {
        toggleOff();
      }
    }, [allExpanded, toggleOn, toggleOff]);
    const expandedDetailsNode = (
      <VStack>
        <AdopterStatsBreakdownCell title="CDS" detail={cds} />
        <AdopterStatsBreakdownCell title="Presentational" detail={presentational} />
        <Divider direction="horizontal" spacingVertical={1} />
        <AdopterStatsBreakdownCell title="Total" detail={totalCdsAndPresentational} />
      </VStack>
    );
    return (
      <Card spacing={3} onPress={toggle}>
        <BetaCell
          key={`previous-stat-cell-${id}-${date}`}
          priority="end"
          offsetHorizontal={1}
          start={
            <TextBody as="p" overflow="truncate">
              {date} {period && `(End of ${period})`}
            </TextBody>
          }
          end={
            <HStack justifyContent="flex-end">
              <TextBody as="p" align="end">
                {getPercentageText(cdsPercent)}
              </TextBody>
              {percentChange}
            </HStack>
          }
          endAccessory={
            <Icon
              size="s"
              name={expanded ? 'caretUp' : 'caretDown'}
              color={expanded ? 'primary' : 'foregroundMuted'}
            />
          }
        />
        {expanded && expandedDetailsNode}
      </Card>
    );
  },
);

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
      <HStack alignItems="center" justifyContent="space-between">
        <TextDisplay2 as="h4" spacingBottom={1}>
          {label}
        </TextDisplay2>
        <HStack gap={1}>
          <Button variant="secondary" compact onPress={setAllExpanded}>
            {allExpanded ? 'Collapse all' : 'Expand all'}
          </Button>
          <Link to={`/adoption-tracker/${id}`}>
            <Button variant="primary" compact>
              View details
            </Button>
          </Link>
        </HStack>
      </HStack>
      <DetailStatCell
        allExpanded={allExpanded}
        percentChange={<PercentChange showParenthesis />}
        {...latest}
      />
      <Divider direction="horizontal" spacingVertical={1} />
      {previousStats}
    </VStack>
  );
});

export const AdoptionTrackerOverview = memo(({ hidden }: { hidden?: boolean }) => {
  const scopedAdopters = hidden ? hiddenAdopters : adopters;
  const [activeProjectId, setActiveProject] = useState<Adopter>(scopedAdopters[0].id);
  const start = useMemo(() => {
    return toPairs(groupBy(scopedAdopters, 'pillar')).map(([pillar, projects]) => {
      return (
        <VStack key={pillar} gap={1} spacingBottom={5}>
          <TextTitle2 as="h2" spacingBottom={2}>
            {pillar}
          </TextTitle2>
          {projects.map(
            ({
              // @ts-expect-error id issue
              id,
            }) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <Project key={id} id={id}>
                <ProjectCell active={activeProjectId === id} setActiveProject={setActiveProject} />
              </Project>
            ),
          )}
        </VStack>
      );
    });
  }, [activeProjectId, scopedAdopters]);

  const end = (
    <Project id={activeProjectId}>
      <ActiveProject />
    </Project>
  );

  return (
    <ThemeProvider>
      <SplitScreenStack start={start} end={end} />
    </ThemeProvider>
  );
});
