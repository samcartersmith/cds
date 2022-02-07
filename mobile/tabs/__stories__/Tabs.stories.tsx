// TODO remove when https://github.cbhq.net/frontend/web/pull/62 lands
/* eslint-disable react-native/no-raw-text */
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Tab, Tabs, TabLabel } from '..';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { TextBody } from '../../typography';

const TabsScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tabs" spacing={gutter} overflow="visible">
        <Tabs>
          <HStack gap={4}>
            <TabLabel>Primary TabLabel</TabLabel>
          </HStack>
          <Tab id="tab-1" label="Tab one">
            <HStack>
              <TextBody>This is the first tab</TextBody>
            </HStack>
          </Tab>
          <Tab id="tab-2" label="Tab Two">
            <HStack>
              <TextBody>This is the second tab</TextBody>
            </HStack>
          </Tab>
        </Tabs>
      </Example>
    </ExampleScreen>
  );
};

export default TabsScreen;
