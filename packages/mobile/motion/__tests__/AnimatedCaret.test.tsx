import { useCallback, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { withTimeTravel } from '@cbhq/cds-common/jest/timeTravel';

import { Button } from '../../buttons';
import { VStack } from '../../layout';
import { AnimatedCaret } from '../AnimatedCaret';

const rotates = [0, 90, 180, -90];
const MockAnimatedCaret = () => {
  const [rotateIndex, setRotateIndex] = useState(0);

  const handleRotate = useCallback(() => setRotateIndex((prevIndex) => prevIndex + 1), []);

  return (
    <VStack>
      <Button onPress={handleRotate} testID="mock-rotate-button">
        Rotate
      </Button>
      <AnimatedCaret rotate={rotates[rotateIndex]} testID="mock-animated-caret" />
    </VStack>
  );
};

describe('AnimatedCaret', () => {
  it('passes a11y', () => {
    render(<AnimatedCaret rotate={1} testID="mock-animated-caret" />);
    expect(screen.getByTestId('mock-animated-caret')).toBeAccessible();
  });

  it('rotates', () => {
    withTimeTravel((timeTravel) => {
      render(<MockAnimatedCaret />);

      for (let i = 0; i < rotates.length - 1; i += 1) {
        fireEvent.press(screen.getByTestId('mock-rotate-button'));
        act(() => timeTravel(500));
        expect(screen.getByTestId('mock-animated-caret').props.style.transform).toEqual([
          { rotate: `${rotates[i + 1]}deg` },
        ]);
      }
    });
  });
});
