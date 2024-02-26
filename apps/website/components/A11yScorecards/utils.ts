import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/orderBy';

import { A11yData, GroupedScoreByProjectEntry } from './types';

/**
 * Maps the technical project name in snowflake to a more readable name
 */
export const a11yProjectNameMap: { [key: string]: string } = {
  consumer_app: 'Consumer (Mobile)',
  consumer_onboarding: 'Consumer Onboarding (Mobile)',
  wallet_app_ext: 'Wallet Extension (Web)',
  'retail-web': 'Retail Web',
  wallet_app: 'Wallet Mobile',
  cds_mobile: 'CDS Mobile',
  cds_web: 'CDS Web',
};

/**
 * Utility function to return the latest a11y data entry for each group (codeowner)
 * @param scores A11yData[]
 * @returns A11yData[]
 */
export function getLatestScores(scores: A11yData[]) {
  const sortedScores = sortBy(scores, (score) => -new Date(score.timestamp).getTime());

  // Group by a composite key of codeowner and projectName
  // Group entries without a codeowner by projectName
  const groupedByCompositeKey = groupBy(
    sortedScores,
    (score) => `${score.codeowner || 'no-codeowner'}:${score.projectName}`,
  );

  const latestScores = Object.values(groupedByCompositeKey).map((groups) => groups[0]);
  return latestScores;
}
/**
 * Utility function to group and sort scores by project
 * @param scores A11yData[]
 * @returns GroupedScoreByProjectEntry
 */
export function groupScoresByProject(scores: A11yData[]): GroupedScoreByProjectEntry[] {
  const grouped = groupBy(scores, 'projectName');
  return Object.keys(grouped).map((projectName) => {
    const projectScores = grouped[projectName];

    // Sort scores within each group by automatedA11yScore, placing undefined or empty scores at the bottom
    const sortedScores = orderBy(
      grouped[projectName],
      [(score) => score.automatedA11yScore ?? -Infinity],
      ['desc'],
    );

    const platformType = projectScores[0]?.platformType || '';
    return {
      projectName,
      scores: sortedScores,
      platformType,
    };
  });
}

export function formatCodeOwner(codeowner: string | undefined) {
  return codeowner || 'No CODEOWNER (repo wide)';
}

export function getPercentChange(scores: A11yData[]): string {
  if (scores.length === 0) return '0.00%'; // Return 0% if no scores

  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

  const current = scores[0]?.automatedA11yScore || 0;

  // Default previousScore to the earliest score if no match found
  let previousScore = scores[scores.length - 1]?.automatedA11yScore || 0;

  // Iterate through the scores to find the one closest to a month ago
  for (const score of scores) {
    const scoreDate = new Date(score.timestamp);
    if (scoreDate < oneMonthAgo) {
      // As soon as a score is older than a month, use it and stop searching
      previousScore = score.automatedA11yScore;
      break;
    }
  }

  // Calculate the percentage change
  let change =
    current - previousScore !== 0 ? ((current - previousScore) / previousScore) * 100 : 0;

  // Check if change is a valid number, reset to 0 if not
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

export const getUniqueA11yValuesByDate = (a11yValues: A11yData[]): A11yData[] => {
  const uniqueValues = a11yValues.reduce<{ [date: string]: A11yData }>((acc, currentValue) => {
    const date = currentValue.timestamp.substring(0, 10);
    if (!acc[date]) {
      acc[date] = currentValue;
    }

    return acc;
  }, {});

  const results = Object.values(uniqueValues);

  return results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
