import { renderA11y } from '@cbhq/jest-utils';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { UseCounterParams } from '@cbhq/cds-common/visualizations/useCounter';
import { ProgressBar } from '../ProgressBar';
import { Box } from '../../layout';
import { palette } from '../../tokens';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';

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
    expect(await renderA11y(<ProgressBar progress={0} />)).toHaveNoViolations();
  });

  it('places bar label in correct position if it flows off the left container', () => {
    const { getByTestId, getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={0} progress={0}>
          <ProgressBar progress={0} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const floatLabel = getByTestId('cds-progress-bar-float-label');

    expect(floatLabel).toHaveStyle({
      transform: 'translateX(0px)',
    });

    expect(getAllByText('0%')).toHaveLength(2);
  });

  it('places bar label in correct position in middle', () => {
    const { getByTestId, getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFloatLabel label={50} progress={0.5}>
          <ProgressBar progress={0.5} />
        </ProgressBarWithFloatLabel>
      </Box>,
    );

    const floatLabel = getByTestId('cds-progress-bar-float-label');

    expect(floatLabel).toHaveStyle({
      transform: 'translateX(80px)',
    });

    const floatLabelText = getAllByText('50%')[0];
    expect(floatLabelText).toHaveStyle({
      color: palette.foregroundMuted,
    });
  });

  it('renders fixed labels in correct position', () => {
    const { getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFixedLabels startLabel={0} endLabel={50} labelPlacement="above">
          <ProgressBar progress={50} />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const startLabelText = getAllByText('0%')[0];
    const endLabelText = getAllByText('50%')[0];

    expect(startLabelText).toHaveStyle({
      color: palette.foreground,
    });
    expect(endLabelText).toHaveStyle({
      color: palette.foreground,
    });
  });

  it('has correct bar width', () => {
    const { getByTestId } = render(
      <Box width="200">
        <ProgressBar progress={0.77} color="positive" />
      </Box>,
    );

    const bar = getByTestId('cds-progress-bar-inner-bar');
    expect(bar).toHaveStyle({
      backgroundColor: palette.positive,
      transform: 'translateX(-23%)',
    });
  });

  it('has correct bar height', () => {
    const { getByTestId } = render(
      <Box width="200">
        <ProgressBar progress={0.77} weight="heavy" />
      </Box>,
    );

    const bar = getByTestId('cds-progress-bar-inner-bar-container');
    expect(bar).toHaveStyle({
      height: '12px',
    });
  });

  it('handles disabled state correctly', () => {
    const { getByTestId, getAllByText } = render(
      <Box width="200">
        <ProgressBarWithFixedLabels startLabel={0} endLabel={77} disabled>
          <ProgressBar progress={0.77} disabled />
        </ProgressBarWithFixedLabels>
      </Box>,
    );

    const bar = getByTestId('cds-progress-bar-inner-bar');
    const startLabelText = getAllByText('0%')[0];
    const endLabelText = getAllByText('77%')[0];

    expect(bar).toHaveStyle({
      backgroundColor: palette.lineHeavy,
      transform: 'translateX(-23%)',
    });

    expect(startLabelText).toHaveStyle({
      color: palette.foreground,
    });
    expect(endLabelText).toHaveStyle({
      color: palette.foreground,
    });
  });
});
