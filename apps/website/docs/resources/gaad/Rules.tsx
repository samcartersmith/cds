import { useCallback, useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { Button } from '@cbhq/cds-web/buttons';
import { VStack } from '@cbhq/cds-web/layout';
import { Box } from '@cbhq/cds-web/layout/Box';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { Modal, ModalBody, ModalHeader } from '@cbhq/cds-web/overlays';
import { TextBody, TextTitle2 } from '@cbhq/cds-web/typography';

export const Rules = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal when the page mounts
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c


                                                                                    
    $$$$$$$\\  $$$$$$$\\ $$$$$$$\\ $$\\   $$\\ $$$$$$$\\   $$$$$$\\   $$$$$$\\  $$$$$$$$\\   
    $$  __$$\\ $$  __$$\\ \\_$$  _|$$$\\  $$ |$$  __$$\\ $$  __$$\\ $$  __$$\\ $$  _____|  
    $$ /  \\__|$$ /  $$ |  $$ |  $$$$\\ $$ |$$ |  $$ |$$ /  $$ |$$ /  \\__|$$ |        
    $$ |      $$ |  $$ |  $$ |  $$ $$\\$$ |$$$$$$$\\ |$$$$$$$$ |\\$$$$$$\\  $$$$$\\      
    $$ |      $$ |  $$ |  $$ |  $$ \\$$$$ |$$  __$$\\ $$  __$$ | \\____$$\\ $$  __|     
    $$ |  $$\\ $$ |  $$ |  $$ |  $$ |\\$$$ |$$ |  $$ |$$ |  $$ |$$\\   $$ |$$ |        
    \\$$$$$$  | $$$$$$  |$$$$$$\\ $$ | \\$$ |$$$$$$$  |$$ |  $$ |\\$$$$$$  |$$$$$$$$\\   
     \\______/  \\______/ \\______|\\__|  \\__|\\_______/ \\__|  \\__| \\______/ \\________|  
                                                                                    
    Cheaters never prosper!                                                         
    But don't worry, we've got your back!                                           
    If you need help, just click the "Show rules" button!                           
                                                                                    
                                                                                    
`,
      'color: white; background: blue;',
    );
    setTimeout(() => {
      // Open after 4 seconds
      setIsModalOpen(true);
    }, 4000);
  }, []);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <Box spacingTop={3}>
      <Button ref={buttonRef} compact onPress={openModal}>
        Show the rules
      </Button>
      <Modal onRequestClose={closeModal} visible={isModalOpen}>
        <ModalHeader title="Tips, tricks, and rules for the hunt" />
        <ModalBody>
          <TextTitle2 as="h2" spacingBottom={1}>
            You look confused...
          </TextTitle2>
          <TextBody as="p" spacingBottom={2}>
            Here are some tips to get you headed in the right direction!
          </TextBody>
          <VStack as="ul" gap={2}>
            <TextBody as="li" color="foregroundMuted">
              To turn on VoiceOver Choose{' '}
              <Box
                as="label"
                background="secondary"
                borderRadius="rounded"
                display="inline-block"
                spacingHorizontal={1}
              >
                
              </Box>
              {' > '}
              <Box
                as="label"
                background="secondary"
                borderRadius="rounded"
                display="inline-block"
                spacingHorizontal={1}
              >
                System Settings
              </Box>
              , then click{' '}
              <HStack
                alignItems="center"
                as="label"
                background="secondary"
                borderRadius="rounded"
                display="inline-flex"
                gap={0.5}
                justifyContent="center"
                spacingHorizontal={1}
              >
                <img
                  alt="a11y icon"
                  height="16"
                  src="https://help.apple.com/assets/63BCA927AAE78C58DD7FBE35/63BCA92AAAE78C58DD7FBE3E/en_US/2b2f66e61ae2036a31e141807277a025.png"
                  style={{ display: 'inline-block' }}
                  width="16"
                />
                Accessibility
              </HStack>{' '}
              in the sidebar (you may need to scroll down). Click{' '}
              <Box
                as="label"
                background="secondary"
                borderRadius="rounded"
                display="inline-block"
                spacingHorizontal={1}
              >
                VoiceOver
              </Box>{' '}
              on the right, then turn VoiceOver on or off.
            </TextBody>
            <TextBody as="li" color="foregroundMuted">
              You can find information on how to use a screen reader{' '}
              <Link href="https://docs.google.com/document/d/18fnEiMeiibyqxWb5dNVpSoCiIMXpymAXr1Fk7SGaMSI/edit#heading=h.o45qjppeibrr">
                here
              </Link>
            </TextBody>
            <TextBody as="li" color="foregroundMuted">
              Use tab to navigate to actionable elements
            </TextBody>
            <TextBody as="li" color="foregroundMuted">
              Use
              <Box
                as="label"
                background="secondary"
                borderRadius="rounded"
                display="inline-block"
                spacingHorizontal={1}
              >
                CTRL
              </Box>{' '}
              +
              <Box
                as="label"
                background="secondary"
                borderRadius="rounded"
                display="inline-block"
                spacingHorizontal={1}
              >
                Option
              </Box>{' '}
              + right/left arrow keys to navigate all content (non-actionable content like text)
            </TextBody>
            <TextBody as="li" color="foregroundMuted">
              Explore and listen
              <Box as="ul">
                <TextBody as="li" color="foregroundMuted">
                  Visualize what you may think the page looks like in your head
                </TextBody>
              </Box>
            </TextBody>
            <TextBody as="li" color="foregroundMuted">
              If you need help reach out to #ask-accessibility
            </TextBody>
          </VStack>
        </ModalBody>
      </Modal>
    </Box>
  );
};
