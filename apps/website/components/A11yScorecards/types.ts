export type A11yData = {
  projectName: string;
  codeowner: string;
  a11yScore: number;
  automatedA11yScore: number;
  timestamp: string;
  totalNumberOfPassingAccessibilityTests: number;
  totalNumberOfComponentsWithTests: number;
  jestScore: number;
  filteredJestScore: number;
  platformType: string;
};

export type ProjectCellProps = {
  score: A11yData;
  active: boolean;

  percentChange: string;
  onPress: () => void;
};

export type GroupedScoreByProjectEntry = {
  projectName: string;
  scores: A11yData[];
  platformType: string;
};

export type SelectedEntryDetailsProps = {
  selectedEntry: A11yData[] | null;
};
