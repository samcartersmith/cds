import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { withTimeTravel } from '@cbhq/cds-common/jest/timeTravel';
import { getCircumference, getRadius } from '@cbhq/cds-common/utils/circle';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { palette } from '../../tokens';
import { ProgressCircle } from '../ProgressCircle';

jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
  const time = Date.now();
  cb(time);
  return time;
});
jest.mock('@cbhq/cds-common/visualizations/useCounter', () => ({
  useCounter: ({ endNum }: UseCounterParams) => endNum,
}));
jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      width: 200,
      height: 100,
      observe: jest.fn(),
    };
  }),
}));

describe('ProgressCircle tests', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<ProgressCircle progress={0} />)).toHaveNoViolations();
  });

  it('handles 0 percent', () => {
    const size = 100;
    render(<ProgressCircle progress={0} size={size} />);

    const circumference = getCircumference(getRadius(size, 4));
    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle).toHaveAttribute('stroke-dashoffset', `${circumference}`);

    expect(innerCircle).toHaveAttribute('stroke-dasharray', `${circumference}`);

    expect(innerCircle).toHaveAttribute('stroke', palette.primary);

    expect(screen.getAllByText('0%')).toHaveLength(2);
  });

  it('handles 50 percent', () => {
    withTimeTravel((timeTravel) => {
      const size = 100;
      render(<ProgressCircle progress={0.5} size={size} />);

      const circumference = getCircumference(getRadius(size, 4));
      const innerCircle = screen.getByTestId('cds-progress-circle-inner');
      expect(innerCircle).toBeTruthy();
      timeTravel(1000);
      expect(innerCircle).toHaveAttribute('stroke-dashoffset', `${circumference * 0.5}`);

      expect(innerCircle).toHaveAttribute('stroke-dasharray', `${circumference}`);

      expect(innerCircle).toHaveAttribute('stroke', palette.primary);

      expect(screen.getAllByText('50%')).toHaveLength(2);
    });
  });

  it('handles 100 percent', () => {
    withTimeTravel((timeTravel) => {
      const size = 100;
      render(<ProgressCircle progress={1} size={size} />);

      const circumference = getCircumference(getRadius(size, 4));
      const innerCircle = screen.getByTestId('cds-progress-circle-inner');
      expect(innerCircle).toBeTruthy();

      timeTravel(1000);
      expect(innerCircle).toHaveAttribute('stroke-dashoffset', '0');

      expect(innerCircle).toHaveAttribute('stroke-dasharray', `${circumference}`);

      expect(innerCircle).toHaveAttribute('stroke', palette.primary);

      expect(screen.getAllByText('100%')).toHaveLength(2);
    });
  });

  it('handles heavy weight', () => {
    const size = 100;
    render(<ProgressCircle progress={1} weight="heavy" size={size} />);

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toBeTruthy();
    expect(innerCircle).toHaveAttribute('stroke-width', '12');
  });

  it('handles no text', () => {
    const size = 100;
    render(<ProgressCircle progress={1} hideText size={size} />);

    expect(screen.queryAllByText('100%')).toHaveLength(0);
  });

  it('handles different color', () => {
    const size = 100;
    render(<ProgressCircle color="positive" progress={1} size={size} />);

    const innerCircle = screen.getByTestId('cds-progress-circle-inner');
    expect(innerCircle).toHaveAttribute('stroke', palette.positive);
  });
});
