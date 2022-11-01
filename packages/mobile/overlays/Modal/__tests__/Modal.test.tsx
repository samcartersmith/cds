import React from 'react';
import { Animated, Modal as RNModal } from 'react-native';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import {
  CreateLoremIpsumProps,
  loremIpsum,
  loremIpsumBuilder,
} from '@cbhq/cds-common/internal/loremIpsumBuilder';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common/internal/modalBuilder';

import { Button } from '../../../buttons';
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
  ThemeProvider: React.Fragment,
  Button,
  LoremIpsum,
} as CreateModalProps);

describe('Modal', () => {
  afterEach(cleanup);

  it('passes a11y', () => {
    render(<MockModal testID="mock-modal" />);
    expect(screen.getByTestId('mock-modal')).toBeAccessible();
  });

  it('renders React Native Modal', () => {
    render(<MockModal />);

    expect(screen.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show modal on press', () => {
    render(<MockModal />);

    expect(screen.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(screen.getByText('Open Modal'));

    expect(screen.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('triggers close on close button press', async () => {
    const onRequestClose = jest.fn();
    render(<MockModal onRequestClose={onRequestClose} />);

    fireEvent.press(screen.getByText('Open Modal'));
    fireEvent.press(screen.getByTestId('modal-close-button'));

    // wait for animation to finish
    await waitFor(() => expect(onRequestClose).toHaveBeenCalledTimes(1));
  });

  it('triggers back action on back button press', async () => {
    const onBackButtonPress = jest.fn();
    render(<MockModal onBackButtonPress={onBackButtonPress} />);

    fireEvent.press(screen.getByText('Open Modal'));
    fireEvent.press(screen.getByTestId('modal-back-button'));

    expect(onBackButtonPress).toHaveBeenCalledTimes(1);
  });

  it('renders modal title', async () => {
    const title = 'Modal Title';
    render(<MockModal title={title} />);

    fireEvent.press(screen.getByText('Open Modal'));

    await screen.findByText(title);
    expect(screen.getByText(title)).toBeTruthy();
  });

  it('renders modal body', async () => {
    render(<MockModal />);

    fireEvent.press(screen.getByText('Open Modal'));

    await screen.findByText(loremIpsum);
    expect(screen.getByText(loremIpsum)).toBeTruthy();
  });

  it('renders modal body without dividers', async () => {
    render(<MockModal hideDividers />);

    fireEvent.press(screen.getByText('Open Modal'));

    await screen.findByText(loremIpsum);
    expect(screen.getByText(loremIpsum)).toBeTruthy();
  });

  it('renders modal footer', () => {
    render(<MockModal />);

    fireEvent.press(screen.getByText('Open Modal'));

    expect(screen.getByTestId('modal-footer')).toBeTruthy();
  });

  it('triggers close animation on footer action press', () => {
    const onRequestClose = jest.fn();
    const animationParallelSpy = jest.spyOn(Animated, 'parallel');
    const animationTimingSpy = jest.spyOn(Animated, 'timing');

    render(<MockModal visible onRequestClose={onRequestClose} />);

    // press on footer action
    fireEvent.press(screen.getByTestId('modal-footer-save'));

    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });
});
