import { useMemo } from 'react';
import { meanBy, orderBy } from 'lodash';
import { VStack } from '@cbhq/cds-web/layout';

import { ProjectGroup } from '../ProjectGroup';

import { A11yData, GroupedScoreByProjectEntry } from './types';
import { a11yProjectNameMap } from './utils';

export const ProjectCards = ({
  groupedScores,
  scores,
  setSelectedEntry,
}: {
  groupedScores: GroupedScoreByProjectEntry[];
  scores: A11yData[];
  setSelectedEntry: (entries: A11yData[]) => void;
}) => {
  // Sort groups by highest average automatedA11yScore, treating undefined or empty as 0
  const sortedGroups = useMemo(
    () =>
      orderBy(
        groupedScores,
        (group) => meanBy(group.scores, (score) => score.automatedA11yScore ?? 0),
        ['desc'],
      ),
    [groupedScores],
  );

  const projectGroups = sortedGroups.map((group) => {
    // In Go, zero values are not included in the JSON response, so we need to add them back in
    const normalizedScores = group.scores.map((score) => {
      return {
        ...score,
        a11yScore: score.a11yScore ?? 0,
        totalNumberOfPassingAccessibilityTests: score.totalNumberOfPassingAccessibilityTests ?? 0,
        automatedA11yScore: score.automatedA11yScore ?? 0,
      };
    });
    const averageScore = meanBy(normalizedScores, (score) => score.automatedA11yScore ?? 0);
    const readableProjectName = a11yProjectNameMap[group.projectName] || group.projectName;

    return (
      <ProjectGroup
        averageScore={averageScore}
        group={group}
        readableProjectName={readableProjectName}
        scores={scores}
        setSelectedEntry={setSelectedEntry}
      />
    );
  });

  return <VStack>{projectGroups}</VStack>;
};
