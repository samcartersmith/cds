import { useCallback, useState } from 'react';
import { ComponentStoryObj } from '@storybook/react';

import { VStack } from '../../alpha/VStack';
import { Button } from '../../buttons';
import { TextBody, TextHeadline } from '../../typography';
import { AccessibilityAnnouncer, AccessibilityAnnouncerProps } from '../AccessibilityAnnouncer';

const DEFAULT_MESSAGE =
  'This is a title we would want to display, but the announcement is a little more catered to a person navigating with a screen reader.';

const MockAppScreen = ({ message, ...rest }: AccessibilityAnnouncerProps) => {
  const [internalMessage, updateInternalMessage] = useState(message);

  const handleMessageChange = useCallback(() => {
    updateInternalMessage(
      internalMessage === message ? 'Look, something new and special!' : message,
    );
  }, [internalMessage, message]);

  return (
    <VStack gap={2}>
      <TextHeadline as="h2">Open VoiceOver and update the Message field 👀</TextHeadline>
      <>
        <TextBody as="p" aria-hidden>
          {message}
        </TextBody>
        <AccessibilityAnnouncer message={internalMessage} {...rest} />
      </>
      <Button onPress={handleMessageChange}>Update message</Button>
    </VStack>
  );
};

export default {
  title: 'Core Components/AccessibilityAnnouncer',
  component: MockAppScreen,
  args: { message: DEFAULT_MESSAGE },
};

export const Default: ComponentStoryObj<typeof MockAppScreen> = {
  ...MockAppScreen,
};

export const Assertive: ComponentStoryObj<typeof MockAppScreen> = {
  ...MockAppScreen,
  args: {
    politeness: 'assertive',
    message:
      "It isn't common we would want to display alternate text to screen readers, but it is sometimes important",
  },
};
