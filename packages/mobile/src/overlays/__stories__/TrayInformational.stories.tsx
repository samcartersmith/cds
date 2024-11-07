import React, { useCallback, useRef } from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { DrawerRefBaseProps } from '@cbhq/cds-common/types';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { SectionHeader } from '../../section-header/SectionHeader';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { TextBody, TextHeadline, TextLabel2, TextLegal } from '../../typography';
import { ProgressBar } from '../../visualizations/ProgressBar';
import { Tray, TrayStickyFooter } from '../Tray/Tray';

export const Default = () => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={handleCloseTray}
          onVisibilityChange={handleTrayVisibilityChange}
          title={<SectionHeader spacingHorizontal={3} title="Trading activity" />}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack spacingBottom={1} spacingHorizontal={3}>
                <TextBody color="foregroundMuted" spacingBottom={3}>
                  The percentage of Coinbase customers who increased or decreased their net position
                  in 00 over the past 24 hours through trading. What this means: Increased buying
                  activity can signal that the asset is gaining popularity. Last updated on May 2,
                  2023.
                </TextBody>
                <TextHeadline>What this means:</TextHeadline>
                <TextBody color="foregroundMuted" spacingBottom={3}>
                  Increased buying activity can signal that the asset is gaining popularity.
                </TextBody>
                <TextLegal color="foregroundMuted">Last updated on May 2, 2023.</TextLegal>
              </VStack>
              <StickyFooter spacingHorizontal={3}>
                <Button block onPress={handleClose} variant="secondary">
                  Got it
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const WithProgressBar = () => {
  const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
    useToggler(false);
  const trayRef = useRef<DrawerRefBaseProps>(null);

  const handleTrayVisibilityChange = useCallback((e: 'visible' | 'hidden') => {
    console.log('Tray visibility changed:', e);
  }, []);

  return (
    <>
      <Button onPress={handleOpenTray}>Open</Button>
      {isTrayVisible && (
        <Tray
          ref={trayRef}
          handleBarAccessibilityLabel="Dismiss"
          onCloseComplete={handleCloseTray}
          onVisibilityChange={handleTrayVisibilityChange}
          title={<SectionHeader spacingHorizontal={3} title="Section header" />}
        >
          {({ handleClose }) => (
            <TrayStickyFooter>
              <VStack spacingBottom={1} spacingHorizontal={3}>
                <TextBody color="foregroundMuted" spacingBottom={3}>
                  The percentage of this asset currently being held in cold storage. In order to
                  trade these funds, you will need to first unlock them from your cold storage
                  vault.
                </TextBody>
                <ProgressBar
                  accessibilityLabel="default progressbar"
                  color="foreground"
                  progress={0.5}
                />
                <HStack justifyContent="space-between" spacingTop={1.5}>
                  <VStack>
                    <TextLabel2>$1,863.90 · 50%</TextLabel2>
                    <TextLabel2 color="foregroundMuted">Stored in vault</TextLabel2>
                  </VStack>
                  <VStack>
                    <TextLabel2>$1,863.90</TextLabel2>
                    <TextLabel2 color="foregroundMuted">Eligible</TextLabel2>
                  </VStack>
                </HStack>
              </VStack>
              <StickyFooter spacingHorizontal={3}>
                <Button block onPress={handleClose} variant="secondary">
                  Got it
                </Button>
              </StickyFooter>
            </TrayStickyFooter>
          )}
        </Tray>
      )}
    </>
  );
};

export const InformationalTrayScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Informational Tray">
        <Default />
      </Example>
      <Example title="With Progress Bar">
        <WithProgressBar />
      </Example>
    </ExampleScreen>
  );
};

export default InformationalTrayScreen;
