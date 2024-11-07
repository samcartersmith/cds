import { useToggler } from '@cbhq/cds-common';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { Accordion, AccordionItem } from '../../accordion';
import { Button } from '../../buttons/Button';
import { FeedCard } from '../../cards/FeedCard';
import { ListCell } from '../../cells';
import { useTriggerFocus } from '../../hooks/useTriggerFocus';
import { Box, VStack } from '../../layout';
import { TextBody, TextTitle1 } from '../../typography';
import { FullscreenModal } from '../Modal/FullscreenModal';

export default {
  title: 'Core Components/FullscreenModal',
  component: FullscreenModal,
  parameters: {
    a11y: {
      config: {
        /** Heading order issue is coming from Card. We need to either fix in Card or deprecate */
        rules: [{ id: 'heading-order', selector: '*:not(h3)' }],
      },
    },
  },
};

const contentStyle = { justifyContent: 'center', marginLeft: 'auto' };

export const Basic = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  const secondaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Secondary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        onDidClose={focusTrigger}
        onRequestClose={toggleOff}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const NoTitle = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  const secondaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Secondary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open Modal
      </Button>
      <FullscreenModal
        accessibilityLabel="Modal context info"
        closeAccessibilityLabel="Close modal"
        onDidClose={focusTrigger}
        onRequestClose={toggleOff}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        visible={visible}
      />
    </>
  );
};

export const NoSecondary = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        onDidClose={focusTrigger}
        onRequestClose={toggleOff}
        primaryContent={primaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const Example = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const feedCard = (
    <FeedCard
      author="Earn crypto"
      avatar="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
      description="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      headerAction={{
        name: 'more',
        variant: 'foregroundMuted',
      }}
      image="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
      mediaPlacement="above"
      metadata="Dec 18"
      title="Learn AMP. Earn $3 in AMP."
    />
  );

  const listcell = (
    <ListCell
      description="BTC"
      detail="$45,123"
      subdetail="+4.55%"
      title="Bitcoin"
      variant="positive"
    />
  );

  const primaryContent = (
    <VStack>
      <TextTitle1 as="h1">Fullscreen Modal</TextTitle1>
      <TextBody as="p">This is a test Fullscreen Modal with components composition.</TextBody>
      {feedCard}
      {listcell}
      {listcell}
      {listcell}
    </VStack>
  );

  const secondaryContent = (
    <Box borderRadius="rounded" elevation={1} overflow="hidden">
      <Accordion defaultActiveKey="2">
        <AccordionItem itemKey="1" subtitle="subtitle1" title="Accordion #1">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
        <AccordionItem itemKey="2" subtitle="subtitle2" title="Accordion #2">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
      </Accordion>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        onDidClose={focusTrigger}
        onRequestClose={toggleOff}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const SecondaryContentDivider = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  const secondaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Secondary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open Modal
      </Button>
      <FullscreenModal
        showSecondaryContentDivider
        closeAccessibilityLabel="Close modal"
        onDidClose={focusTrigger}
        onRequestClose={toggleOff}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};

export const CenterPrimary = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box background="backgroundAlternate" height={800}>
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button ref={triggerRef} onPress={toggleOn}>
        Open Modal
      </Button>
      <FullscreenModal
        closeAccessibilityLabel="Close modal"
        contentStyle={contentStyle}
        onDidClose={focusTrigger}
        onRequestClose={toggleOff}
        primaryContent={primaryContent}
        title="Modal title"
        visible={visible}
      />
    </>
  );
};
