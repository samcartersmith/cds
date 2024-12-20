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
  onChange?: OnPress;
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
  // eslint-disable-next-line no-console
  const handlePress = console.log;

  const BasicAccordion = () => {
    return (
      <Accordion defaultActiveKey="2" onChange={handlePress}>
        <AccordionItem
          itemKey="1"
          media={<CellMedia name="wallet" type="icon" />}
          subtitle="subtitle1"
          title="Accordion #1"
        >
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          media={<CellMedia name="wallet" type="icon" />}
          onPress={handlePress}
          subtitle="subtitle2"
          title="Accordion #2"
        >
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const NoMedia = () => {
    return (
      <Accordion onChange={handlePress}>
        <AccordionItem itemKey="1" subtitle="subtitle1" title="Accordion #1">
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem itemKey="2" onPress={handlePress} subtitle="subtitle2" title="Accordion #2">
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const NoSubtitle = () => {
    return (
      <Accordion defaultActiveKey="1" onChange={handlePress}>
        <AccordionItem
          itemKey="1"
          media={<CellMedia name="wallet" type="icon" />}
          title="Accordion #1"
        >
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          media={<CellMedia name="wallet" type="icon" />}
          onPress={handlePress}
          title="Accordion #2"
        >
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const TitleOnly = () => {
    return (
      <Accordion defaultActiveKey="2" onChange={handlePress}>
        <AccordionItem itemKey="1" title="Accordion #1">
          <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
        </AccordionItem>
        <AccordionItem itemKey="2" onPress={handlePress} title="Accordion #2">
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const LongContent = () => {
    return (
      <Accordion defaultActiveKey="2" onChange={handlePress}>
        <AccordionItem itemKey="1" title="Accordion #1">
          <TextBody as="p">{loremIpsum.repeat(10)}</TextBody>
        </AccordionItem>
        <AccordionItem itemKey="2" onPress={handlePress} title="Accordion #2">
          <TextBody as="p">Accordion Content</TextBody>
        </AccordionItem>
      </Accordion>
    );
  };

  const MockAccordion = ({ onChange, onPress1, onPress2 }: MockAccordionProps) => {
    return (
      <Accordion defaultActiveKey="2" onChange={onChange} testID="mock-accordion">
        <AccordionItem
          itemKey="1"
          media={<CellMedia name="wallet" testID="mock-accordion-item1-media" type="icon" />}
          onPress={onPress1}
          subtitle="subtitle1"
          testID="mock-accordion-item1"
          title="Accordion #1"
        >
          <TextBody as="p">Accordion Content1</TextBody>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          media={<CellMedia name="wallet" testID="mock-accordion-item2-media" type="icon" />}
          onPress={onPress2}
          subtitle="subtitle2"
          testID="mock-accordion-item2"
          title="Accordion #2"
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
