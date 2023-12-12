import { useEffect, useState } from 'react';
import axios from 'axios';
import meanBy from 'lodash/meanBy';
import orderBy from 'lodash/orderBy';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextBody, TextDisplay3, TextTitle2 } from '@cbhq/cds-web/typography';

import { SplitScreenStack } from '../SplitScreenStack';

import { EmptySelectedEntry } from './EmptySelectedEntry';
import { ProjectCell } from './Projectcell';
import { ProjectTitle } from './ProjectTitle';
import { SelectedEntryDetails } from './SelectedEntryDetails';
import { A11yData, GroupedScoreByProjectEntry } from './types';
import {
  getLatestScores,
  getPercentChange,
  groupAndFilterEntries,
  groupScoresByProject,
} from './utils';

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
        {group.scores.map((score) => {
          // Filter entries to only include the current card's entries in order to get percent change
          const currentCardEntryScores = groupAndFilterEntries(
            scores.filter(
              (s) => s.projectName === score.projectName && s.codeowner === score.codeowner,
            ),
          );
          const percentChange = getPercentChange(currentCardEntryScores);
          return (
            <Box key={`${score.codeowner}-${score.projectName}`}>
              <ProjectCell
                active={activeComponentId === `${score.codeowner}-${score.projectName}`}
                percentChange={percentChange}
                score={score}
                scores={scores}
                setActiveComponent={setActiveComponentId}
                setSelectedEntry={setSelectedEntry}
              />
            </Box>
          );
        })}
      </VStack>
    );
  });
}

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
