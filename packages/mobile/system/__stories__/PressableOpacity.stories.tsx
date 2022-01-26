import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { PressableOpacity } from '../PressableOpacity';

function onPress(event: GestureResponderEvent) {
  // eslint-disable-next-line no-console
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const PressableOpacityScreen = () => {
  return (
    <ExampleScreen>
      <Example title="PressableOpacity">
        <PressableOpacity
          hitSlop={8}
          onPress={onPress}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 40,
            width: 40,
          }}
        >
          <Icon name="bell" size="s" color="foreground" />
        </PressableOpacity>
      </Example>
    </ExampleScreen>
  );
};

export default PressableOpacityScreen;
