import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

import { A11yData, GroupedScoreByProjectEntry } from './types';

/**
 * Utility function to return the latest a11y data entry for each group (codeowner)
 * @param scores A11yData[]
 * @returns A11yData[]
 */
export function getLatestScores(scores: A11yData[]) {
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
export function groupScoresByProject(scores: A11yData[]): GroupedScoreByProjectEntry[] {
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

export function formatCodeOwner(codeowner: string | undefined) {
  return codeowner || 'No codeowner - repo wide score';
}

export function getPercentChange(scores: A11yData[]) {
  const current = scores[0] ? scores[0].automatedA11yScore : 0;
  const previous = scores[1] ? scores[1].automatedA11yScore : 0;
  let change = ((current - previous) / previous) * 100;

  // Check if change is a valid number
  if (Number.isNaN(change)) {
    change = 0;
  }
  return `${change.toFixed(2)}%`;
}

export function formatTimestamp(timestamp: string) {
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

export function formatDate(timestamp: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
}

export const groupAndFilterEntries = (entries: A11yData[]) => {
  const groupedByDate = groupBy(entries, (entry) => formatDate(entry.timestamp));
  return map(
    groupedByDate,
    (group) => orderBy(group, [(entry) => new Date(entry.timestamp)], ['desc'])[0],
  );
};
