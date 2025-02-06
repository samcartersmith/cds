import React, { useCallback, useRef } from 'react';
import { Modal as RNModal, ScrollView, View } from 'react-native';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useA11y } from '../../hooks/useA11y';
import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { TextLabel2 } from '../../typography';
import { Modal as CDSModal } from '../modal/Modal';
import { Tooltip } from '../tooltip/Tooltip';

type ContentTypes = {
  title: string;
  tooltipText: string;
  yShiftByStatusBarHeight?: boolean;
};

const topTextSubject = 'TOP';
const bottomTextSubject = 'BOTTOM';
const customTextSubject = 'CUSTOM';

const shortText = 'This is the short text.';
const longText =
  'This is the really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really long text.';

const ToolTipWithA11y = ({ tooltipText, yShiftByStatusBarHeight }: Omit<ContentTypes, 'title'>) => {
  const triggerRef = useRef(null);
  const { setA11yFocus } = useA11y();

  const handleClose = useCallback(() => {
    // return a11y focus to trigger
    setA11yFocus(triggerRef);
  }, [setA11yFocus]);

  return (
    <Tooltip
      accessibilityLabel="Info"
      content={tooltipText}
      onCloseTooltip={handleClose}
      yShiftByStatusBarHeight={yShiftByStatusBarHeight}
    >
      <View ref={triggerRef}>
        <Icon name="info" size="s" />
      </View>
    </Tooltip>
  );
};

const Content = ({ title, tooltipText, yShiftByStatusBarHeight }: ContentTypes) => {
  return (
    <Example title={title}>
      <VStack background="bgAlternate" gap={8} height={800} paddingY={2}>
        <HStack justifyContent="space-around">
          <Tooltip content={tooltipText} yShiftByStatusBarHeight={yShiftByStatusBarHeight}>
            <TextLabel2>{topTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip content={tooltipText} yShiftByStatusBarHeight={yShiftByStatusBarHeight}>
            <TextLabel2>{topTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip content={tooltipText} yShiftByStatusBarHeight={yShiftByStatusBarHeight}>
            <TextLabel2>{topTextSubject}</TextLabel2>
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-evenly">
          <ToolTipWithA11y
            tooltipText={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          />
          <ToolTipWithA11y
            tooltipText={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          />
          <ToolTipWithA11y
            tooltipText={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          />
        </HStack>
        <HStack justifyContent="space-around">
          <Tooltip
            content={tooltipText}
            placement="bottom"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip
            content={tooltipText}
            placement="bottom"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip
            content={tooltipText}
            placement="bottom"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-evenly">
          <Tooltip
            accessibilityLabel="Info"
            content={tooltipText}
            placement="bottom"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip
            accessibilityLabel="Info"
            content={tooltipText}
            placement="bottom"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip
            accessibilityLabel="Info"
            content={tooltipText}
            placement="bottom"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <Icon name="info" size="s" />
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-evenly">
          <Tooltip
            content={tooltipText}
            elevation={2}
            invertSpectrum={false}
            placement="top"
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
          >
            <TextLabel2>{customTextSubject}</TextLabel2>
          </Tooltip>
        </HStack>
      </VStack>
    </Example>
  );
};

const ModalContent = ({
  openModalText,
  closeModal,
  yShiftByStatusBarHeight,
}: {
  openModalText: string;
  closeModal: () => void;
  yShiftByStatusBarHeight?: boolean;
}) => {
  return (
    <ScrollView>
      <Box paddingTop={8}>
        <Button onPress={closeModal}>{openModalText}</Button>
        <Content
          title="In Modal: Short Text Tooltip"
          tooltipText={shortText}
          yShiftByStatusBarHeight={yShiftByStatusBarHeight}
        />
        <Content
          title="In Modal: Long Text Tooltip"
          tooltipText={longText}
          yShiftByStatusBarHeight={yShiftByStatusBarHeight}
        />
      </Box>
    </ScrollView>
  );
};

const CDSModalTest = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler();

  return (
    <>
      <Button onPress={toggleOn}>Open CDS Modal Test</Button>
      <CDSModal onRequestClose={toggleOff} visible={visible}>
        {({ closeModal }) => (
          <ModalContent closeModal={closeModal} openModalText="Close CDS Modal Test" />
        )}
      </CDSModal>
    </>
  );
};

const RNModalTest = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler();
  // This is an important edge case that needs to be known. statusBarTranslucent impacts measurement on Android.
  const [
    statusBarTranslucent,
    { toggleOn: toggleOnStatusBarTranslucent, toggleOff: toggleOffStatusBarTranslucent },
  ] = useToggler(true);

  const [
    yShiftByStatusBarHeight,
    {
      toggleOn: toggleOnShiftMeasurementByStatusBar,
      toggleOff: toggleOffShiftMeasurementByStatusBar,
    },
  ] = useToggler(true);

  return (
    <>
      <Button onPress={toggleOn}>Open RN Modal Test 2</Button>
      <RNModal statusBarTranslucent={statusBarTranslucent} visible={visible}>
        <VStack paddingTop={6} width="100%">
          <Button compact onPress={toggleOnStatusBarTranslucent}>
            Toggle on statusBarTranslucent
          </Button>
          <Button compact onPress={toggleOffStatusBarTranslucent}>
            Toggle off statusBarTranslucent
          </Button>
          <Button compact onPress={toggleOnShiftMeasurementByStatusBar}>
            Toggle on Status Bar Measurement Shift
          </Button>
          <Button compact onPress={toggleOffShiftMeasurementByStatusBar}>
            Toggle off Status Bar Measurement Shift
          </Button>
          <TextLabel2>CDSModal Default: statusBarTranslucent=true</TextLabel2>
          <TextLabel2>{`statusBarTranslucent: ${statusBarTranslucent}`}</TextLabel2>
          <TextLabel2>{`yShiftByStatusBarHeight: ${yShiftByStatusBarHeight}`}</TextLabel2>
        </VStack>
        <ModalContent
          closeModal={toggleOff}
          openModalText="Close RN Modal Test"
          yShiftByStatusBarHeight={yShiftByStatusBarHeight}
        />
      </RNModal>
    </>
  );
};

const DisabledTest = () => {
  return (
    <Example title="Non Visible Tooltip">
      <Tooltip content="Disabled Tooltip" visible={false}>
        <Button disabled>Disabled</Button>
      </Tooltip>
    </Example>
  );
};

const TooltipV2Screen = () => {
  return (
    <ExampleScreen>
      <CDSModalTest />
      <RNModalTest />
      <Content title="Short Text Tooltip" tooltipText={shortText} />
      <Content title="Long Text Tooltip" tooltipText={longText} />
      <DisabledTest />
    </ExampleScreen>
  );
};

export default TooltipV2Screen;
