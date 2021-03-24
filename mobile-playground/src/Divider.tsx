import { Box, Divider, HStack } from '@cbhq/cds-mobile/layout';

import Example from './internal/Example';
import Screen from './internal/Screen';

const DividerScreen = () => {
  return (
    <Screen>
      <Example title="Horizontal & light">
        <Divider color="line" direction="horizontal" />
      </Example>

      <Example title="Vertical & heavy">
        <HStack>
          <Box height={100} width={100} background="backgroundAlternate" />
          <Divider color="lineHeavy" direction="vertical" />
          <Box height={100} width={100} background="backgroundAlternate" />
        </HStack>
      </Example>
    </Screen>
  );
};

export default DividerScreen;
