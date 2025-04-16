import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Spinner } from '@cbhq/cds-web/loaders';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { TextBody, TextDisplay3, TextTitle2 } from '@cbhq/cds-web/typography';

import { SplitScreenStack } from '../SplitScreenStack';

import { EmptySelectedEntry } from './EmptySelectedEntry';
import { ProjectCards } from './ProjectCards';
import { SelectedEntryDetails } from './SelectedEntryDetails';
import { A11yData } from './types';
import { getLatestScores, groupAndSortScoresByProject } from './utils';

export const A11yScorecardsOverview = () => {
  const [scores, setScores] = useState<A11yData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<A11yData[]>([]);

  const fetchScores = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post<{ data: A11yData[] }>(
        'https://devx-tools-proxy.cbhq.net/coinbase.scorecards.ScorecardsService/GetUIScoreCardToDeployProduction',
        { headers: { 'Content-Type': 'application/json' } },
      );
      setScores(res.data.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchScores();
  }, []);

  if (isLoading || !scores) {
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

  const sortedAndFilteredScores = getLatestScores(scores);
  const groupedScores = groupAndSortScoresByProject(sortedAndFilteredScores);

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
      <ProjectCards
        groupedScores={groupedScores}
        scores={scores}
        setSelectedEntry={setSelectedEntry}
      />
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
