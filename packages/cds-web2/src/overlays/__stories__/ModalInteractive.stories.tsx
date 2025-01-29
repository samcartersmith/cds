import { expect } from '@storybook/jest';
import { StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { animateOutOpacityConfig } from '@cbhq/cds-common2/animation/modal';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common2/internal/modalBuilder';
import { durations } from '@cbhq/cds-common2/motion/tokens';

import { Button } from '../../buttons/Button';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { pauseStory } from '../../utils/storybook';
import { Modal } from '../modal/Modal';
import { ModalBody } from '../modal/ModalBody';
import { ModalFooter } from '../modal/ModalFooter';
import { ModalHeader } from '../modal/ModalHeader';

const { BasicModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  LoremIpsum,
} as CreateModalProps);

export default {
  title: 'Interactive/Modal',
  component: BasicModal,
};

// Using the motion duration so make sure we wait the appropriate amount of time before our assertion
const DURATION: number = Number(durations[animateOutOpacityConfig.duration ?? 'fast1']) + 10;
const YUBIKEY_STRING = 'cccccbeurlitbgvnvidvttluefrcnnggvhnhcuuddjkn';

export const ModalWithYubikeyInteraction: StoryObj<typeof BasicModal> = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const modalTitle = canvas.getByText('Basic Modal');

    // Sanity check
    await waitFor(() => expect(modalTitle).toBeVisible());

    // Fake press the yubikey
    userEvent.type(modalTitle, `${YUBIKEY_STRING}{Enter}`);

    // Make sure the modal is still visible
    await pauseStory(DURATION);
    await waitFor(() => expect(modalTitle).toBeVisible());
  },
};
