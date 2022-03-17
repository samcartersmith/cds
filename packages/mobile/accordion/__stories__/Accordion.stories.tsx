import React from 'react';
import { accordionBuilder } from '@cbhq/cds-common/internal/accordionBuilder';

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
    </ExampleScreen>
  );
};

export default AccordionScreen;
