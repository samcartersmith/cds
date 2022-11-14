import { useToggler } from '@cbhq/cds-common';
import { loremIpsum } from '@cbhq/cds-common/internal/data/loremIpsum';

import { Accordion, AccordionItem } from '../../accordion';
import { IconButton } from '../../buttons';
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

export const Basic = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box height={800} background="backgroundAlternate">
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  const secondaryContent = (
    <Box height={800} background="backgroundAlternate">
      <TextBody as="p">Secondary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button onPress={toggleOn} ref={triggerRef}>
        Open Modal
      </Button>
      <FullscreenModal
        visible={visible}
        onRequestClose={toggleOff}
        onDidClose={focusTrigger}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
      />
    </>
  );
};

export const NoTitle = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box height={800} background="backgroundAlternate">
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  const secondaryContent = (
    <Box height={800} background="backgroundAlternate">
      <TextBody as="p">Secondary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button onPress={toggleOn} ref={triggerRef}>
        Open Modal
      </Button>
      <FullscreenModal
        visible={visible}
        onRequestClose={toggleOff}
        onDidClose={focusTrigger}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
      />
    </>
  );
};

export const NoSecondary = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const primaryContent = (
    <Box height={800} background="backgroundAlternate">
      <TextBody as="p">Primary Content {loremIpsum}</TextBody>
    </Box>
  );

  return (
    <>
      <Button onPress={toggleOn} ref={triggerRef}>
        Open Modal
      </Button>
      <FullscreenModal
        visible={visible}
        onRequestClose={toggleOff}
        onDidClose={focusTrigger}
        primaryContent={primaryContent}
        title="Modal title"
      />
    </>
  );
};

export const Example = () => {
  const [visible, { toggleOn, toggleOff }] = useToggler(true);
  const { triggerRef, focusTrigger } = useTriggerFocus();

  const feedCard = (
    <FeedCard
      avatarUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
      headerMetaData="Dec 18"
      headerDescription="Earn crypto"
      headerActionNode={
        <IconButton
          accessibilityLabel="More actions"
          name="more"
          variant="foregroundMuted"
          transparent
        />
      }
      bodyTitle="Learn AMP. Earn $3 in AMP."
      bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
      bodyMediaUrl="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png"
      bodyOrientation="vertical"
      footerActions={
        <Button compact variant="secondary">
          Earn AMP
        </Button>
      }
    />
  );

  const listcell = (
    <ListCell
      title="Bitcoin"
      description="BTC"
      detail="$45,123"
      subdetail="+4.55%"
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
    <Box borderRadius="standard" elevation={1} overflow="hidden">
      <Accordion defaultActiveKey="2">
        <AccordionItem itemKey="1" title="Accordion #1" subtitle="subtitle1">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
        <AccordionItem itemKey="2" title="Accordion #2" subtitle="subtitle2">
          <TextBody as="p">{loremIpsum}</TextBody>
        </AccordionItem>
      </Accordion>
    </Box>
  );

  return (
    <>
      <Button onPress={toggleOn} ref={triggerRef}>
        Open Modal
      </Button>
      <FullscreenModal
        visible={visible}
        onRequestClose={toggleOff}
        onDidClose={focusTrigger}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        title="Modal title"
      />
    </>
  );
};
