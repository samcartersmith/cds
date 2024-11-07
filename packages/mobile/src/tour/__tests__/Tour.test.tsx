import React from 'react';
import { Button, Text } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { useTourContext } from '@cbhq/cds-common/tour/TourContext';

import { type TourProps, Tour } from '../Tour';

const StepOne = () => {
  const { goNextTourStep } = useTourContext();

  return (
    <>
      <Text>Step 1</Text>
      <Button onPress={goNextTourStep} title="Next" />
    </>
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
      <>
        <Text>Step 2</Text>
        <Button title="Next" />
      </>
    ),
  },
  {
    id: 'step3',
    Component: () => (
      <>
        <Text>Step 3</Text>
        <Button title="Next" />
      </>
    ),
  },
];

const exampleProps: TourProps = {
  steps: mockTour,
  activeTourStep: mockTour[0],
  onChange: jest.fn(),
  accessibilityLabel: 'tour modal',
  testID: 'tour-test',
};

describe('Tour', () => {
  it('passes accessibility', async () => {
    render(<Tour {...exampleProps} />);
    expect(screen.getByTestId('tour-test')).toBeAccessible();
  });

  it('renders the active tour step', () => {
    render(<Tour {...exampleProps} />);

    expect(screen.getByText('Step 1')).toBeTruthy();
    expect(screen.getByTestId('tour-step-arrow')).toBeTruthy();
  });

  it('calls onChange when changing steps', async () => {
    const onChange = jest.fn();
    render(<Tour {...exampleProps} onChange={onChange} />);

    fireEvent.press(screen.getByText('Next'));

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('sets tour inactive when activeTourStep is null', () => {
    render(<Tour {...exampleProps} activeTourStep={null} />);

    expect(screen.queryByRole('dialog')).not.toBeTruthy();
  });

  it('sets the second tour step active when activeTourStep is second step', () => {
    render(<Tour {...exampleProps} activeTourStep={mockTour[1]} />);

    expect(screen.getByText('Step 2')).toBeTruthy();
  });
});
