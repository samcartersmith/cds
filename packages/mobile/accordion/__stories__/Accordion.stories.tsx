import React from 'react';
import { accordionBuilder } from '@cbhq/cds-common/internal/accordionBuilder';
import { noop } from '@cbhq/cds-utils';

import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { Example, ExampleProps, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography';
import { Accordion, AccordionItem } from '..';

const { BasicAccordion, NoMedia, NoSubtitle, TitleOnly, LongContent } = accordionBuilder({
  Accordion,
  AccordionItem,
  TextBody,
  CellMedia,
  TextInput,
});

const AccordionExample = ({ children, title }: ExampleProps) => {
  return (
    <Example spacing={0} title={title} titleSpacing={{ spacingHorizontal: 3, spacingTop: 2 }}>
      {children}
    </Example>
  );
};

const AccordionScreen = () => {
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
          onItemPress={noop}
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
            <TextBody>Accordion Content</TextBody>
          </AccordionItem>
        </Accordion>
      </AccordionExample>
    </ExampleScreen>
  );
};

export default AccordionScreen;
