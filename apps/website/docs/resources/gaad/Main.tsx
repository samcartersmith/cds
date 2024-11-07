import { useCallback, useState } from 'react';
import Link from '@docusaurus/Link';
import { noop } from 'lodash';
import { Button } from '@cbhq/cds-web/buttons';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons';
import { HStack } from '@cbhq/cds-web/layout';
import { Box } from '@cbhq/cds-web/layout/Box';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { RemoteImage } from '@cbhq/cds-web/media';
import { Tooltip } from '@cbhq/cds-web/overlays';
import { PressableOpacity } from '@cbhq/cds-web/system';
import { TextBody, TextLabel1, TextTitle1, TextTitle2 } from '@cbhq/cds-web/typography';
import Image from '@cbhq/docusaurus-theme/theme/Image';

import { Content } from './Content';
import { Rules } from './Rules';
import { Steps } from './Steps';

export const Main = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  return (
    <VStack alignItems="center" justifyContent="center" spacing={3}>
      <Box maxWidth={900} offsetTop={4}>
        <Image srcDark="/img/gaad/hero-dark.png" srcLight="/img/gaad/hero-light.png" />
      </Box>
      <Box justifyContent="center" spacingBottom={4}>
        <Steps currentStep={currentStep} />
      </Box>
      <HStack alignItems="center" width="100%">
        <VStack maxWidth={630}>
          <TextTitle1 as="h1">What is all this?</TextTitle1>
          <VStack gap={2}>
            <TextBody as="p">
              The purpose of this hunt is to celebrate Global Accessibility Awareness Day and get
              people more comfortable with assistive technology. If we’re unable to use a screen
              reader we will not understand our blind users in a meaningful way.
            </TextBody>
            <TextBody as="p" color="foregroundMuted">
              If you’re struggling, use the “show the rules” button or with VoiceOver on, press tab
              with keyboard focus on the “show the rules” button to enter the hunt.
            </TextBody>
            <Collapsible collapsed={currentStep !== 2}>
              <Box spacingTop={2}>
                <Tooltip
                  content="
                  Press tab until focus is placed on sparkline chart itself Use right and left arrow
                  keys to navigate the chart Hold shift + right/left arrow keys to skip around the
                  chart If you have VoiceOver on listen to the announcements"
                >
                  <PressableOpacity onPress={noop}>
                    <HStack alignItems="center" gap={1}>
                      <Icon name="info" size="s" />
                      <TextLabel1 as="label">
                        Tips for using our sparkline component or price chart via the keyboard.
                      </TextLabel1>
                    </HStack>
                  </PressableOpacity>
                </Tooltip>
              </Box>
            </Collapsible>
          </VStack>
          <Rules />
          <Content currentStep={currentStep} onStepChange={handleStepChange} />
        </VStack>
        <VStack flexGrow={1} justifyContent="center" width="100%">
          <RemoteImage
            height={244}
            source="https://assets.poap.xyz/2746f816-2adb-4d24-8b0d-95a8c24a53dd.gif"
            width={244}
          />
        </VStack>
      </HStack>
      <VStack gap={2} width="100%">
        <Box alignSelf="center" spacingTop={5}>
          <Button compact transparent>
            You’ve gone too far!
          </Button>
        </Box>
        <VStack gap={2} spacingTop={6}>
          <TextTitle2 as="h3">Helpful Learning links </TextTitle2>
          <ul>
            <li>
              <Link to="https://coinbase.docebosaas.com/learn/course/1453/introduction-to-accessibility-at-coinbase?generated_by=17993&hash=904edfdbfebf336cb47dcd7536e9597775109b37">
                Introduction to Accessibility Docebo Course
              </Link>
            </li>
            <li>
              <Link to="https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/">
                A Complete Guide To Accessible Front-End Components
              </Link>
            </li>
            <li>
              <Link to="/foundation/a11y/">CDS Accessibility</Link>
            </li>
          </ul>
        </VStack>
      </VStack>
    </VStack>
  );
};
