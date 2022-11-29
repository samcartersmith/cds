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

const TITLE = 'Basic Modal';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

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

  it('has expected default a11y attrs', () => {
    render(<MockModal visible />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', expect.stringMatching(/modal-title-.*/));
    expect(screen.getByText(TITLE)).toHaveAttribute('id', expect.stringMatching(/modal-title-.*/));
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(<MockModal visible accessibilityLabelledBy={LABELLED_BY} />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(<MockModal visible accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('dialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(<MockModal visible accessibilityLabelledBy={LABELLED_BY} accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('shows modal on click', async () => {
    render(<MockModal />);

    fireEvent.click(screen.getByRole('button'));

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeVisible();
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
    render(<MockModal visible onRequestClose={jest.fn()} />);
    expect(screen.getByText(TITLE)).not.toBeVisible();

    expect(await screen.findByText(TITLE)).toBeVisible();
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
