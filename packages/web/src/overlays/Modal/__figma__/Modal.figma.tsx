/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import figma from '@figma/code-connect';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Button } from '../../../buttons';
import { useTriggerFocus } from '../../../hooks/useTriggerFocus';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

figma.connect(
  Modal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=68-1065&m=dev',
  {
    imports: [
      "import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';",
      "import { ModalHeader } from '@cbhq/cds-web/overlays/Modal/ModalHeader';",
      "import { ModalFooter } from '@cbhq/cds-web/overlays/Modal/ModalFooter';",
      "import { ModalBody } from '@cbhq/cds-web/overlays/Modal/ModalBody';",
      "import { useTriggerFocus } from '@cbhq/cds-web/hooks/useTriggerFocus';",
      "import { useToggler } from '@cbhq/cds-common/hooks/useToggler';",
    ],
    props: {
      modalHeader: figma.nestedProps('.Modal Header', {
        // onBackButtonPress: figma.boolean('show back button', {
        //   true: () => {},
        //   false: undefined,
        // }),
        title: figma.boolean('show title', {
          true: figma.string('title'),
          false: undefined,
        }),
      }),
      modalFooter: figma.nestedProps('.Modal Footer', {
        secondaryAction: figma.boolean('show secondary', {
          true: <Button variant="secondary">Button</Button>,
          false: undefined,
        }),
      }),
      children: figma.instance('🔄 replace me'),
      hideDividers: figma.enum('height defined by', {
        content: true,
        container: undefined,
      }),
    },
    example: ({ modalHeader, modalFooter, children, ...props }) => {
      const [visible, { toggleOn, toggleOff }] = useToggler(true);
      const { triggerRef, focusTrigger } = useTriggerFocus();
      return (
        <>
          <Button ref={triggerRef} onPress={toggleOn}>
            Open Modal
          </Button>
          <Modal onDidClose={focusTrigger} onRequestClose={toggleOff} visible={visible} {...props}>
            <ModalHeader title={modalHeader.title} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter
              primaryAction={<Button>Button</Button>}
              secondaryAction={modalFooter.secondaryAction}
            />
          </Modal>
        </>
      );
    },
  },
);
