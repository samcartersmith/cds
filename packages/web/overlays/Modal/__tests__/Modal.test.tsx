import { fireEvent, render, waitFor } from '@testing-library/react';
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
import { PortalProvider } from '../../PortalProvider';
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
  PortalProvider,
} as CreateModalProps);

describe('Modal', () => {
  it('passes a11y', async () => {
    expect(await renderA11y(<MockModal visible />)).toHaveNoViolations();
  });

  it('passes a11y when visible', async () => {
    expect(
      await renderA11y(<MockModal />, {
        async afterRender({ container, getByRole }) {
          fireEvent.click(container.querySelector('button') as Element);

          return waitFor(() => getByRole('dialog'));
        },
      }),
    ).toHaveNoViolations();
  });

  it('show modal on click', async () => {
    const { container, getByRole } = render(<MockModal />);

    fireEvent.click(container.querySelector('button') as Element);

    const modal = await waitFor(() => getByRole('dialog'));
    expect(modal).toBeDefined();
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal_title');
  });

  it('triggers close on overlay click', async () => {
    const onRequestClose = jest.fn();
    const { container, getByRole, getByTestId } = render(
      <MockModal onRequestClose={onRequestClose} />,
    );

    fireEvent.click(container.querySelector('button') as Element);

    await waitFor(() => getByRole('dialog'));
    fireEvent.click(getByTestId('modal-overlay'));

    // wait for animation to finish
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers close on close button click', async () => {
    const onRequestClose = jest.fn();
    const { container, getByRole, getByTestId } = render(
      <MockModal onRequestClose={onRequestClose} />,
    );

    fireEvent.click(container.querySelector('button') as Element);

    await waitFor(() => getByRole('dialog'));
    fireEvent.click(getByTestId('modal-close-button'));

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers close on ESC key press', async () => {
    const onRequestClose = jest.fn();
    const { container, getByRole } = render(<MockModal onRequestClose={onRequestClose} />);

    fireEvent.click(container.querySelector('button') as Element);

    await waitFor(() => getByRole('dialog'));
    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers back action on back button click', async () => {
    const onBackButtonPress = jest.fn();
    const { getByTestId } = render(
      <MockModal visible onRequestClose={jest.fn()} onBackButtonPress={onBackButtonPress} />,
    );

    fireEvent.click(getByTestId('modal-back-button'));

    expect(onBackButtonPress).toHaveBeenCalledTimes(1);
  });

  it('renders modal title', async () => {
    const title = 'Basic Modal';
    const { getByText } = render(<MockModal visible onRequestClose={jest.fn()} title={title} />);

    expect(getByText(title)).toBeTruthy();
  });

  it('renders modal body', async () => {
    const { container, getByRole, getByText } = render(
      <MockModal visible onRequestClose={jest.fn()} />,
    );

    fireEvent.click(container.querySelector('button') as Element);
    await waitFor(() => getByRole('dialog'));

    expect(getByText(loremIpsum)).toBeTruthy();
  });

  it('renders modal footer', async () => {
    const { container, getByRole, getByTestId } = render(
      <MockModal visible onRequestClose={jest.fn()} />,
    );

    fireEvent.click(container.querySelector('button') as Element);
    await waitFor(() => getByRole('dialog'));

    expect(getByTestId('modal-footer')).toBeTruthy();
  });
});
