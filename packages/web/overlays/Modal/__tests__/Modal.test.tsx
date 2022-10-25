import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CreateLoremIpsumProps,
  loremIpsum,
  loremIpsumBuilder,
} from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Button } from '../../../buttons';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { TextBody, TextLabel1 } from '../../../typography';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

const LoremIpsum = loremIpsumBuilder({
  TextBody,
  TextLabel1,
} as CreateLoremIpsumProps);

const { MockModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ThemeProvider,
  Button,
  LoremIpsum,
} as CreateModalProps);

describe('Modal', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<MockModal visible />)).toHaveNoViolations();
  });

  it('passes a11y when visible', async () => {
    expect(
      await renderA11y(<MockModal />, {
        async afterRender() {
          fireEvent.click(screen.getByRole('button'));

          return waitFor(() => screen.getByRole('dialog'));
        },
      }),
    ).toHaveNoViolations();
  });

  it('show modal on click', async () => {
    render(<MockModal />);

    fireEvent.click(screen.getByRole('button'));

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeDefined();
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal_title');
  });

  it('triggers close on overlay click', async () => {
    const onRequestClose = jest.fn();
    render(<MockModal onRequestClose={onRequestClose} />);

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    fireEvent.click(screen.getByTestId('modal-overlay'));

    // wait for animation to finish
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers close on close button click', async () => {
    const onRequestClose = jest.fn();
    render(<MockModal onRequestClose={onRequestClose} />);

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    fireEvent.click(screen.getByTestId('modal-close-button'));

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers close on ESC key press', async () => {
    const onRequestClose = jest.fn();
    render(<MockModal onRequestClose={onRequestClose} />);

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers back action on back button click', async () => {
    const onBackButtonPress = jest.fn();
    render(<MockModal visible onRequestClose={jest.fn()} onBackButtonPress={onBackButtonPress} />);

    fireEvent.click(screen.getByTestId('modal-back-button'));

    expect(onBackButtonPress).toHaveBeenCalledTimes(1);
  });

  it('renders modal title', async () => {
    const title = 'Basic Modal';
    render(<MockModal visible onRequestClose={jest.fn()} title={title} />);
    expect(screen.getByText(title)).not.toBeVisible();

    expect(await screen.findByText(title)).toBeVisible();
  });

  it('renders modal body', async () => {
    render(<MockModal visible onRequestClose={jest.fn()} />);
    expect(screen.getByText(loremIpsum)).not.toBeVisible();

    expect(await screen.findByText(loremIpsum)).toBeVisible();
  });

  it('renders modal footer', async () => {
    render(<MockModal visible onRequestClose={jest.fn()} />);

    expect(await screen.findByTestId('modal-footer')).toBeVisible();
  });

  it('should have correct styles at the end of animation', async () => {
    render(<MockModal />);

    fireEvent.click(screen.getByRole('button'));
    // initial styles
    expect(screen.getByTestId('modal-overlay-motion')).toHaveStyle({ opacity: 0 });
    expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({ opacity: 0 });
    expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({
      transform: 'scale(0.98) translateZ(0)',
    });

    // animated styles
    await waitFor(() => {
      expect(screen.getByTestId('modal-overlay-motion')).toHaveStyle({ opacity: 1 });
    });
    await waitFor(() => {
      expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({ opacity: 1 });
    });
    await waitFor(() => {
      expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({
        transform: 'none',
      });
    });
  });
});
