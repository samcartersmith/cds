import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Modal as RNModal } from 'react-native';
import {
  createLoremIpsum,
  CreateLoremIpsumProps,
  loremIpsum,
} from ':cds-storybook/stories/LoremIpsum';
import { createStories, CreateModalProps } from ':cds-storybook/stories/Modal';

import { Modal } from '../Modal';
import { ModalFooter } from '../ModalFooter';
import { ModalBody } from '../ModalBody';
import { Button } from '../../../buttons';
import { ThemeProvider } from '../../../system/ThemeProvider';
import { PortalProvider } from '../../../context/PortalProvider';
import { TextBody, TextLabel1 } from '../../../typography';

const LoremIpsum = createLoremIpsum({
  TextBody,
  TextLabel1,
} as CreateLoremIpsumProps);

const { MockModal } = createStories({
  Modal,
  ModalBody,
  ModalFooter,
  ThemeProvider,
  Button,
  LoremIpsum,
  PortalProvider,
} as CreateModalProps);

describe('Modal', () => {
  it('renders React Native Modal', () => {
    const result = render(<MockModal />);

    expect(result.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show modal on click', () => {
    const result = render(<MockModal />);

    expect(result.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(result.getByText('Open Modal'));

    expect(result.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('triggers close on close button click', async () => {
    const onClose = jest.fn();
    const result = render(<MockModal onClose={onClose} />);

    fireEvent.press(result.getByText('Open Modal'));
    fireEvent.press(result.getByTestId('modal-close-button'));

    // wait for animation to finish
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it('triggers back action on back button click', async () => {
    const onBack = jest.fn();
    const { getByText, getByTestId } = render(<MockModal onBack={onBack} />);

    fireEvent.press(getByText('Open Modal'));
    fireEvent.press(getByTestId('modal-back-button'));

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders modal title', async () => {
    const title = 'Modal Title';
    const { getByText } = render(<MockModal title={title} />);

    fireEvent.press(getByText('Open Modal'));

    await waitFor(() => getByText(title));
    expect(getByText(title)).toBeTruthy();
  });

  it('renders modal body', async () => {
    const { getByText } = render(<MockModal />);

    fireEvent.press(getByText('Open Modal'));

    await waitFor(() => getByText(loremIpsum));
    expect(getByText(loremIpsum)).toBeTruthy();
  });

  it('renders modal footer', async () => {
    const { getByText, getByTestId } = render(<MockModal />);

    fireEvent.press(getByText('Open Modal'));

    expect(getByTestId('modal-footer')).toBeTruthy();
  });
});
