import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, useSpring, useSprings } from '@react-spring/web';
import { Grid } from '@cbhq/cds-web2';

import {
  autoTransitionIntervalMs,
  characterSet,
  gridCellDistanceDelayMs,
  messagesCharSetIndices,
  numberOfColumns,
  numberOfRows,
} from './constants';
import { HeroCell } from './HeroCell';

const AnimatedHeroCell = animated(HeroCell);

/**
 * Returns a useSprings callback function used to animate the grid cells iterating through
 * characters in the characterSet. If the animation was triggered by a user click on the grid,
 * then the index of the clicked cell will also be passed and used to create an interactive
 * animation delay.
 */
const createGridCellSprings =
  (currentMessageIndex: number, clickedCellIndex?: number) => (springIndex: number) => {
    const message = messagesCharSetIndices[currentMessageIndex];
    const row = Math.floor(springIndex / numberOfColumns);
    const column = springIndex % numberOfColumns;
    const currentCharSetIndex = message[row][column];

    const nextMessageIndex = (currentMessageIndex + 1) % messagesCharSetIndices.length;
    const nextMessage = messagesCharSetIndices[nextMessageIndex];
    let nextCharSetIndex = nextMessage[row][column];

    // Ensure the animation always progresses "forward" in the characterSet
    if (currentCharSetIndex > nextCharSetIndex) nextCharSetIndex += characterSet.length;

    // Calculate delay based on distance from origin in the grid
    let delay = 0;

    // Calculate cell animation delay if the animation was triggered by a user click on a cell
    if (clickedCellIndex !== undefined) {
      const clickedRow = Math.floor(clickedCellIndex / numberOfColumns);
      const clickedColumn = clickedCellIndex % numberOfColumns;

      // Calculate Euclidean distance from clicked cell in the grid
      const deltaRow = row - clickedRow;
      const deltaColumn = column - clickedColumn;
      const gridDistance = Math.sqrt(deltaRow * deltaRow + deltaColumn * deltaColumn);
      delay = gridDistance * gridCellDistanceDelayMs;
    }

    // Character transition distance for step size calculation
    return {
      from: { charSetIndex: currentCharSetIndex },
      to: { charSetIndex: nextCharSetIndex },
      config: { round: 1, tension: 160, friction: 30 },
      delay,
    };
  };

/**
 * Returns a useSpring callback function used to animate a single cell iterating through
 * characters in the character set as a user hovers over it.
 */
const createHoverCellSpring = (currentMessageIndex: number, cellIndex: number) => () => {
  const row = Math.floor(cellIndex / numberOfColumns);
  const column = cellIndex % numberOfColumns;
  const currentCharSetIndex = messagesCharSetIndices[currentMessageIndex][row][column];

  const steps: { charSetIndex: number }[] = [];

  let i = 1;
  while (i < characterSet.length) {
    steps.push({ charSetIndex: currentCharSetIndex + i });
    i++;
  }

  return {
    from: { charSetIndex: currentCharSetIndex },
    to: steps,
    config: { tension: 600, friction: 12, mass: 0.1, round: 1 },
    loop: true,
  };
};

export const AnimatedHeroGrid = () => {
  const currentMessageIndex = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [gridCellSprings, gridCellSpringsRef] = useSprings(
    numberOfRows * numberOfColumns,
    createGridCellSprings(currentMessageIndex.current),
  );

  const [hoveredCellIndex, setHoveredCellIndex] = useState<number | null>(null);

  const [hoverCellSpring, hoverCellSpringRef] = useSpring(
    createHoverCellSpring(currentMessageIndex.current, hoveredCellIndex ?? 0),
  );

  const animateMessage = useCallback(
    async (clickedCellIndex?: number) => {
      currentMessageIndex.current =
        (currentMessageIndex.current + 1) % messagesCharSetIndices.length;
      return gridCellSpringsRef.start(
        createGridCellSprings(currentMessageIndex.current, clickedCellIndex),
      );
    },
    [gridCellSpringsRef],
  );

  const handleCellClick = useCallback(
    async (cellIndex: number) => {
      if (intervalRef.current) {
        // Stop the automatic message animation interval for now...
        clearInterval(intervalRef.current);
      }

      await animateMessage(cellIndex);
      // Resume the automatic message animation interval
      intervalRef.current = setInterval(animateMessage, autoTransitionIntervalMs);
    },
    [animateMessage],
  );

  const handleCellHoverStart = useCallback(
    (cellIndex: number) => {
      setHoveredCellIndex(cellIndex);
      void hoverCellSpringRef.start(createHoverCellSpring(currentMessageIndex.current, cellIndex));
    },
    [hoverCellSpringRef],
  );

  const handleCellHoverEnd = useCallback(() => {
    setHoveredCellIndex(null);
    void hoverCellSpringRef.stop();
  }, [hoverCellSpringRef]);

  useEffect(() => {
    // Start an interval for automatic message animation on mount
    intervalRef.current = setInterval(animateMessage, autoTransitionIntervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateMessage]);

  return (
    <Grid
      columnGap={{ base: 1, tablet: 0.75, phone: 0.5 }}
      columns={numberOfColumns}
      rowGap={{ base: 2, tablet: 1.5, phone: 0.75 }}
      rows={numberOfRows}
    >
      {gridCellSprings.map(({ charSetIndex }, cellIndex) => (
        <AnimatedHeroCell
          key={charSetIndex.id}
          cellIndex={cellIndex}
          charSetIndex={
            hoveredCellIndex === cellIndex ? hoverCellSpring.charSetIndex : charSetIndex
          }
          onClick={handleCellClick}
          onHoverEnd={handleCellHoverEnd}
          onHoverStart={handleCellHoverStart}
        />
      ))}
    </Grid>
  );
};
