import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useTourContext } from '@cbhq/cds-common/tour/TourContext';
import { renderA11y } from '@cbhq/cds-web-utils';

import { Tour, type TourProps } from '../Tour';

const StepOne = () => {
  const { goNextTourStep } = useTourContext();

  return (
    <div>
      <h3>Step 1</h3>
      <button onClick={goNextTourStep} type="button">
        Next
      </button>
    </div>
  );
};

const mockTour = [
  {
    id: 'step1',
    Component: StepOne,
  },
  {
    id: 'step2',
    Component: () => (
      <div>
        <h3>Step 2</h3>
        <button type="button">Next</button>
      </div>
    ),
  },
  {
    id: 'step3',
    Component: () => (
      <div>
        <h3>Step 3</h3>
        <button type="button">Next</button>
      </div>
    ),
  },
];

const exampleProps: TourProps = {
  steps: mockTour,
  activeTourStep: mockTour[0],
  onChange: jest.fn(),
  accessibilityLabel: 'tour modal',
};

describe('Tour', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Tour {...exampleProps} />)).toHaveNoViolations();
  });

  it('renders the active tour step', () => {
    render(<Tour {...exampleProps} />);

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByTestId('tour-step-arrow')).toBeInTheDocument();
  });

  it('calls onChange when changing steps', async () => {
    const onChange = jest.fn();
    render(<Tour {...exampleProps} onChange={onChange} />);

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('sets tour inactive when activeTourStep is null', () => {
    render(<Tour {...exampleProps} activeTourStep={null} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('sets the second tour step active when activeTourStep is second step', () => {
    render(<Tour {...exampleProps} activeTourStep={mockTour[1]} />);

    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });
});
