import { useCallback, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { css } from '@linaria/core';
import { noop } from 'lodash';
import { sparklineInteractiveWithHeaderBuilder } from '@cbhq/cds-common/internal/sparklineInteractiveBuilder';
import { sparklineInteractiveData } from '@cbhq/cds-common/internal/visualizations/SparklineInteractiveData';
import { Accordion, AccordionItem } from '@cbhq/cds-web/accordion';
import { HStack } from '@cbhq/cds-web/alpha/HStack';
import { VStack } from '@cbhq/cds-web/alpha/VStack';
import { Button, ButtonGroup, IconButton } from '@cbhq/cds-web/buttons';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { Box } from '@cbhq/cds-web/layout';
import { RemoteImage } from '@cbhq/cds-web/media';
import { Modal, ModalBody, ModalHeader, Tooltip } from '@cbhq/cds-web/overlays';
import { PressableOpacity } from '@cbhq/cds-web/system';
import { TextBody, TextDisplay1, TextLabel1, TextTitle2 } from '@cbhq/cds-web/typography';
import { SparklineInteractive, SparklineInteractiveHeader } from '@cbhq/cds-web/visualizations';
import TabItem from '@cbhq/docusaurus-theme/src/theme/TabItem';
import Tabs from '@cbhq/docusaurus-theme/src/theme/Tabs';

import { TableExample } from './TableExample';

const SparklineInteractivePriceWithHeader = sparklineInteractiveWithHeaderBuilder({
  SparklineInteractive,
  SparklineInteractiveHeader,
  isMobile: false,
});

const visuallyHidden = css`
  border: 0;
  display: block;
  position: absolute;
  left: -200vw;
  overflow: hidden;
  padding: 0;
  position: absolute;
  visibility: visible;
  whitespace: nowrap;
`;

type ContentProps = {
  onStepChange: (step: number) => void;
  currentStep: number;
};

export const Content = ({ onStepChange, currentStep }: ContentProps) => {
  const [stepReadyToComplete, setStepReadyToComplete] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const startStepRef = useRef<HTMLButtonElement>(null);
  const completeStepRef = useRef<HTMLDivElement>(null);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      startStepRef.current?.focus();
    }, 10);
  }, []);

  const completeStep1 = useCallback(() => {
    onStepChange(2);
    setIsModalOpen(true);
  }, [onStepChange]);

  const completeStep2 = useCallback(() => {
    onStepChange(3);
    setIsModalOpen(true);
  }, [onStepChange]);

  const completeStep3 = useCallback(() => {
    onStepChange(4);
    setIsModalOpen(true);
  }, [onStepChange]);

  const focusNextButton = useCallback(() => {
    setStepReadyToComplete(currentStep);
    setTimeout(() => {
      completeStepRef.current?.focus();
    }, 20);
  }, [currentStep]);

  return (
    <>
      {/* CHALLENGE ONE */}
      {currentStep === 1 && (
        <VStack gap={1} dangerouslySetClassName={visuallyHidden} width="100%">
          <TextDisplay1 as="h1">Beginning of the hunt</TextDisplay1>
          <Box>
            <Tooltip
              zIndex={-1}
              tooltipId="tooltip-1"
              content="Tabs are a paradigm screen reader users have gotten used to. They expect a list of
              tabs to receive a single focus stop and then to use the right and left arrow keys to
              move between tabs."
            >
              <Button onPress={noop} transparent compact ref={startStepRef}>
                How to use Tabs with the keyboard
              </Button>
            </Tooltip>
          </Box>

          <Tabs groupId="page" variant="primary">
            <TabItem value="tab_one" label="I don’t think this where you’re headed">
              <Link href="https://www.w3.org/WAI/WCAG21/Understanding/">WCAG 2.1</Link>
            </TabItem>
            <TabItem value="tab_two" label="This might be where you want to go">
              <TextBody as="p" aria-live="polite">
                Wow you’ve made it this far. We’re really glad you’ve taken the time to use a screen
                reader. If this is your first time turning one on we’re extra proud. Keep going to
                learn more about how to use a screen reader.
              </TextBody>
              <Link to="#nice-work" onClick={focusNextButton}>
                You’re headed in the right direction!
              </Link>
            </TabItem>
            <TabItem value="tab_three" label="I know this isn’t where you want to go">
              <Link href="https://www.google.com/search?q=binance+meme&tbm=isch&sa=X">
                Link to Binance
              </Link>
            </TabItem>
          </Tabs>

          <VStack gap={1}>
            <TextBody as="p">Keep searching below for the end of step one</TextBody>

            <Button
              onPress={completeStep1}
              ref={completeStepRef}
              disabled={stepReadyToComplete !== currentStep}
            >
              Complete step one
            </Button>
          </VStack>
        </VStack>
      )}
      {/* END OF CHALLENGE ONE */}

      {/* CHALLENGE TWO */}
      {currentStep === 2 && (
        <VStack gap={1} dangerouslySetClassName={visuallyHidden} width="100%">
          <TextDisplay1 as="h1">Middle of the hunt</TextDisplay1>
          <Button onPress={noop} transparent compact ref={startStepRef}>
            Let the fun begin
          </Button>
          <Accordion>
            <AccordionItem itemKey="section_one" title="Section 1" maxHeight={800}>
              <VStack gap={1} width="100%">
                <Tooltip
                  content="
                  Press tab until focus is placed on sparkline chart itself Use right and left arrow
                  keys to navigate the chart Hold shift + right/left arrow keys to skip around the
                  chart If you have VoiceOver on listen to the announcements"
                >
                  <PressableOpacity onPress={noop}>
                    Tips for using our sparkline component or price chart via the keyboard
                  </PressableOpacity>
                </Tooltip>
                <SparklineInteractivePriceWithHeader
                  data={sparklineInteractiveData}
                  strokeColor="#F7931A"
                />
              </VStack>
            </AccordionItem>
            <AccordionItem itemKey="section_two" title="Section 2">
              <VStack gap={1}>
                <TextTitle2 as="h3">GAAD</TextTitle2>
                <TextBody as="p">
                  Lets celebrate the 12th Global Accessibility Awareness Day (GAAD)! The purpose of
                  GAAD is to get everyone talking, thinking and learning about digital access and
                  inclusion, and the more than One Billion people with disabilities/impairments.
                  Today our hope is that you get to learn more about how to use a screen reader,
                  some problems people may encounter, and how those issues impact our users.
                </TextBody>
                <Link href="#nice-work" onClick={focusNextButton}>
                  Skip to end of step two
                </Link>
              </VStack>
            </AccordionItem>
          </Accordion>
          <Button
            onPress={completeStep2}
            ref={completeStepRef}
            disabled={stepReadyToComplete !== currentStep}
          >
            Complete step two
          </Button>
        </VStack>
      )}
      {/* END OF CHALLENGE TWO */}

      {/* CHALLENGE THREE */}
      {currentStep === 3 && (
        <VStack gap={1} dangerouslySetClassName={visuallyHidden} width="100%">
          <TextDisplay1 as="h1">End of the hunt</TextDisplay1>
          <IconButton name="close" onPress={noop} ref={startStepRef} />
          <IconButton name="bookmarkActive" onPress={noop} />
          <Button onPress={noop}>↗</Button>
          <ButtonGroup>
            <Button onPress={noop} loading>
              Submitting
            </Button>
            <Button onPress={noop}>™</Button>
            <Button onPress={noop}>Cancel</Button>
          </ButtonGroup>
          <Tooltip
            tooltipId="tooltip-2"
            content="
            This tooltip isn’t what you’re looking for, but you had to open it to find out due to
            its label :troll-face-emoji:"
          >
            <Button onPress={noop}>Tooltip</Button>
          </Tooltip>
          <IconButton name="arrowLeft" onPress={noop} />
          <Button type="button" accessibilityLabel="Heading in the right direction">
            Button with label maybe we’re starting to get in the right direction
          </Button>
          <Button
            type="button"
            // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
            onPress={() => {
              setIsCollapsed(!isCollapsed);
              setStepReadyToComplete(currentStep);
            }}
          >
            {isCollapsed ? 'Open me!' : 'Close me!'}
          </Button>
          <Collapsible collapsed={isCollapsed}>
            <TableExample />
          </Collapsible>
          <Button onPress={completeStep3} disabled={stepReadyToComplete !== currentStep}>
            Looks like you found the right spot
          </Button>
        </VStack>
      )}
      {/* END OF CHALLENGE THREE */}

      <Modal visible={isModalOpen} onRequestClose={handleModalClose}>
        {currentStep === 2 && (
          <div aria-live="assertive">
            <ModalHeader title="Congrats! You made it through the first challenge!" />
            <ModalBody>
              To complete the next step, ensure you still have VoiceOver on. Close the modal and
              move focus down to the next visually hidden experience. You’ll find a skip link
              especially helpful 😉
              <HStack gap={1} alignItems="center" spacingTop={3} spacingBottom={1}>
                <Icon name="info" size="s" />
                <TextLabel1 as="label">
                  Tips for using our sparkline component or price chart via the keyboard.
                </TextLabel1>
              </HStack>
              <TextBody as="p">
                Press tab until focus is placed on sparkline chart itself Use right and left arrow
                keys to navigate the chart Hold shift + right/left arrow keys to skip around the
                chart If you have VoiceOver on listen to the announcements
              </TextBody>
            </ModalBody>
          </div>
        )}
        {currentStep === 3 && (
          <div aria-live="assertive">
            <ModalHeader title="Wooaawaaaaweeee! You made it to the final challenge!" />
            <ModalBody>
              <TextBody as="p">
                Now for the slightly harder last part. You’ll notice some issues with some of the
                components you experience next. Try not to get frustrated and if you need help, you
                can always check in at #ask-accessibility.
              </TextBody>
              <TextBody as="p">
                To complete the next step, ensure you still have VoiceOver on and move focus down to
                the next visually hidden experience.
              </TextBody>
            </ModalBody>
          </div>
        )}
        {currentStep === 4 && (
          <div aria-live="assertive">
            <ModalHeader title="Congratulations on finding the end of the hunt!" />
            <ModalBody>
              <TextBody as="p" spacingBottom={1}>
                Isn’t it frustrating when things don’t work as they’re expected to? Having properly
                labeled elements is so crucial for someone who can’t see the screen.
              </TextBody>
              <VStack gap={1} alignItems="center">
                <RemoteImage
                  source="https://assets.poap.xyz/2746f816-2adb-4d24-8b0d-95a8c24a53dd.gif"
                  width={244}
                  height={244}
                />
                <Button onPress={completeStep3} to="https://poap.website/gaad-2k-23">
                  Claim your POAP!
                </Button>
              </VStack>
            </ModalBody>
          </div>
        )}
      </Modal>
    </>
  );
};
