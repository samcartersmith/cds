import React from 'react';
import { Animated, Modal as RNModal } from 'react-native';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';
import {
  CreateLoremIpsumProps,
  loremIpsum,
  loremIpsumBuilder,
} from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../../buttons';
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
  ThemeProvider: React.Fragment,
  Button,
  LoremIpsum,
  PortalProvider,
} as CreateModalProps);

describe('Modal', () => {
  afterEach(cleanup);

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
    const onRequestClose = jest.fn();
    const result = render(<MockModal onRequestClose={onRequestClose} />);

    fireEvent.press(result.getByText('Open Modal'));
    fireEvent.press(result.getByTestId('modal-close-button'));

    // wait for animation to finish
    await waitFor(() => expect(onRequestClose).toHaveBeenCalledTimes(1));
  });

  it('triggers back action on back button click', async () => {
    const onBackButtonPress = jest.fn();
    const { getByText, getByTestId } = render(<MockModal onBackButtonPress={onBackButtonPress} />);

    fireEvent.press(getByText('Open Modal'));
    fireEvent.press(getByTestId('modal-back-button'));

    expect(onBackButtonPress).toHaveBeenCalledTimes(1);
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

  it('triggers close animation on footer action press', async () => {
    const onRequestClose = jest.fn();
    const animationParallelSpy = jest.spyOn(Animated, 'parallel');
    const animationTimingSpy = jest.spyOn(Animated, 'timing');

    const { getByTestId } = render(<MockModal visible onRequestClose={onRequestClose} />);

    // press on footer action
    fireEvent.press(getByTestId('modal-footer-save'));

    // wait for animation to finish
    await waitFor(() => {
      expect(animationParallelSpy).toHaveBeenCalledTimes(2);
      expect(animationTimingSpy).toHaveBeenCalledTimes(4);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });
});
