import { useState } from 'react';
import { Box, VStack } from '@cbhq/cds-web/layout';

import { ProjectCell } from './A11yScorecards/Projectcell';
import { ProjectTitle } from './A11yScorecards/ProjectTitle';
import { A11yData, GroupedScoreByProjectEntry } from './A11yScorecards/types';
import { getPercentChange, getUniqueA11yValuesByDate } from './A11yScorecards/utils';

export const ProjectGroup = ({
  group,
  averageScore,
  readableProjectName,
  setSelectedEntry,
  scores,
}: {
  group: GroupedScoreByProjectEntry;
  averageScore: number;
  readableProjectName: string;
  setSelectedEntry: (entries: A11yData[]) => void;
  scores: A11yData[];
}) => {
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);

  const projectCells = group.scores.map((score) => {
    const matchingEntries = scores.filter(
      (s) => s.projectName === score.projectName && s.codeowner === score.codeowner,
    );

    // Filter entries to only include the current card's entries in order to get percent change
    const currentCardEntryScores = getUniqueA11yValuesByDate(matchingEntries);

    const percentChange = getPercentChange(currentCardEntryScores);
    const componentId = `${score.codeowner || 'undefined'}-${score.projectName}`;
    const active = activeComponentId === componentId;

    // refactor into separate component
    const handlePress = () => {
      setActiveComponentId(active ? null : componentId);
      setSelectedEntry(matchingEntries);
    };

    return (
      <Box key={componentId}>
        <ProjectCell
          active={active}
          onPress={handlePress}
          percentChange={percentChange}
          score={score}
        />
      </Box>
    );
  });

  return (
    <VStack key={group.projectName} gap={1} spacingBottom={5}>
      <ProjectTitle
        averageScore={averageScore}
        platformType={group.platformType || ''}
        projectName={readableProjectName}
      />
      {projectCells}
    </VStack>
  );
};
