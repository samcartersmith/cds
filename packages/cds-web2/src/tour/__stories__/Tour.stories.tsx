import React, { useCallback, useEffect, useState } from 'react';
import { ethBackground } from '@cbhq/cds-common2/internal/data/assets';
import { useTourContext } from '@cbhq/cds-common2/tour/TourContext';
import { type TourStepValue } from '@cbhq/cds-common2/tour/useTour';

import { Button } from '../../buttons';
import { Coachmark } from '../../coachmark/Coachmark';
import { Checkbox } from '../../controls/Checkbox';
import { HStack, VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { RemoteImage } from '../../media';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations';
import { Tour } from '../Tour';
import { TourStep } from '../TourStep';

export default {
  title: 'Core Components/Tour',
  component: Tour,
};

const TourExample = ({
  stagger,
  spacerWidthIncrement = 0,
  spacerHeightIncrement = 500,
}: {
  stagger?: boolean;
  spacerWidthIncrement?: number;
  spacerHeightIncrement?: number;
}) => {
  const { startTour } = useTourContext();

  const handleClick = useCallback(() => startTour(), [startTour]);

  return (
    <VStack flexGrow={1} gap={2} justifyContent="space-between">
      <Button onClick={handleClick}>Start tour</Button>
      <TourStep id="step1">
        <Box background="bgSecondary" padding={1}>
          <Text as="p" display="block" font="body">
            This is step 1
          </Text>
        </Box>
      </TourStep>
      <Box height={spacerHeightIncrement} />
      <HStack justifyContent={stagger ? 'flex-end' : undefined}>
        <Box flexShrink={0} width={spacerWidthIncrement} />
        <TourStep id="step2">
          <Box background="bgSecondary" padding={1} width={150}>
            <Text as="p" display="block" font="body">
              This is step 2
            </Text>
          </Box>
        </TourStep>
      </HStack>
      <Box height={spacerHeightIncrement * 2} />
      <HStack>
        <Box flexShrink={0} width={spacerWidthIncrement * 2} />
        <TourStep id="step3">
          <VStack background="bgSecondary" padding={1} width={150}>
            <Text as="p" display="block" font="body">
              This is step 3
            </Text>
          </VStack>
        </TourStep>
      </HStack>
      <Box height={spacerHeightIncrement * 3} />
      <HStack justifyContent={stagger ? 'flex-end' : undefined}>
        <Box flexShrink={0} width={spacerWidthIncrement * 3} />
        <TourStep id="step4">
          <VStack background="bgSecondary" padding={1} width={150}>
            <Text as="p" display="block" font="body">
              This is step 4
            </Text>
          </VStack>
        </TourStep>
      </HStack>
    </VStack>
  );
};

const StepOne = () => {
  const [checked, setChecked] = useState<boolean>();

  const { goNextTourStep, stopTour } = useTourContext();

  return (
    <Coachmark
      action={
        <Button compact onClick={goNextTourStep} variant="secondary">
          Next
        </Button>
      }
      checkbox={
        <Checkbox checked={checked} onChange={() => setChecked((s) => !s)}>
          Don&apos;t show again
        </Checkbox>
      }
      closeButtonAccessibilityLabel="Close"
      content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
      onClose={stopTour}
      title="My first step"
    />
  );
};

const StepTwo = () => {
  const { goNextTourStep, stopTour } = useTourContext();
  return (
    <Coachmark
      action={
        <Button compact onClick={goNextTourStep} variant="secondary">
          Next
        </Button>
      }
      closeButtonAccessibilityLabel="Close"
      content={
        <VStack gap={2}>
          <Text as="p" color="fgMuted" display="block" font="caption">
            50%
          </Text>
          <ProgressBar progress={0.5} />
          <Text as="p" display="block" font="body">
            Add up to 3 lines of body copy. Deliver your message with clarity and impact
          </Text>
        </VStack>
      }
      media={<RemoteImage height={150} source={ethBackground} width="100%" />}
      onClose={stopTour}
      title="My second step"
    />
  );
};

const StepThree = () => {
  const { stopTour, goNextTourStep, goPreviousTourStep } = useTourContext();
  return (
    <Coachmark
      action={
        <HStack gap={1}>
          <Button compact onClick={goPreviousTourStep} variant="secondary">
            Back
          </Button>
          <Button compact onClick={goNextTourStep} variant="secondary">
            Next
          </Button>
          <Button compact onClick={stopTour} variant="secondary">
            Done
          </Button>
        </HStack>
      }
      content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
      title="My third step"
      width={350}
    />
  );
};

const StepFour = () => {
  const { stopTour, goPreviousTourStep } = useTourContext();
  return (
    <Coachmark
      action={
        <HStack gap={1}>
          <Button compact onClick={goPreviousTourStep} variant="secondary">
            Back
          </Button>
          <Button compact onClick={stopTour} variant="secondary">
            Done
          </Button>
        </HStack>
      }
      content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
      title="My last step"
      width={350}
    />
  );
};

const tourSteps: TourStepValue[] = [
  {
    id: 'step1',
    onBeforeActive: () => console.log('step1 before'),
    Component: StepOne,
  },
  {
    id: 'step2',
    onBeforeActive: () => console.log('step2 before'),
    Component: StepTwo,
  },
  {
    id: 'step3',
    onBeforeActive: () => console.log('step3 before'),
    Component: StepThree,
  },
  {
    id: 'step4',
    onBeforeActive: () => console.log('step4 before'),
    Component: StepFour,
  },
];

export const TourDefault = () => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return (
    <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample stagger />
    </Tour>
  );
};

export const TourNoOverlay = () => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return (
    <Tour
      hideOverlay
      activeTourStep={activeTourStep}
      onChange={setActiveTourStep}
      steps={tourSteps}
    >
      <TourExample stagger />
    </Tour>
  );
};

export const TourDefaultActive = () => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  useEffect(() => setActiveTourStep(tourSteps[1]), []);
  return (
    <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample stagger />
    </Tour>
  );
};

export const TourHorizontalScroll = () => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return (
    <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample spacerHeightIncrement={0} spacerWidthIncrement={1000} />
    </Tour>
  );
};

export const TourMultiAxisScroll = () => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return (
    <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample spacerWidthIncrement={500} />
    </Tour>
  );
};
