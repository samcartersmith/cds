import { Divider } from '@cbhq/cds-mobile/layout/Divider';
import { View } from 'react-native';

import Example from './internal/Example';
import Screen from './internal/Screen';

const DividerScreen = () => {
  return (
    <Screen>
      <Example title="Horizontal & light">
        <Divider color="line" direction="horizontal" />
      </Example>

      <Example title="Vertical & heavy">
        <View style={{ height: 100 }}>
          <Divider color="lineHeavy" direction="vertical" />
        </View>
      </Example>
    </Screen>
  );
};

export default DividerScreen;
