import { useCallback, useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
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
      <Button onPress={handleRotate}>Rotate</Button>
      <AnimatedCaret rotate={rotates[rotateIndex]} size="l" testID="mock-animated-caret" />
    </VStack>
  );
};

describe('AnimatedCaret', () => {
  it('rotates', () => {
    withTimeTravel((timeTravel) => {
      const { getByTestId, getByText } = render(<MockAnimatedCaret />);

      for (let i = 0; i < rotates.length - 1; i += 1) {
        fireEvent.click(getByText('Rotate'));
        timeTravel(500);

        expect(getByTestId('mock-animated-caret-motion')).toHaveStyle({
          transform: `rotate(${rotates[i + 1]}deg) translateZ(0)`,
        });
      }
    });
  });
});
