import React from 'react';
import type {
  AccordionBaseProps,
  AccordionItemBaseProps,
  TextBaseProps,
  CellMediaProps,
} from '../types';

export type CreateAccordionProps = {
  Accordion: React.ComponentType<AccordionBaseProps>;
  AccordionItem: React.ComponentType<AccordionItemBaseProps>;
  TextBody: React.ComponentType<TextBaseProps & { as?: string }>;
  CellMedia: React.ComponentType<CellMediaProps>;
};

type OnPress = (key: string) => void;
type MockAccordionProps = {
  onItemPress?: OnPress;
  onPress1?: OnPress;
  onPress2?: OnPress;
};

export function accordionBuilder({
  Accordion,
  AccordionItem,
  TextBody,
  CellMedia,
}: CreateAccordionProps) {
  const MockAccordion = ({ onItemPress, onPress1, onPress2 }: MockAccordionProps) => {
    return (
      <Accordion defaultActiveKey="2" onItemPress={onItemPress} testID="mock-accordion">
        <AccordionItem
          itemKey="1"
          title="Accordion #1"
          subtitle="subtitle1"
          media={<CellMedia type="icon" name="wallet" testID="mock-accordion-item1-media" />}
          testID="mock-accordion-item1"
          onPress={onPress1}
        >
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          title="Accordion #2"
          subtitle="subtitle2"
          media={<CellMedia type="icon" name="wallet" testID="mock-accordion-item2-media" />}
          onPress={onPress2}
          testID="mock-accordion-item2"
        >
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  return {
    MockAccordion,
  };
}
