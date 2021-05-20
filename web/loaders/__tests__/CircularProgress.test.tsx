import { render, waitFor } from '@testing-library/react';
import { renderA11y } from '@utils/jest/renderA11y';

import { CircularProgress } from '../CircularProgress';

const testVals: { [index: string]: number } = {
  strokeWidth: 4,
  radius: 30,
  progress: 30,
};

const newTestVals: { [index: string]: number } = {
  strokeWidth: 6,
  radius: 40,
  progress: 80,
};

const normalizeRadius = (radius: number, strokeWidth: number): string => {
  return (radius - strokeWidth * 2).toString();
};

describe('CircularProgress', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <CircularProgress
          strokeWidth={testVals['strokeWidth']}
          radius={testVals['radius']}
          progress={testVals['progress']}
        />
      )
    ).toHaveNoViolations();
  });

  it('should render with a svg element', async () => {
    const { findByTestId } = render(
      <CircularProgress
        strokeWidth={testVals['strokeWidth']}
        radius={testVals['radius']}
        progress={testVals['progress']}
        testID="circular-progress-svg"
      />
    );

    const circularProgressNode = await findByTestId('circular-progress-svg');
    expect(circularProgressNode).toBeTruthy();
  });

  it('radius and strokeWidths props are correctly assigned', async () => {
    const { getByTestId } = render(
      <CircularProgress
        strokeWidth={testVals['strokeWidth']}
        radius={testVals['radius']}
        progress={testVals['progress']}
        testID="circular-progress-svg"
      />
    );

    await waitFor(() => getByTestId('circular-progress-svg'));
    expect(getByTestId('circular-progress-svg').lastChild).toHaveAttribute(
      'stroke-width',
      testVals['strokeWidth'].toString()
    );
    expect(getByTestId('circular-progress-svg').lastChild).toHaveAttribute(
      'r',
      normalizeRadius(testVals['radius'], testVals['strokeWidth'])
    );
  });

  it('calling render with the same component on the same container does not remount', async () => {
    const { getByTestId, rerender } = render(
      <CircularProgress
        strokeWidth={testVals['strokeWidth']}
        radius={testVals['radius']}
        progress={testVals['progress']}
        testID="circular-progress-svg"
      />
    );

    await waitFor(() => getByTestId('circular-progress-svg'));

    rerender(
      <CircularProgress
        strokeWidth={newTestVals['strokeWidth']}
        radius={newTestVals['radius']}
        progress={newTestVals['progress']}
        testID="circular-progress-svg"
      />
    );

    expect(getByTestId('circular-progress-svg').lastChild).toHaveAttribute(
      'stroke-width',
      newTestVals['strokeWidth'].toString()
    );
    expect(getByTestId('circular-progress-svg').lastChild).toHaveAttribute(
      'r',
      normalizeRadius(newTestVals['radius'], newTestVals['strokeWidth'])
    );
  });
});
