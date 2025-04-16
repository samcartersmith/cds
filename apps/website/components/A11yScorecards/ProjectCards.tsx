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
    const scoresWithA11yData = group.scores.filter(
      (score) =>
        Object.keys(score).includes('a11yScore') &&
        Object.keys(score).includes('totalNumberOfPassingAccessibilityTests') &&
        Object.keys(score).includes('automatedA11yScore'),
    );
    const averageScore = meanBy(scoresWithA11yData, (score) => score.automatedA11yScore ?? 0);
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
