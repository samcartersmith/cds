import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import React from 'react';
import { Modal as RNModal, ScrollView } from 'react-native';
import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { Box, HStack, VStack } from '../../layout';
import { TextLabel2 } from '../../typography';
import { Modal as CDSModal } from '../Modal/Modal';
import { Tooltip } from '../Tooltip/Tooltip';

const topTextSubject = 'TOP';
const bottomTextSubject = 'BOTTOM';

const shortText = 'This is the short text.';
const longText =
  'This is the really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really long text.';

const Content = ({
  title,
  tooltipText,
  yShiftByStatusBarHeight,
}: {
  title: string;
  tooltipText: string;
  yShiftByStatusBarHeight?: boolean;
}) => {
  return (
    <Example title={title}>
      <VStack gap={8} background="backgroundAlternate" spacingVertical={2} height={800}>
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
          <Tooltip content={tooltipText} yShiftByStatusBarHeight={yShiftByStatusBarHeight}>
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip content={tooltipText} yShiftByStatusBarHeight={yShiftByStatusBarHeight}>
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip content={tooltipText} yShiftByStatusBarHeight={yShiftByStatusBarHeight}>
            <Icon name="info" size="s" />
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-around">
          <Tooltip
            content={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            placement="bottom"
          >
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip
            content={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            placement="bottom"
          >
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
          <Tooltip
            content={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            placement="bottom"
          >
            <TextLabel2>{bottomTextSubject}</TextLabel2>
          </Tooltip>
        </HStack>
        <HStack justifyContent="space-evenly">
          <Tooltip
            content={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            placement="bottom"
          >
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip
            content={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            placement="bottom"
          >
            <Icon name="info" size="s" />
          </Tooltip>
          <Tooltip
            content={tooltipText}
            yShiftByStatusBarHeight={yShiftByStatusBarHeight}
            placement="bottom"
          >
            <Icon name="info" size="s" />
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
      <Box spacingTop={8}>
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
      <CDSModal visible={visible} onRequestClose={toggleOff}>
        {({ closeModal }) => (
          <ModalContent openModalText="Close CDS Modal Test" closeModal={closeModal} />
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
        <VStack spacingTop={6} width="100%">
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
          openModalText="Close RN Modal Test"
          closeModal={toggleOff}
          yShiftByStatusBarHeight={yShiftByStatusBarHeight}
        />
      </RNModal>
    </>
  );
};

const TooltipV2Screen = () => {
  return (
    <ExampleScreen>
      <CDSModalTest />
      <RNModalTest />
      <Content title="Short Text Tooltip" tooltipText={shortText} />
      <Content title="Long Text Tooltip" tooltipText={longText} />
    </ExampleScreen>
  );
};

export default TooltipV2Screen;
