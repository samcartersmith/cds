import { memo, useCallback } from 'react';
import { CellAccessory } from '@cbhq/cds-web/cells/CellAccessory';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextHeadline } from '@cbhq/cds-web/typography';

import { BetaCell } from '../BetaCell';

import { PercentDisplayOnly } from './PercentDisplay';
import { ProjectCellProps } from './types';
import { formatCodeOwner } from './utils';

export const ProjectCell = memo(
  ({
    score,
    active,
    setActiveComponent,
    scores,
    setSelectedEntry,
    percentChange,
  }: ProjectCellProps) => {
    const componentId = `${score.codeowner}-${score.projectName}`;

    const start = (
      <VStack>
        <TextHeadline as="p" overflow="truncate">
          {formatCodeOwner(score.codeowner)}
        </TextHeadline>
      </VStack>
    );

    const end = (
      <VStack>
        <TextBody align="end" as="p" overflow="truncate">
          {`${score.automatedA11yScore ? score.automatedA11yScore : 0}`}
        </TextBody>
        <PercentDisplayOnly percentChange={percentChange} />
      </VStack>
    );

    const handlePress = useCallback(() => {
      const newActiveComponentId = active ? '' : componentId;
      setActiveComponent(newActiveComponentId);

      if (!active) {
        const matchingEntries = scores.filter(
          (s) => s.projectName === score.projectName && s.codeowner === score.codeowner,
        );
        setSelectedEntry(matchingEntries);
      } else {
        setSelectedEntry([]);
      }
    }, [
      active,
      componentId,
      setActiveComponent,
      scores,
      setSelectedEntry,
      score.projectName,
      score.codeowner,
    ]);

    return (
      <BetaCell
        key={`project-cell-${score.codeowner + score.projectName}`}
        end={end}
        endAccessory={<CellAccessory type={active ? 'selected' : 'arrow'} />}
        offsetHorizontal={1}
        onPress={handlePress}
        priority="end"
        start={start}
      />
    );
  },
);
