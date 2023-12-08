import { memo, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { groupBy, meanBy, orderBy } from 'lodash';
import { useToggler } from '@cbhq/cds-common';
import { Button } from '@cbhq/cds-web/buttons';
import { Card } from '@cbhq/cds-web/cards';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';
import { PressableOpacity, ThemeProvider } from '@cbhq/cds-web/system';
import {
  TextBody,
  TextCaption,
  TextDisplay3,
  TextHeadline,
  TextLabel1,
  TextLabel2,
  TextTitle2,
} from '@cbhq/cds-web/typography';

import { BetaCell } from '../BetaCell';
import { SplitScreenStack } from '../SplitScreenStack';

type A11yData = {
  projectName: string;
  codeowner: string;
  a11yScore: number;
  automatedA11yScore: number;
  timestamp: string;
  totalNumberOfPassingAccessibilityTests: number;
  totalNumberOfComponentsWithTests: number;
  jestScore: number;
  filteredJestScore: number;
};

type ProjectCellProps = {
  score: A11yData;
  active: boolean;
  scores: A11yData[];
  setActiveComponent: (componentId: string) => void;
  setSelectedEntry: (entries: A11yData[]) => void;
};

type GroupedScoreByProjectEntry = {
  projectName: string;
  scores: A11yData[];
};

type SelectedEntryDetailsProps = {
  selectedEntry: A11yData[] | null;
};

/**
 * Utility function to return the latest a11y data entry for each group (codeowner)
 * @param scores A11yData[]
 * @returns A11yData[]
 */
function getLatestScores(scores: A11yData[]) {
  const sortedScores = scores.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const groupedByCodeowner = groupBy(sortedScores, 'codeowner');

  return Object.values(groupedByCodeowner).map((group) => {
    return group[0];
  });
}

/**
 * Utility function to group and sort scores by project
 * @param scores A11yData[]
 * @returns GroupedScoreByProjectEntry
 */
function groupScoresByProject(scores: A11yData[]): GroupedScoreByProjectEntry[] {
  const grouped = groupBy(scores, 'projectName');
  return Object.keys(grouped).map((projectName) => {
    // Sort scores within each group by automatedA11yScore, placing undefined or empty scores at the bottom
    const sortedScores = orderBy(
      grouped[projectName],
      [(score) => score.automatedA11yScore ?? -Infinity],
      ['desc'],
    );
    return {
      projectName,
      scores: sortedScores,
    };
  });
}

function formatCodeOwner(codeowner: string | undefined) {
  return codeowner || 'No codeowner - repo wide score';
}

function getPercentChange(scores: A11yData[]) {
  const current = scores[0].automatedA11yScore;
  const previous = scores[1].automatedA11yScore;
  const change = ((current - previous) / previous) * 100;
  return `${change.toFixed(2)}%`;
}

const ProjectTitle = ({
  projectName,
  averageScore,
}: {
  projectName: string;
  averageScore: number;
}) => {
  return (
    <VStack gap={1} spacingBottom={2}>
      <TextCaption as="span" color="foregroundMuted" id={projectName}>
        {projectName}
        <a className="hash-link" href={`#${projectName}`} title="Direct link to heading">
          &nbsp;
        </a>
      </TextCaption>
      <TextDisplay3 as="span">{`${averageScore.toFixed(2) || 0}%`}</TextDisplay3>
    </VStack>
  );
};

export const PercentDisplay = ({
  percentChange,
  entry,
}: {
  percentChange: string;
  entry: A11yData;
}) => {
  return (
    <HStack gap={1} justifyContent="space-between">
      <TextBody as="p"> {entry.automatedA11yScore}</TextBody>
      <TextBody as="p" color={percentChange.includes('-') ? 'negative' : 'positive'}>
        {percentChange.includes('-') ? `(${percentChange})` : `(+ ${percentChange})`}
      </TextBody>
    </HStack>
  );
};

export const ProjectCell = memo(
  ({ score, active, setActiveComponent, scores, setSelectedEntry }: ProjectCellProps) => {
    const componentId = `${score.codeowner}-${score.projectName}`;

    const start = (
      <VStack>
        <TextHeadline as="p" overflow="truncate">
          {formatCodeOwner(score.codeowner)}
        </TextHeadline>
      </VStack>
    );

    const end = (
      <VStack>
        <TextBody align="end" as="p" overflow="truncate">
          {`${score.automatedA11yScore ? score.automatedA11yScore : 0}`}
        </TextBody>
      </VStack>
    );

    const handlePress = useCallback(() => {
      const newActiveComponentId = active ? '' : componentId;
      setActiveComponent(newActiveComponentId);

      if (!active) {
        const matchingEntries = scores.filter(
          (s) => s.projectName === score.projectName && s.codeowner === score.codeowner,
        );
        setSelectedEntry(matchingEntries);
      } else {
        setSelectedEntry([]);
      }
    }, [
      active,
      componentId,
      setActiveComponent,
      scores,
      setSelectedEntry,
      score.projectName,
      score.codeowner,
    ]);

    return (
      <BetaCell
        key={`project-cell-${score.codeowner + score.projectName}`}
        end={end}
        endAccessory={<CellAccessory type={active ? 'selected' : 'arrow'} />}
        offsetHorizontal={1}
        onPress={handlePress}
        priority="end"
        start={start}
      />
    );
  },
);

export function createProjectCards(
  groupedScores: GroupedScoreByProjectEntry[],
  activeComponentId: string,
  setActiveComponentId: (componentId: string) => void,
  scores: A11yData[],
  setSelectedEntry: (entries: A11yData[]) => void,
) {
  // Sort groups by highest average automatedA11yScore, treating undefined or empty as 0
  const sortedGroups = orderBy(
    groupedScores,
    (group) => meanBy(group.scores, (score) => score.automatedA11yScore ?? 0),
    ['desc'],
  );

  return sortedGroups.map((group) => {
    const averageScore = meanBy(group.scores, (score) => score.automatedA11yScore ?? 0);
    return (
      <VStack key={group.projectName} gap={1} spacingBottom={5}>
        <ProjectTitle averageScore={averageScore} projectName={group.projectName} />
        {group.scores.map((score) => (
          <Box key={`${score.codeowner}-${score.projectName}`}>
            <ProjectCell
              active={activeComponentId === `${score.codeowner}-${score.projectName}`}
              score={score}
              scores={scores}
              setActiveComponent={setActiveComponentId}
              setSelectedEntry={setSelectedEntry}
            />
          </Box>
        ))}
      </VStack>
    );
  });
}

export const A11yStatsBreakdownCell = memo(
  ({ title, detail }: { title: string; detail: string | number }) => {
    return (
      <HStack gap={1} justifyContent="space-between" spacingTop={1}>
        <TextLabel1 as="p" overflow="truncate">
          {title}
        </TextLabel1>
        <TextLabel2 align="end" as="p">
          {`${detail}`}
        </TextLabel2>
      </HStack>
    );
  },
);

function formatTimestamp(timestamp: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
}

export const SelectedEntryDetails = ({ selectedEntry }: SelectedEntryDetailsProps) => {
  const [isCollapsed, { toggle: setIsCollapsed }] = useToggler(false);

  if (!selectedEntry || selectedEntry.length === 0) {
    return null;
  }
  const percentChange = getPercentChange(selectedEntry);

  const expandedDetailsNode = selectedEntry.map((entry, index) => (
    <Card
      background="backgroundAlternate"
      borderRadius="roundedLarge"
      offsetHorizontal={2}
      spacing={2}
    >
      <PressableOpacity>
        <HStack
          alignItems="center"
          borderRadius="roundedLarge"
          gap={2}
          justifyContent="space-between"
        >
          <TextBody as="p" overflow="truncate">
            {formatTimestamp(entry.timestamp)}
          </TextBody>
          {index === 0 ? (
            <PercentDisplay entry={entry} percentChange={percentChange} />
          ) : (
            <TextBody as="p"> {entry.automatedA11yScore}</TextBody>
          )}
        </HStack>
        <VStack key={entry.projectName + entry.codeowner} gap={2} spacingBottom={5}>
          <TextHeadline as="h3">{formatCodeOwner(entry.codeowner)}</TextHeadline>

          {/* Only show the details for the first entry or when not collapsed */}
          {(index === 0 || !isCollapsed) && (
            <VStack flexGrow={1} spacingTop={2} width="100%">
              <A11yStatsBreakdownCell detail={formatCodeOwner(entry.codeowner)} title="codeowner" />
              <A11yStatsBreakdownCell detail={entry.projectName} title="projectName" />
              <A11yStatsBreakdownCell detail={entry.a11yScore} title="a11yScore" />
              <A11yStatsBreakdownCell
                detail={entry.automatedA11yScore}
                title="automatedA11yScore"
              />

              <A11yStatsBreakdownCell
                detail={formatTimestamp(entry.timestamp)}
                title="  timestamp: string;
"
              />
              <A11yStatsBreakdownCell detail={entry.jestScore} title="jestScore" />
              <A11yStatsBreakdownCell detail={entry.filteredJestScore} title="filteredJestScore" />
              <A11yStatsBreakdownCell
                detail={entry.totalNumberOfPassingAccessibilityTests}
                title="totalNumberOfPassingAccessibilityTests"
              />
              <A11yStatsBreakdownCell
                detail={entry.totalNumberOfComponentsWithTests}
                title="totalNumberOfComponentsWithTests"
              />
            </VStack>
          )}
        </VStack>
      </PressableOpacity>
    </Card>
  ));

  return (
    <VStack gap={3}>
      <VStack gap={2} spacingTop={7} spacingVertical={2}>
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <TextDisplay3 as="h4">{selectedEntry[0].projectName}</TextDisplay3>
          <Pictogram name="analyticsNavigation" />
        </HStack>
        <TextBody as="p" color="foregroundMuted" spacingBottom={2}>
          You’re viewing accessibility metrics captured.
          <br />
          <br />
          Project: {selectedEntry[0].projectName}
          <br />
          codeowner: {formatCodeOwner(selectedEntry[0].codeowner)}
        </TextBody>
        <HStack gap={1}>
          <Button compact onPress={setIsCollapsed} variant="secondary">
            {isCollapsed ? 'Expand all' : 'Collapse all'}
          </Button>
        </HStack>
        {expandedDetailsNode}
      </VStack>
    </VStack>
  );
};

export const EmptySelectedEntry = () => {
  return (
    <VStack gap={3} spacingTop={7} spacingVertical={4}>
      <VStack alignItems="center" gap={2} spacingTop={7} spacingVertical={4}>
        <Pictogram name="analyticsNavigation" />
        <TextDisplay3 as="h4">No Entry Selected</TextDisplay3>
        <TextBody as="p" color="foregroundMuted" spacingBottom={2}>
          Click on an entry from the list on the left to view its detailed accessibility metrics.
        </TextBody>
      </VStack>
    </VStack>
  );
};

export const A11yScorecardsOverview = () => {
  const [scores, setScores] = useState<A11yData[] | null>(null);
  const [projectCards, setProjectCards] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeComponentId, setActiveComponentId] = useState<string>('');
  const [selectedEntry, setSelectedEntry] = useState<A11yData[]>([]);

  const fetchScores = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post<{ data: A11yData[] }>(
        'https://devx-tools-proxy.cbhq.net/coinbase.scorecards.ScorecardsService/GetUIScoreCardToDeployProduction',
        { headers: { 'Content-Type': 'application/json' } },
      );
      setScores(res.data.data);
      const sortedAndFilteredScores = getLatestScores(res.data.data);
      const groupedScores = groupScoresByProject(sortedAndFilteredScores);
      const newProjectCards = createProjectCards(
        groupedScores,
        activeComponentId,
        setActiveComponentId,
        scores || res.data.data,
        setSelectedEntry,
      );
      setProjectCards(newProjectCards);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching scores:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scores) {
      const sortedAndFilteredScores = getLatestScores(scores);
      const groupedScores = groupScoresByProject(sortedAndFilteredScores);
      const newProjectCards = createProjectCards(
        groupedScores,
        activeComponentId,
        setActiveComponentId,
        scores,
        setSelectedEntry,
      );
      setProjectCards(newProjectCards);
    }
  }, [scores, activeComponentId]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Spinner color="primary" size={5} />
      </div>
    );
  }

  const start = (
    <VStack gap={2} spacingEnd={3}>
      <VStack gap={2} spacingTop={7} spacingVertical={4}>
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <TextDisplay3 as="h2">a11y scores</TextDisplay3>
          <Pictogram name="congratulations" />
        </HStack>
        <TextBody as="p" color="foregroundMuted">
          To encourage more accessible components, we are tracking a11y scores for codeowners in
          product surfaces.
        </TextBody>
      </VStack>
      {projectCards}
    </VStack>
  );

  const end =
    selectedEntry && selectedEntry.length > 0 ? (
      <SelectedEntryDetails selectedEntry={selectedEntry} />
    ) : (
      <EmptySelectedEntry />
    );

  return (
    <ThemeProvider>
      <VStack alignItems="baseline" gap={5} maxWidth={900} spacingBottom={4}>
        <TextTitle2 as="span" color="foregroundMuted">
          Our Accessibility Tool allows us to view codeowner level insight into CDS adoption of
          accessibility at Coinbase.
        </TextTitle2>
      </VStack>
      <Divider direction="horizontal" />
      <SplitScreenStack end={end} start={start} />
    </ThemeProvider>
  );
};
