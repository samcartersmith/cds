import React from 'react';
import { useToggler } from '@cbhq/cds-common';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HeroSquare } from '../../illustrations';
import { VStack } from '../../layout';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../overlays';
import { TextBody, TextTitle3 } from '../../typography';
import { PatternTag } from '../PatternTag';

const PatternTagErrorScreen = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);

  return (
    <ExampleScreen>
      <Example title="Pattern Tag - Error">
        <Button onPress={toggleOn}>View Error</Button>
        <PatternTag error>
          <Modal
            visible={visible}
            onRequestClose={toggleOff}
            accessibilityRole="alert"
            accessibilityLabel="Page not found"
            accessibilityHint="The requested page was not found. Close this dialog to continue."
            hideDividers
          >
            <ModalHeader
              closeAccessibilityLabel="Close"
              closeAccessibilityHint="Close this dialog to continue"
            />
            <ModalBody contentContainerStyle={{ flex: 1 }}>
              <VStack justifyContent="center" alignItems="center" flexGrow={1}>
                <HeroSquare name="errorWeb404" />
                <TextTitle3 align="center" spacingTop={3}>
                  Page not found
                </TextTitle3>
                <TextBody color="foregroundMuted" align="center" spacingTop={1}>
                  Sorry we couldn&apos;t find what you were looking for.
                </TextBody>
              </VStack>
            </ModalBody>
            <ModalFooter primaryAction={<Button onPress={toggleOff}>Back to Coinbase</Button>} />
          </Modal>
        </PatternTag>
      </Example>
    </ExampleScreen>
  );
};

export default PatternTagErrorScreen;
