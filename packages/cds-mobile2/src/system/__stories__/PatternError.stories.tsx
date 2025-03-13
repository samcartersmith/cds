import React from 'react';
import { useToggler } from '@cbhq/cds-common2';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HeroSquare } from '../../illustrations';
import { VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { Text } from '../../typography/Text';

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
              <Text font="title3" align="center" paddingTop={3}>
                Page not found
              </Text>
              <Text align="center" color="fgMuted" paddingTop={1}>
                Sorry we couldn&apos;t find what you were looking for.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter primaryAction={<Button onPress={toggleOff}>Back to Coinbase</Button>} />
        </Modal>
      </Example>
    </ExampleScreen>
  );
};

export default PatternTagErrorScreen;
