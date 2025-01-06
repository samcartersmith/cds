import React, { useCallback, useMemo } from 'react';
import { useToggler } from '@cbhq/cds-common2';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { SpotRectangle } from '../../illustrations';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { TextBody, TextHeadline, TextTitle3 } from '../../typography';

const PatternDisclosureLowFrictionScreen = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  const data = useMemo(
    () => [
      {
        id: 1,
        headline: 'Benefit to highlight 1',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
      {
        id: 2,
        headline: 'Risk to highlight 1',
        body: 'Bullets explaining selling points and potential risks (can include “learn more” links).',
      },
    ],
    [],
  );

  const handleSecondaryPress = useCallback(() => {
    // open terms and conditions
  }, []);

  return (
    <ExampleScreen>
      <Example title="Pattern - Low-Friction Disclosure">
        <Button onPress={toggleOn}>View LF Disclosure</Button>
        <Modal
          hideDividers
          accessibilityHint="Hint providing more context about the disclosure. Close this dialog to continue."
          accessibilityLabel="Title outlining the action and benefit in 1-2 lines"
          onRequestClose={toggleOff}
          visible={visible}
        >
          <ModalHeader
            closeAccessibilityHint="Close this dialog to continue"
            closeAccessibilityLabel="Close"
          />
          <ModalBody>
            <Box alignItems="center">
              <SpotRectangle name="accessToAdvancedCharts" />
            </Box>
            <TextTitle3 paddingTop={4}>
              Title outlining the action and benefit in 1-2 lines
            </TextTitle3>
            <VStack gap={3} paddingY={3}>
              {data.map(({ id, headline, body }) => (
                <VStack key={id} gap={1}>
                  <HStack alignItems="center" gap={2}>
                    <Icon color="iconForeground" name="checkmark" size="s" />
                    <TextHeadline style={{ flex: 1 }}>{headline}</TextHeadline>
                  </HStack>
                  <TextBody paddingLeft={4}>{body}</TextBody>
                </VStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter
            direction="vertical"
            primaryAction={<Button onPress={toggleOff}>[Affirmative CTA]</Button>}
            secondaryAction={
              <Button onPress={handleSecondaryPress} variant="secondary">
                Terms and conditions
              </Button>
            }
          />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default PatternDisclosureLowFrictionScreen;
