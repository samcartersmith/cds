import { useCallback, useEffect, useState } from 'react';
import { Button } from '@cbhq/cds-web/buttons';
import { Card } from '@cbhq/cds-web/cards';
import { Pictogram } from '@cbhq/cds-web/illustrations';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { PressableOpacity } from '@cbhq/cds-web/system';
import { TextBody, TextCaption, TextDisplay3, TextHeadline } from '@cbhq/cds-web/typography';

import { A11yStatsBreakdownCell } from './A11yStatsBreakdownCell';
import { PercentDisplayWithA11yScore } from './PercentDisplay';
import { SelectedEntryDetailsProps } from './types';
import {
  a11yProjectNameMap,
  formatCodeOwner,
  formatTimestamp,
  getPercentChange,
  getUniqueA11yValuesByDate,
} from './utils';

export const SelectedEntryDetails = ({ selectedEntry }: SelectedEntryDetailsProps) => {
  const [collapsedStates, setCollapsedStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (selectedEntry && selectedEntry.length > 0) {
      const initialStates: { [key: string]: boolean } = {};
      selectedEntry.forEach((entry, index) => {
        const key = entry.projectName + entry.codeowner + index;
        initialStates[key] = index !== 0; // Collapse all except the first one
      });
      setCollapsedStates(initialStates);
    }
  }, [selectedEntry]);

  const toggleCollapse = (key: string) => {
    setCollapsedStates((prevStates: { [key: string]: boolean }) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  };

  const handlePress = (key: string) => {
    return () => {
      toggleCollapse(key);
    };
  };

  const toggleAllCollapse = () => {
    setCollapsedStates((prevStates) => {
      const allCollapsed = Object.values(prevStates).every((state) => state);
      return Object.fromEntries(Object.keys(prevStates).map((key) => [key, !allCollapsed]));
    });
  };

  const handleToggleAllCollapse = useCallback(() => {
    toggleAllCollapse();
  }, []);

  // Determine if all are collapsed for button text
  const allCollapsed = Object.values(collapsedStates).every((state) => state);

  if (!selectedEntry || selectedEntry.length === 0) {
    return null;
  }

  const readableProjectName =
    a11yProjectNameMap[selectedEntry[0].projectName] || selectedEntry[0].projectName;

  const filteredEntries = getUniqueA11yValuesByDate(selectedEntry);
  const percentChange = getPercentChange(filteredEntries);

  const expandedDetailsNode = filteredEntries.map((entry, index) => {
    const key = entry.projectName + entry.codeowner + index;

    return (
      <Card
        background="backgroundAlternate"
        borderRadius="roundedLarge"
        offsetHorizontal={2}
        spacing={2}
      >
        <PressableOpacity id={key + entry.timestamp} onPress={handlePress(key)}>
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
              <PercentDisplayWithA11yScore entry={entry} percentChange={percentChange} />
            ) : (
              <TextBody as="p"> {entry.automatedA11yScore}</TextBody>
            )}
          </HStack>
          <VStack key={entry.projectName + entry.codeowner} gap={2} spacingBottom={5}>
            <TextHeadline as="h3">{formatCodeOwner(entry.codeowner)}</TextHeadline>

            {/* Only show the details for the first entry or when not collapsed */}
            {(index === 0 || !collapsedStates[key]) && (
              <VStack flexGrow={1} spacingTop={2} width="100%">
                <A11yStatsBreakdownCell
                  detail={formatCodeOwner(entry.codeowner)}
                  title="codeowner"
                />
                <A11yStatsBreakdownCell detail={entry.projectName} title="projectName" />
                <A11yStatsBreakdownCell detail={entry.a11yScore} title="a11yScore" />
                <A11yStatsBreakdownCell
                  detail={entry.automatedA11yScore}
                  title="automatedA11yScore"
                />
                <A11yStatsBreakdownCell
                  detail={formatTimestamp(entry.timestamp)}
                  title="timestamp"
                />
                <A11yStatsBreakdownCell detail={entry.jestScore} title="jestScore" />
                <A11yStatsBreakdownCell
                  detail={entry.filteredJestScore}
                  title="filteredJestScore"
                />
                <A11yStatsBreakdownCell
                  detail={entry.totalNumberOfPassingAccessibilityTests}
                  title="totalNumberOfPassingAccessibilityTests"
                />
                <A11yStatsBreakdownCell
                  detail={entry.totalNumberOfComponentsWithTests}
                  title="totalNumberOfComponentsWithTests"
                />
                <A11yStatsBreakdownCell detail={entry.platformType} title="platform" />
              </VStack>
            )}
          </VStack>
        </PressableOpacity>
      </Card>
    );
  });

  return (
    <VStack gap={3}>
      <VStack gap={2} spacingTop={7} spacingVertical={2}>
        <HStack alignItems="center" gap={2} justifyContent="space-between">
          <TextDisplay3 as="h4">{readableProjectName}</TextDisplay3>
          <Pictogram name="analyticsNavigation" />
        </HStack>
        <TextCaption as="h1">{formatCodeOwner(selectedEntry[0].codeowner)}</TextCaption>
        <TextBody as="p" color="foregroundMuted" spacingBottom={2}>
          You’re viewing accessibility metrics captured for {selectedEntry[0].projectName}
        </TextBody>
        <HStack gap={1}>
          <Button compact onPress={handleToggleAllCollapse} variant="primary">
            {allCollapsed ? 'Expand all' : 'Collapse all'}
          </Button>
        </HStack>
        {expandedDetailsNode}
      </VStack>
    </VStack>
  );
};
