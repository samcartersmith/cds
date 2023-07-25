import React, { useCallback, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { TextBody, TextHeadline, TextTitle3 } from '../../typography';
import { PatternTag } from '../PatternTag';

const PatternTagDisclosureMedFrictionScreen = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Risk to highlight 1',
        body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).',
      },
      {
        id: 2,
        headline: 'Risk to highlight 2',
        body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).',
      },
    ],
    [],
  );

  const handleSecondaryPress = useCallback(() => {
    // open terms and conditions
  }, []);

  return (
    <ExampleScreen>
      <Example title="Pattern Tag - Medium-Friction Disclosure">
        <Button onPress={toggleOn}>View MF Disclosure</Button>
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
            <ModalFooter
              vertical
              primaryAction={<Button onPress={toggleOff}>[Affirmative CTA]</Button>}
              secondaryAction={
                <Button onPress={handleSecondaryPress} variant="secondary">
                  Terms and conditions
                </Button>
              }
            />
          </Modal>
        </PatternTag>
      </Example>
    </ExampleScreen>
  );
};

export default PatternTagDisclosureMedFrictionScreen;
