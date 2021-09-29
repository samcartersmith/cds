import React, { useCallback } from 'react';
import { useToggler } from '@cbhq/cds-common';
import { IconButton, Button } from '@cbhq/cds-web/buttons';
import { ThemeProvider } from '@cbhq/cds-web/system';
import {
  Navigation,
  NavigationBar,
  NavigationBarActions,
  NavigationBarTitles,
} from '@cbhq/cds-web/navigation';
import { PortalProvider } from '@cbhq/cds-web/context/PortalProvider';
import { LoremIpsum } from '@cbhq/cds-web/layout/__stories__/LoremIpsum';
import { Modal, ModalBody, ModalFooter } from '@cbhq/cds-web/overlays';
import { usePortal } from '@cbhq/cds-common/context/PortalContext';

// can't load from storybook for some reason
const PortalModalExample: React.FC<{
  modalKey: string;
}> = ({ modalKey, children }) => {
  const { addPortal, removePortal } = usePortal();

  const closeModal = useCallback(() => removePortal(modalKey), [removePortal, modalKey]);
  const showModal = useCallback(
    () =>
      addPortal(
        modalKey,
        <Modal
          visible
          onClose={closeModal}
          title="Basic Modal"
          footer={
            <ModalFooter
              PrimaryAction={<Button>Save</Button>}
              SecondaryAction={<Button variant="secondary">Cancel</Button>}
            />
          }
        >
          <ModalBody>{children}</ModalBody>
        </Modal>,
        'modal',
      ),
    [addPortal, closeModal, children, modalKey],
  );

  return <Button onPress={showModal}>Open Modal</Button>;
};

export const ModalExample: React.FC = () => {
  const [showDarkMode, { toggle: toggleDarkMode }] = useToggler(false);
  const [showLongContent, { toggle: toggleLongContent }] = useToggler(false);

  const navbar = (
    <NavigationBar
      titles={<NavigationBarTitles title="Modal" subtitle="Modal Demos" />}
      actions={
        <NavigationBarActions>
          <IconButton onPress={toggleDarkMode} name="api" />
          <IconButton
            onPress={toggleLongContent}
            name={showLongContent ? 'hamburger' : 'horizontalLine'}
          />
        </NavigationBarActions>
      }
    />
  );

  return (
    <ThemeProvider spectrum={showDarkMode ? 'dark' : 'light'}>
      <Navigation navbar={navbar}>
        <PortalProvider>
          <PortalModalExample modalKey="basicModal">
            <LoremIpsum />
          </PortalModalExample>
        </PortalProvider>
      </Navigation>
    </ThemeProvider>
  );
};

export default ModalExample;
