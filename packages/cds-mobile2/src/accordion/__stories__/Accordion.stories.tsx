import React, { useState } from 'react';
import { accordionBuilder } from '@cbhq/cds-common2/internal/accordionBuilder';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons/Button';
import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { Example, ExampleProps, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { Accordion, AccordionItem } from '..';

const STEPS = [
  { itemKey: '1', nextKey: '2' },
  { itemKey: '2', nextKey: '3' },
  { itemKey: '3', nextKey: '1' },
];

const { BasicAccordion, NoMedia, NoSubtitle, TitleOnly, LongContent } = accordionBuilder({
  Accordion,
  AccordionItem,
  Text,
  CellMedia,
  TextInput,
});

const AccordionExample = ({ children, title }: ExampleProps) => {
  return (
    <Example padding={0} title={title} titlePadding={{ paddingX: 3, paddingTop: 2 }}>
      {children}
    </Example>
  );
};

const AccordionScreen = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  return (
    <ExampleScreen>
      <AccordionExample title="Basic Accordion">
        <BasicAccordion />
      </AccordionExample>
      <AccordionExample inline title="Long content">
        <LongContent />
      </AccordionExample>
      <AccordionExample inline title="No media + collapsed">
        <NoMedia />
      </AccordionExample>
      <AccordionExample inline title="No subtitle">
        <NoSubtitle />
      </AccordionExample>
      <AccordionExample inline title="Title only">
        <TitleOnly />
      </AccordionExample>
      <AccordionExample inline title="Custom Style">
        <Accordion
          defaultActiveKey="2"
          onChange={noop}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <AccordionItem
            itemKey="1"
            media={<CellMedia name="wallet" type="icon" />}
            subtitle="subtitle1"
            title="Accordion #1"
          >
            <TextInput
              compact
              accessibilityLabel="Text input field"
              label="Amount"
              placeholder="8293323.23"
              suffix="USD"
            />
          </AccordionItem>
          <AccordionItem
            itemKey="2"
            media={<CellMedia name="wallet" type="icon" />}
            onPress={noop}
            style={{
              paddingHorizontal: 20,
            }}
            subtitle="subtitle2"
            title="Accordion #2"
          >
            <Text>Accordion Content</Text>
          </AccordionItem>
        </Accordion>
      </AccordionExample>
      <AccordionExample title="Nested Buttons">
        <Accordion activeKey={activeKey} setActiveKey={setActiveKey}>
          {STEPS.map(({ itemKey, nextKey }) => (
            <AccordionItem
              key={itemKey}
              itemKey={itemKey}
              media={<CellMedia name="wallet" type="icon" />}
              title={`Item ${itemKey}`}
            >
              <Button onPress={() => setActiveKey(nextKey)}>
                <Text>Open Item {nextKey}</Text>
              </Button>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionExample>
    </ExampleScreen>
  );
};

export default AccordionScreen;
