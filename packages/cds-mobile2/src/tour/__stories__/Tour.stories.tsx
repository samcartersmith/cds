/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Button as NativeButton, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ethBackground } from '@cbhq/cds-common2/internal/data/assets';
import { useTourContext } from '@cbhq/cds-common2/tour/TourContext';
import { TourStepValue } from '@cbhq/cds-common2/tour/useTour';

import { Button } from '../../buttons';
import { Coachmark } from '../../coachmark/Coachmark';
import { Checkbox } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations';
import { Tour } from '../Tour';
import { TourStep } from '../TourStep';

const TourExamples = ({
  step2Ref,
  step3Ref,
  step4Ref,
}: {
  step2Ref: React.RefObject<View>;
  step3Ref: React.RefObject<View>;
  step4Ref: React.RefObject<View>;
}) => {
  const { startTour } = useTourContext();
  const handleClick = useCallback(() => startTour(), [startTour]);

  return (
    <VStack flexGrow={1} gap={2} justifyContent="space-between">
      <NativeButton onPress={handleClick} title="Start tour" />
      <TourStep id="step1">
        <VStack background="bgSecondary" padding={1}>
          <Text>Checkout the first step</Text>
        </VStack>
      </TourStep>
      <Box height={300} />
      <TourStep id="step2">
        <Box ref={step2Ref} background="bgSecondary" padding={1} width={150}>
          <Text>Checkout the next step</Text>
        </Box>
      </TourStep>
      <Box height={1000} />
      <TourStep id="step3">
        <VStack ref={step3Ref} background="bgSecondary" padding={1} width={150}>
          <Text>Checkout the third step</Text>
        </VStack>
      </TourStep>
      <Box height={3000} />
      <TourStep id="step4">
        <VStack ref={step4Ref} background="bgSecondary" padding={1} width={150}>
          <Text>Checkout the last step</Text>
        </VStack>
      </TourStep>
    </VStack>
  );
};

const StepOne = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = useCallback(() => setChecked((prev) => !prev), []);

  const { goNextTourStep, stopTour } = useTourContext();
  return (
    <Coachmark
      action={
        <Button compact onPress={goNextTourStep} variant="secondary">
          Next
        </Button>
      }
      checkbox={
        <Checkbox checked={checked} onChange={toggleChecked}>
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

const scrollIntoView = async (
  scrollViewRef: React.RefObject<ScrollView>,
  elementRef: React.RefObject<View>,
) => {
  const scrollView = scrollViewRef.current;
  if (!scrollView) return;
  // @ts-expect-error Type 'ScrollView' is not assignable to type 'Readonly<NativeMethods>'.
  elementRef.current?.measureLayout(scrollView, (x, y) => {
    scrollView.scrollTo({ x, y, animated: true });
  });
};

const TourStory = () => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const step2Ref = useRef<View>(null);
  const step3Ref = useRef<View>(null);
  const step4Ref = useRef<View>(null);

  const tourSteps = useMemo(
    () => [
      {
        id: 'step1',
        onBeforeActive: () => console.log('step1 before'),
        Component: StepOne,
      },
      {
        id: 'step2',
        arrowColor: 'yellow',
        onBeforeActive: async () => {
          console.log('step2 before');
          await scrollIntoView(scrollViewRef, step2Ref);
        },

        Component: () => {
          const { goNextTourStep, stopTour } = useTourContext();
          return (
            <Coachmark
              action={
                <Button compact onPress={goNextTourStep} variant="secondary">
                  Next
                </Button>
              }
              closeButtonAccessibilityLabel="Close"
              content={
                <VStack gap={2}>
                  <Text font="caption" color="fgMuted">
                    50%
                  </Text>
                  <ProgressBar progress={0.5} />
                  <Text>
                    Add up to 3 lines of body copy. Deliver your message with clarity and impact
                  </Text>
                </VStack>
              }
              media={
                <Image
                  accessibilityIgnoresInvertColors
                  source={{
                    uri: ethBackground,
                  }}
                  style={{ width: '100%', height: 150 }}
                />
              }
              onClose={stopTour}
              title="My second step"
            />
          );
        },
      },
      {
        id: 'step3',
        onBeforeActive: async () => {
          console.log('step3 before');
          await scrollIntoView(scrollViewRef, step3Ref);
        },
        Component: () => {
          const { stopTour, goNextTourStep, goPreviousTourStep } = useTourContext();
          return (
            <Coachmark
              action={
                <HStack gap={1}>
                  <Button compact onPress={goPreviousTourStep} variant="secondary">
                    Back
                  </Button>
                  <Button compact onPress={goNextTourStep} variant="secondary">
                    Next
                  </Button>
                  <Button compact onPress={stopTour} variant="secondary">
                    Done
                  </Button>
                </HStack>
              }
              content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
              title="My third step"
              width={350}
            />
          );
        },
      },
      {
        id: 'step4',
        onBeforeActive: async () => {
          console.log('step4 before');
          await scrollIntoView(scrollViewRef, step4Ref);
        },
        Component: () => {
          const { stopTour, goPreviousTourStep } = useTourContext();
          return (
            <Coachmark
              action={
                <HStack gap={1}>
                  <Button compact onPress={goPreviousTourStep} variant="secondary">
                    Back
                  </Button>
                  <Button compact onPress={stopTour} variant="secondary">
                    Done
                  </Button>
                </HStack>
              }
              content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
              title="My last step"
              width={250}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
        <ExampleScreen>
          <Example>
            <TourExamples step2Ref={step2Ref} step3Ref={step3Ref} step4Ref={step4Ref} />
          </Example>
        </ExampleScreen>
      </ScrollView>
    </Tour>
  );
};

export default TourStory;
