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
};

export type ProjectCellProps = {
  score: A11yData;
  active: boolean;
  scores: A11yData[];
  setActiveComponent: (componentId: string) => void;
  setSelectedEntry: (entries: A11yData[]) => void;
  percentChange: string;
};

export type GroupedScoreByProjectEntry = {
  projectName: string;
  scores: A11yData[];
};

export type SelectedEntryDetailsProps = {
  selectedEntry: A11yData[] | null;
};
