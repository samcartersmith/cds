import React from 'react';
import { Animated, Modal as RNModal } from 'react-native';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react-native';
import {
  CreateLoremIpsumProps,
  loremIpsum,
  loremIpsumBuilder,
} from '@cbhq/cds-common2/internal/loremIpsumBuilder';
import { CreateModalProps, modalBuilder } from '@cbhq/cds-common2/internal/modalBuilder';

import { Button, ButtonProps } from '../../../buttons';
import { TextBody, TextLabel1 } from '../../../typography';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Modal } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';

const LoremIpsum = loremIpsumBuilder({
  TextBody,
  TextLabel1,
} as CreateLoremIpsumProps);

/*
  This is a wrapper for the Button component that maps the onClick event to the onPress event. Ensures
  modalBuilder converts <Button onClick={() => setVisible(true)}>Open Modal</Button> to <Button onPress={() => setVisible(true)}>Open Modal</Button>
*/
const ButtonWrapperWithEventMapping = ({
  onClick,
  ...props
}: { onClick?: () => void } & ButtonProps) => <Button {...props} onPress={onClick} />;

const { MockModal } = modalBuilder({
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ThemeProvider: React.Fragment,
  Button: ButtonWrapperWithEventMapping,
  LoremIpsum,
} as CreateModalProps);

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    cleanup();
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible testID="mock-modal" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-modal')).toBeAccessible();
  });

  it('renders React Native Modal', () => {
    render(
      <DefaultThemeProvider>
        <MockModal />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(RNModal)).toHaveLength(1);
  });

  it('show modal on press', () => {
    render(
      <DefaultThemeProvider>
        <MockModal />
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryByProps({ visible: false })).toBeTruthy();

    fireEvent.press(screen.getByText('Open Modal'));

    expect(screen.UNSAFE_queryByProps({ visible: true })).toBeTruthy();
  });

  it('triggers close on close button press', () => {
    const onRequestClose = jest.fn();
    const onDidClose = jest.fn();

    render(
      <DefaultThemeProvider>
        <MockModal
          closeAccessibilityLabel="Close"
          onDidClose={onDidClose}
          onRequestClose={onRequestClose}
        />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));
    fireEvent.press(screen.getByLabelText('Close'));

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers onDidClose after animation finished', () => {
    const onDidClose = jest.fn();

    render(
      <DefaultThemeProvider>
        <MockModal closeAccessibilityLabel="Close" onDidClose={onDidClose} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));
    fireEvent.press(screen.getByLabelText('Close'));

    act(() => {
      jest.advanceTimersByTime(100);
      expect(onDidClose).toHaveBeenCalledTimes(1);
    });
  });

  it('triggers back action on back button press', () => {
    const onBackButtonClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockModal backAccessibilityLabel="Back" onBackButtonClick={onBackButtonClick} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));
    fireEvent.press(screen.getByLabelText('Back'));

    expect(onBackButtonClick).toHaveBeenCalledTimes(1);
  });

  it('renders modal title', async () => {
    const title = 'Modal Title';
    render(
      <DefaultThemeProvider>
        <MockModal title={title} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));

    expect(await screen.findByText(title)).toBeTruthy();
  });

  it('renders modal body', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));

    expect(await screen.findByText(loremIpsum)).toBeTruthy();
  });

  it('renders modal body without dividers', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal hideDividers />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));

    expect(await screen.findByText(loremIpsum)).toBeTruthy();
  });

  it('renders modal footer', () => {
    render(
      <DefaultThemeProvider>
        <MockModal />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));

    expect(screen.getByTestId('modal-footer')).toBeTruthy();
  });

  it('triggers close animation on footer action press', () => {
    const onRequestClose = jest.fn();
    const animationParallelSpy = jest.spyOn(Animated, 'parallel');
    const animationTimingSpy = jest.spyOn(Animated, 'timing');

    render(
      <DefaultThemeProvider>
        <MockModal visible onRequestClose={onRequestClose} />
      </DefaultThemeProvider>,
    );

    // press on footer action
    fireEvent.press(screen.getByTestId('modal-footer-save'));

    expect(animationParallelSpy).toHaveBeenCalled();
    expect(animationTimingSpy).toHaveBeenCalled();
  });

  it('sets accessible labels on close button', () => {
    render(
      <DefaultThemeProvider>
        <MockModal closeAccessibilityHint="Close button hint" closeAccessibilityLabel="Close" />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));

    expect(screen.getByLabelText('Close')).toBeTruthy();
    expect(screen.getByHintText('Close button hint')).toBeTruthy();
  });

  it('sets accessible labels on back button', () => {
    render(
      <DefaultThemeProvider>
        <MockModal
          backAccessibilityHint="Back button hint"
          backAccessibilityLabel="Back"
          onBackButtonClick={jest.fn()}
        />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Open Modal'));

    expect(screen.getByLabelText('Back')).toBeTruthy();
    expect(screen.getByHintText('Back button hint')).toBeTruthy();
  });
});
