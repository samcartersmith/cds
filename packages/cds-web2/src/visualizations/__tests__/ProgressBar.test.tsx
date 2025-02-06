import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { UseCounterParams } from '@cbhq/cds-common2/visualizations/useCounter';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Box } from '../../layout/Box';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';

jest.mock('@cbhq/cds-common2/visualizations/useCounter', () => ({
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

let iter = 0;
describe('ProgressBar test', () => {
  beforeEach(() => {
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get() {
          iter += 1;
          if (iter % 2 === 0) {
            // text container
            return 20;
          }

          // whole container width
          return 200;
        },
      },
      offsetHeight: {
        get() {
          return 100;
        },
      },
    });
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(<ProgressBar accessibilityLabel="progressbar" progress={0} />),
    ).toHaveNoViolations();
  });

  it('places bar label in correct position if it flows off the left container', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={0} progress={0}>
          <ProgressBar progress={0} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId('cds-progress-bar-float-label')?.style.transform).toBeFalsy(),
    );

    expect(screen.getAllByText('0%')).toHaveLength(2);
  });

  it('places bar label in correct position in middle', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={50} progress={0.5}>
          <ProgressBar progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    // const floatLabel = screen.getByTestId('cds-progress-bar-float-label');

    // TODO: find why animations styles are not applied in tests
    // await waitFor(() => {
    //   expect(floatLabel).toHaveStyle({
    //     transform: 'translateX(80px) translateZ(0)',
    //   });
    // });

    const floatLabelText = screen.getAllByText('50%')[0];
    expect(floatLabelText.className).toContain('fgMuted');
  });

  it('renders fixed labels in correct position', () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels endLabel={50} labelPlacement="above" startLabel={0}>
          <ProgressBar progress={50} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('50%')[0];

    expect(startLabelText.className).toContain('fg');
    expect(endLabelText.className).toContain('fg');
  });

  it('has correct bar width', async () => {
    render(
      <Box width="200">
        <ProgressBar color="bgPositive" progress={0.77} />
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar-inner-bar');
    expect(bar.className).toContain('bgPositive');
    await waitFor(() => {
      expect(bar).toHaveStyle({
        transform: 'translateX(-23%) translateZ(0)',
      });
    });
  });

  it('has correct bar height', () => {
    render(
      <Box width="200">
        <ProgressBar progress={0.77} weight="heavy" />
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar-inner-bar-container');
    expect(bar).toHaveStyle({
      '--height': '12px',
    });
  });

  it('handles disabled state correctly', async () => {
    render(
      <Box width="200">
        <ProgressBarWithFixedLabels disabled endLabel={77} startLabel={0}>
          <ProgressBar disabled progress={0.77} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const bar = screen.getByTestId('cds-progress-bar-inner-bar');
    const startLabelText = screen.getAllByText('0%')[0];
    const endLabelText = screen.getAllByText('77%')[0];

    expect(bar.className).toContain('bgLineHeavy');
    await waitFor(() => {
      expect(bar).toHaveStyle({
        transform: 'translateX(-23%) translateZ(0)',
      });
    });

    expect(startLabelText.className).toContain('fg');
    expect(endLabelText.className).toContain('fg');
  });
});
