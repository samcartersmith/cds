import React, { useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { TextBody, TextHeadline, TextLabel2, TextTitle3 } from '../../typography';
import { PatternTag } from '../PatternTag';

const PatternTagDisclosureHighFrictionBenefitScreen = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Benefit to highlight 1',
        body: 'Bullet outlining benefits.',
      },
      {
        id: 2,
        headline: 'Benefit to highlight 2',
        body: 'Bullet outlining benefits.',
      },
    ],
    [],
  );

  return (
    <ExampleScreen>
      <Example title="Pattern Tag - High-Friction Benefit Disclosure">
        <Button onPress={toggleOn}>View HFB Disclosure</Button>
        <PatternTag disclosure>
          <Modal
            visible={visible}
            onRequestClose={toggleOff}
            accessibilityLabel="Title outlining the benefit in 1-2 lines"
            accessibilityHint="Hint providing more context about the disclosure. Close this dialog to continue."
            hideDividers
          >
            <ModalHeader
              closeAccessibilityLabel="Close"
              closeAccessibilityHint="Close this dialog to continue"
            />
            <ModalBody>
              <Box alignItems="center">
                <SpotRectangle name="accessToAdvancedCharts" />
              </Box>
              <TextTitle3 spacingTop={4}>Title outlining the benefit in 1-2 lines</TextTitle3>
              <TextLabel2 spacingTop={1}>
                Body text saying &quot;By verbing, you will get X, Y, Z.&quot;
              </TextLabel2>
              <VStack spacingVertical={3} gap={3}>
                {data.map(({ id, headline, body }) => (
                  <VStack key={id} gap={1}>
                    <HStack gap={2} alignItems="center">
                      <Icon size="s" name="checkmark" color="foreground" />
                      <TextHeadline dangerouslySetStyle={{ flex: 1 }}>{headline}</TextHeadline>
                    </HStack>
                    <TextBody spacingStart={4}>{body}</TextBody>
                  </VStack>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter primaryAction={<Button onPress={toggleOff}>[CTA]</Button>} />
          </Modal>
        </PatternTag>
      </Example>
    </ExampleScreen>
  );
};

export default PatternTagDisclosureHighFrictionBenefitScreen;
