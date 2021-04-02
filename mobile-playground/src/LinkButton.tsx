import { LinkButton } from '@cbhq/cds-mobile/buttons/LinkButton';
import { GestureResponderEvent } from 'react-native';

import Example from './internal/Example';
import Screen from './internal/Screen';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const LinkButtonScreen = () => {
  return (
    <Screen>
      <Example inline>
        <LinkButton onPress={onPress}>Link</LinkButton>
        <LinkButton compact onPress={onPress}>
          Compact link
        </LinkButton>

        <LinkButton block onPress={onPress}>
          Full-width link
        </LinkButton>
        <LinkButton compact block onPress={onPress}>
          Compact full-width link
        </LinkButton>
      </Example>

      <Example title="States" inline>
        <LinkButton disabled>Disabled</LinkButton>
      </Example>

      <Example title="Variants" inline>
        <LinkButton variant="primary">Primary</LinkButton>
        <LinkButton compact variant="primary">
          Compact primary
        </LinkButton>

        <LinkButton variant="secondary">Secondary</LinkButton>
        <LinkButton compact variant="secondary">
          Compact secondary
        </LinkButton>

        <LinkButton variant="negative">Negative</LinkButton>
        <LinkButton compact variant="negative">
          Compact negative
        </LinkButton>
      </Example>
    </Screen>
  );
};

export default LinkButtonScreen;
