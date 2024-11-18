/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import figma from '@figma/code-connect';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Button } from '../../../buttons/Button';
import { Box, VStack } from '../../../layout';
import { TextBody, TextTitle1 } from '../../../typography';
import { Tray, TrayStickyFooter } from '../Tray';

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33327&m=dev',
  {
    imports: ["import { Tray } from '@cbhq/cds-mobile/overlays/Tray/Tray';"],
    props: {
      title: figma.boolean('show section header', {
        true: figma.children('Section Header'),
        false: undefined,
      }),
      stickyFooter: figma.children('Sticky Footer'),
      content: figma.children(['Select Option Cell', 'Action Cell', 'Tabbed Chips']),
    },
    example: ({ stickyFooter, content, ...props }) => {
      const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
        useToggler(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={handleOpenTray}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={handleCloseTray}
              onVisibilityChange={() => {}}
              {...props}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  {content}
                  {stickyFooter}
                </TrayStickyFooter>
              )}
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33472&m=dev',
  {
    imports: ["import { Tray } from '@cbhq/cds-mobile/overlays/Tray/Tray';"],
    props: {
      pictogram: figma.boolean('show pictogram', {
        true: figma.children('Spot Square/blockchain'),
        false: undefined,
      }),
      sectionHeader: figma.children('Section Header'),
      stickyFooter: figma.children('Sticky Footer'),
    },
    example: ({ pictogram, stickyFooter, sectionHeader }) => {
      const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
        useToggler(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={handleOpenTray}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={handleCloseTray}
              onVisibilityChange={() => {}}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  {pictogram}
                  {sectionHeader}
                  <TextBody>
                    Lorem ipsum dolor sit amet consectetur. Lacus vitae vulputate maecenas sed ac
                    cursus enim elementum euismod. Ac vulputate gravida mauris id nulla imperdiet
                    eget. Dictum vitae enim eget ut. Maecenas hendrerit amet integer sagittis cras.
                    Fermentum ultricies malesuada interdum
                  </TextBody>
                  {stickyFooter}
                </TrayStickyFooter>
              )}
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33505&m=dev',
  {
    imports: ["import { Tray } from '@cbhq/cds-mobile/overlays/Tray/Tray';"],
    props: {
      spotRectangle: figma.instance('spot rectangle'),
      title: figma.string('title'),
      body: figma.string('body'),
      stickyFooter: figma.children('Sticky Footer'),
    },
    example: ({ spotRectangle, title, body, stickyFooter }) => {
      const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
        useToggler(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={handleOpenTray}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={handleCloseTray}
              onVisibilityChange={() => {}}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  <VStack spacingBottom={1} spacingHorizontal={3} spacingTop={1}>
                    <Box alignItems="center" spacingBottom={3}>
                      {spotRectangle}
                    </Box>
                    <TextTitle1 align="center" spacingBottom={2}>
                      {title}
                    </TextTitle1>
                    <TextBody align="center" color="foregroundMuted">
                      {body}
                    </TextBody>
                  </VStack>
                  {stickyFooter}
                </TrayStickyFooter>
              )}
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-33538&m=dev',
  {
    imports: ["import { Tray } from '@cbhq/cds-mobile/overlays/Tray/Tray';"],
    props: {
      children: figma.children('*'),
    },
    example: ({ children }) => {
      const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
        useToggler(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={handleOpenTray}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={handleCloseTray}
              onVisibilityChange={() => {}}
            >
              {({ handleClose }) => <TrayStickyFooter>{children}</TrayStickyFooter>}
            </Tray>
          )}
        </>
      );
    },
  },
);

figma.connect(
  Tray,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=14729-77780&m=dev',
  {
    imports: ["import { Tray } from '@cbhq/cds-mobile/overlays/Tray/Tray';"],
    props: {
      content: figma.instance('content'),
      stickyFooter: figma.children('Sticky Footer'),
      title: figma.boolean('show section header', {
        true: figma.children('Section Header'),
        false: undefined,
      }),
    },
    example: ({ content, stickyFooter, ...props }) => {
      const [isTrayVisible, { toggleOff: handleCloseTray, toggleOn: handleOpenTray }] =
        useToggler(false);
      const trayRef = useRef(null);

      return (
        <>
          <Button onPress={handleOpenTray}>Open</Button>
          {isTrayVisible && (
            <Tray
              ref={trayRef}
              disableCapturePanGestureToDismiss
              handleBarAccessibilityLabel="Dismiss"
              onCloseComplete={handleCloseTray}
              onVisibilityChange={() => {}}
              {...props}
            >
              {({ handleClose }) => (
                <TrayStickyFooter>
                  {content}
                  {stickyFooter}
                </TrayStickyFooter>
              )}
            </Tray>
          )}
        </>
      );
    },
  },
);
