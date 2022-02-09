import React from 'react';

import { Accordion, AccordionItem } from '..';
import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const AccordionScreen = () => {
  // eslint-disable-next-line no-console
  const handlePress = console.log;
  return (
    <ExampleScreen>
      <Example inline title="Basic Accordion">
        <Accordion defaultActiveKey="2" onItemPress={handlePress}>
          <AccordionItem
            itemKey="1"
            title="Accordion #1"
            subtitle="subtitle1"
            media={<CellMedia type="icon" name="wallet" />}
          >
            <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
          </AccordionItem>
          <AccordionItem
            itemKey="2"
            title="Accordion #2"
            subtitle="subtitle2"
            media={<CellMedia type="icon" name="wallet" />}
            onPress={handlePress}
          >
            <TextBody>Accordion Content</TextBody>
          </AccordionItem>
        </Accordion>
      </Example>
    </ExampleScreen>
  );
};

export default AccordionScreen;
