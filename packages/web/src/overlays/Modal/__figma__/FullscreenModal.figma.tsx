/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import figma from '@figma/code-connect';
import { css } from '@linaria/core';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';

import { Button } from '../../../buttons';
import { useTriggerFocus } from '../../../hooks/useTriggerFocus';
import { FullscreenModal } from '../FullscreenModal';

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=302%3A20262',
  {
    imports: ["import { FullscreenModal } from '@cbhq/cds-web/overlays/Modal/FullscreenModal';"],
    variant: { layout: 'primary + secondary' },
    props: {
      showSecondaryContentDivider: figma.boolean('show divider'),
      secondaryContent: figma.instance('🔄 secondary content'),
      primaryContent: figma.instance('🔄 primary content'),
    },
    example: (props) => {
      const [visible, { toggleOn, toggleOff }] = useToggler(true);
      const { triggerRef, focusTrigger } = useTriggerFocus();

      return (
        <>
          <Button ref={triggerRef} onPress={toggleOn}>
            Open Modal
          </Button>
          <FullscreenModal
            onDidClose={focusTrigger}
            onRequestClose={toggleOff}
            title="Modal title"
            visible={visible}
            {...props}
          />
        </>
      );
    },
  },
);

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=302%3A20262',
  {
    imports: ["import { FullscreenModal } from '@cbhq/cds-web/overlays/Modal/FullscreenModal';"],
    variant: { layout: 'primary left aligned' },
    props: {
      showSecondaryContentDivider: figma.boolean('show divider'),
      primaryContent: figma.instance('🔄 primary content'),
    },
    example: (props) => {
      const [visible, { toggleOn, toggleOff }] = useToggler(true);
      const { triggerRef, focusTrigger } = useTriggerFocus();

      return (
        <>
          <Button ref={triggerRef} onPress={toggleOn}>
            Open Modal
          </Button>
          <FullscreenModal
            onDidClose={focusTrigger}
            onRequestClose={toggleOff}
            title="Modal title"
            visible={visible}
            {...props}
          />
        </>
      );
    },
  },
);

figma.connect(
  FullscreenModal,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=302%3A20262',
  {
    imports: ["import { FullscreenModal } from '@cbhq/cds-web/overlays/Modal/FullscreenModal';"],
    variant: { layout: 'primary centered' },
    props: {
      showSecondaryContentDivider: figma.boolean('show divider'),
      secondaryContent: figma.instance('🔄 secondary content'),
      primaryContent: figma.instance('🔄 primary content'),
    },
    example: (props) => {
      const [visible, { toggleOn, toggleOff }] = useToggler(true);
      const { triggerRef, focusTrigger } = useTriggerFocus();

      return (
        <>
          <Button ref={triggerRef} onPress={toggleOn}>
            Open Modal
          </Button>
          <FullscreenModal
            dangerouslySetContentClassName={css`
              margin-left: auto;
              justify-content: center;
            `}
            onDidClose={focusTrigger}
            onRequestClose={toggleOff}
            title="Modal title"
            visible={visible}
            {...props}
          />
        </>
      );
    },
  },
);
