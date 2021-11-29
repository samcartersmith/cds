import React from 'react';
import { Icon } from '@cbhq/cds-mobile/icons/Icon';
import { PressableOpacity } from '@cbhq/cds-mobile/system/PressableOpacity';
import { GestureResponderEvent } from 'react-native';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

function onPress(event: GestureResponderEvent) {
  // eslint-disable-next-line no-console
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const PressableOpacityScreen = () => {
  return (
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default PressableOpacityScreen;
