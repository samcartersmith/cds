/* eslint-disable react-native/no-raw-text */
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { TabIndicator } from '../TabIndicator';

import { Tab, Tabs, TabLabel } from '..';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { TextBody } from '../../typography';

const TabsScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Tabs" spacing={gutter} overflow="visible">
        <Tabs>
          <VStack>
            <HStack gap={4}>
              <TabLabel active>Primary TabLabel</TabLabel>
              <TabLabel>Primary TabLabel</TabLabel>
            </HStack>
            <TabIndicator width={138} xPosition={0} />
          </VStack>
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
