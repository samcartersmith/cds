import React from 'react';
import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HeroSquare } from '../../illustrations';
import { VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { TextBody, TextTitle3 } from '../../typography';

const PatternTagErrorScreen = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  return (
    <ExampleScreen>
      <Example title="Pattern - Error">
        <Button onPress={toggleOn}>View Error</Button>
        <Modal
          hideDividers
          accessibilityHint="The requested page was not found. Close this dialog to continue."
          accessibilityLabel="Page not found"
          accessibilityRole="alert"
          onRequestClose={toggleOff}
          visible={visible}
        >
          <ModalHeader
            closeAccessibilityHint="Close this dialog to continue"
            closeAccessibilityLabel="Close"
          />
          <ModalBody contentContainerStyle={{ flex: 1 }}>
            <VStack alignItems="center" flexGrow={1} justifyContent="center">
              <HeroSquare name="errorWeb404" />
              <TextTitle3 align="center" spacingTop={3}>
                Page not found
              </TextTitle3>
              <TextBody align="center" color="foregroundMuted" spacingTop={1}>
                Sorry we couldn&apos;t find what you were looking for.
              </TextBody>
            </VStack>
          </ModalBody>
          <ModalFooter primaryAction={<Button onPress={toggleOff}>Back to Coinbase</Button>} />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default PatternTagErrorScreen;
