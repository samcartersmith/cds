import React from 'react';

import type {
  AccordionBaseProps,
  AccordionItemBaseProps,
  CellMediaProps,
  TextBaseProps,
  TextInputBaseProps,
} from '../types';

import { loremIpsum } from './data/loremIpsum';

export type CreateAccordionProps = {
  Accordion: React.ComponentType<React.PropsWithChildren<AccordionBaseProps>>;
  AccordionItem: React.ComponentType<React.PropsWithChildren<AccordionItemBaseProps>>;
  TextBody: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
  CellMedia: React.ComponentType<React.PropsWithChildren<CellMediaProps>>;
  TextInput: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>;
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
  TextInput,
}: CreateAccordionProps) {
  const handlePress = console.log;

  const BasicAccordion = () => {
    return (
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
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const NoMedia = () => {
    return (
      <Accordion onItemPress={handlePress}>
        <AccordionItem itemKey="1" title="Accordion #1" subtitle="subtitle1">
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem itemKey="2" title="Accordion #2" subtitle="subtitle2" onPress={handlePress}>
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const NoSubtitle = () => {
    return (
      <Accordion defaultActiveKey="1" onItemPress={handlePress}>
        <AccordionItem
          itemKey="1"
          title="Accordion #1"
          media={<CellMedia type="icon" name="wallet" />}
        >
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          title="Accordion #2"
          media={<CellMedia type="icon" name="wallet" />}
          onPress={handlePress}
        >
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const TitleOnly = () => {
    return (
      <Accordion defaultActiveKey="2" onItemPress={handlePress}>
        <AccordionItem itemKey="1" title="Accordion #1">
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem itemKey="2" title="Accordion #2" onPress={handlePress}>
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const LongContent = () => {
    return (
      <Accordion defaultActiveKey="2" onItemPress={handlePress}>
        <AccordionItem itemKey="1" title="Accordion #1">
          <TextBody as="p">{loremIpsum.repeat(10)}</TextBody>
        </AccordionItem>
        <AccordionItem itemKey="2" title="Accordion #2" onPress={handlePress}>
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

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
          <TextBody as="p">Accordion Content1</TextBody>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          title="Accordion #2"
          subtitle="subtitle2"
          media={<CellMedia type="icon" name="wallet" testID="mock-accordion-item2-media" />}
          onPress={onPress2}
          testID="mock-accordion-item2"
        >
          <TextBody as="p">Accordion Content2</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  return {
    BasicAccordion,
    NoMedia,
    NoSubtitle,
    TitleOnly,
    LongContent,
    MockAccordion,
  };
}
