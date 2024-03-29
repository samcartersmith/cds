import { memo, useCallback, useState } from 'react';
import Link from '@docusaurus/Link';
import { SetState } from '@cbhq/cds-common';
import { Button } from '@cbhq/cds-web/buttons';
import { Card } from '@cbhq/cds-web/cards';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Modal, ModalBody, ModalHeader } from '@cbhq/cds-web/overlays';
import { ThemeProvider } from '@cbhq/cds-web/system';
import {
  TextBody,
  TextDisplay3,
  TextHeadline,
  TextTitle2,
  TextTitle3,
} from '@cbhq/cds-web/typography';

import { cujSummary } from '../../data/__generated__/adoption/cujSummary';
import { AdopterStatsItem } from '../../scripts/adoption/types';
import { BetaCell } from '../BetaCell';
import { SplitScreenStack } from '../SplitScreenStack';

import { AdopterStatsProvider } from './context/AdopterStatsProvider';
import { useAdopterStats } from './hooks/useAdopterStats';
import { getPercentageText } from './utils/getPercentageText';
import { AdopterStatsBreakdownCell } from './AdopterStatsBreakdown';
import { AdopterVersionCell } from './AdopterVersionCell';
import { PercentChange } from './AdoptionTrackerOverview';
import {
  getCUJProjects,
  getCUJSummaryReport,
  getIndividualCUJInfo,
  getIndividualCUJStats,
  SummaryProps,
  useCUJProject,
} from './CUJUtils';
import { CUJVersionModal } from './CUJVersionModal';

export const CUJProject: React.FC<React.PropsWithChildren<SummaryProps>> = memo(
  ({ id, children }) => {
    const { cujStats } = useCUJProject(id);
    return <AdopterStatsProvider {...cujStats}>{children}</AdopterStatsProvider>;
  },
);

type SetActiveProject = SetState<string>;
type SetActiveProjectLabel = SetState<string>;
type ProjectCellProps = {
  label: string;
  id: string;
  active: boolean;
  setActiveProject: SetActiveProject;
  setActiveProjectLabel: SetActiveProjectLabel;
};

export const ProjectCell = memo(
  ({ label, id, active, setActiveProject, setActiveProjectLabel }: ProjectCellProps) => {
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

    const handlePress = useCallback(() => {
      setActiveProject(id);
      setActiveProjectLabel(label);
    }, [id, label, setActiveProject, setActiveProjectLabel]);
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
  },
);

export const DetailStatCUJCell = memo(
  ({
    cdsPercent,
    cds,
    presentational,
    totalCdsAndPresentational,
    date,
    period,
    percentChange,
    cdsCommonVersion,
    cdsWebVersion,
    cdsMobileVersion,
    cdsLatestVersion,
    latestCdsVersionPublished3MonthsAgo,
    upToDate,
  }: AdopterStatsItem & {
    allExpanded?: boolean;
    percentChange?: React.ReactNode;
  }) => {
    const detailNode = (
      <VStack spacingTop={2} width="100%">
        <AdopterVersionCell
          cdsCommonVersion={cdsCommonVersion}
          cdsLatestVersion={cdsLatestVersion}
          cdsMobileVersion={cdsMobileVersion}
          cdsWebVersion={cdsWebVersion}
          latestCdsVersionPublished3MonthsAgo={latestCdsVersionPublished3MonthsAgo}
          upToDate={upToDate}
          verInfoName="CUJ Version"
        />
        <AdopterStatsBreakdownCell detail={cds} title="CDS" />
        <AdopterStatsBreakdownCell detail={presentational} title="Presentational" />
        <Divider direction="horizontal" spacingVertical={1} />
        <AdopterStatsBreakdownCell detail={totalCdsAndPresentational} title="Total" />
      </VStack>
    );
    return (
      <Card
        background="backgroundAlternate"
        borderRadius="roundedLarge"
        offsetHorizontal={2}
        spacing={2}
      >
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
          </HStack>
        </HStack>
        {detailNode}
      </Card>
    );
  },
);

export const CUJBreakdownByRepo = memo(({ activeProjectLabel }: { activeProjectLabel: string }) => {
  const filteredCUJByPillar = getCUJProjects(activeProjectLabel);

  const cujComponents = filteredCUJByPillar.map((cuj) => {
    const { latest } = getIndividualCUJStats({ id: cuj.id });
    const cujSpecificInfo = getIndividualCUJInfo({ id: cuj.id });

    return (
      <VStack spacingTop={2}>
        <TextTitle3 as="h3">
          {cuj.label}{' '}
          <Link href={`${cujSpecificInfo.githubUrl}/${cujSpecificInfo.projectGitPath}`}>
            (Repo)
          </Link>
        </TextTitle3>

        <DetailStatCUJCell percentChange={<PercentChange showParenthesis />} {...latest} />
      </VStack>
    );
  });

  return <div>{cujComponents}</div>;
});

export const ActiveCUJProject = memo(
  ({
    activeProjectLabel,
    activeProjectId,
  }: {
    activeProjectLabel: string;
    activeProjectId: string;
  }) => {
    const { latest } = useAdopterStats();

    return (
      <VStack gap={1}>
        <VStack gap={2} spacingTop={7} spacingVertical={4}>
          <HStack alignItems="center" gap={2} justifyContent="space-between">
            <TextDisplay3 as="h4">{activeProjectLabel}</TextDisplay3>
            <Pictogram name="analyticsNavigation" />
          </HStack>
          <TextBody as="p" color="foregroundMuted">
            You’re viewing adoption metrics captured over the past week for the {activeProjectLabel}{' '}
            CUJ. <br />
          </TextBody>
          <HStack gap={1}>
            <Button
              compact
              // @ts-expect-error This should be allowed
              as={Link}
              to={`/adoption-tracker/cuj/${activeProjectId}`}
              variant="primary"
            >
              View details
            </Button>
          </HStack>
          <VStack>
            <TextTitle2 as="h4">Summary</TextTitle2>
            <TextBody as="p">See the summary for {activeProjectLabel} CUJ.</TextBody>
          </VStack>
          <DetailStatCUJCell percentChange={<PercentChange showParenthesis />} {...latest} />
        </VStack>
        <Divider />
        <VStack gap={2} spacingTop={2}>
          <TextTitle2 as="h4">Stat Breakdown by Repo</TextTitle2>
          <TextBody as="p">
            See the breakdown for {activeProjectLabel} CUJ by repo and CUJ entry.
          </TextBody>
        </VStack>
        <CUJBreakdownByRepo activeProjectLabel={activeProjectLabel} />
      </VStack>
    );
  },
);

export const CUJOverview = memo(() => {
  const [activeProjectId, setActiveProject] = useState<string>(cujSummary[0].id);
  const [activeProjectLabel, setActiveProjectLabel] = useState<string>(cujSummary[0].label);
  const { latest: summaryReportLatest } = getCUJSummaryReport();
  const [versionModalVisible, setVersionModalVisible] = useState(false);

  const handlePressSummaryModal = useCallback(() => {
    setVersionModalVisible(true);
  }, []);

  const closeVerModal = useCallback(() => {
    setVersionModalVisible(false);
  }, []);

  const cujProjects = () => {
    return (
      <>
        {cujSummary.map(({ id, label }: { id: string; label: string }) => (
          <CUJProject key={id} id={id}>
            <ProjectCell
              active={activeProjectId === id}
              id={id}
              label={label}
              setActiveProject={setActiveProject}
              setActiveProjectLabel={setActiveProjectLabel}
            />
          </CUJProject>
        ))}
      </>
    );
  };

  const start = (
    <VStack gap={2} spacingEnd={3}>
      <VStack gap={2} spacingTop={7} spacingVertical={4}>
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <TextDisplay3 as="h2">Scoreboard</TextDisplay3>
          <Pictogram name="congratulations" />
        </HStack>
        <TextBody as="p" color="foregroundMuted">
          To help us reach our goal, we’re tracking each CUJ surface on their CDS Adoption journey!
        </TextBody>
      </VStack>
      {cujProjects()}
    </VStack>
  );

  const end = (
    <CUJProject key={activeProjectId} id={activeProjectId}>
      <ActiveCUJProject activeProjectId={activeProjectId} activeProjectLabel={activeProjectLabel} />
    </CUJProject>
  );

  return (
    <ThemeProvider>
      <VStack alignItems="baseline" gap={5} maxWidth={900} spacingBottom={4}>
        <TextTitle2 as="span" color="foregroundMuted">
          Our CUJ (Core User Journey) Tracker allows us to view component level insight into CDS
          adoption.
        </TextTitle2>
        <TextTitle2 as="span" color="foregroundMuted">
          <TextTitle2
            as="span"
            color={summaryReportLatest.overallCDSPercent >= 0.9 ? 'positive' : 'negative'}
          >
            {(summaryReportLatest.overallCDSPercent * 100).toFixed(2)}%{' '}
          </TextTitle2>{' '}
          of our CUJ surface area is using CDS.{' '}
          <TextTitle2
            as="span"
            color={summaryReportLatest.overallLatestCDSPercent >= 0.9 ? 'positive' : 'negative'}
          >
            {(summaryReportLatest.totalUpToDateProjectPercentage * 100).toFixed(2)}%
          </TextTitle2>{' '}
          of our CUJ surface area is using the latest version (
          <TextTitle2 as="span" color="positive">
            {summaryReportLatest.latestCdsVersionPublished3MonthsAgo}
          </TextTitle2>{' '}
          or higher) of CDS.
        </TextTitle2>
      </VStack>
      <Box spacingBottom={4}>
        <HStack
          alignItems="center"
          borderRadius="roundedLarge"
          gap={2}
          justifyContent="space-between"
        >
          <Button compact onPress={handlePressSummaryModal} variant="secondary">
            Show version summary
          </Button>
        </HStack>
      </Box>
      <Modal onRequestClose={closeVerModal} visible={versionModalVisible}>
        <ModalHeader
          backAccessibilityLabel="Back"
          closeAccessibilityLabel="Close"
          onBackButtonPress={closeVerModal}
          title="CUJ Version Summary"
        />
        <ModalBody>
          <CUJVersionModal />
        </ModalBody>
      </Modal>
      <Divider direction="horizontal" />
      <SplitScreenStack end={end} start={start} />
    </ThemeProvider>
  );
});

CUJOverview.displayName = 'CUJOverview';
