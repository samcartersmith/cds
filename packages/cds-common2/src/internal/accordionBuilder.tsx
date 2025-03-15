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
  Text: React.ComponentType<React.PropsWithChildren<TextBaseProps & { as?: string }>>;
  CellMedia: React.ComponentType<React.PropsWithChildren<CellMediaProps>>;
  TextInput: React.ComponentType<React.PropsWithChildren<TextInputBaseProps>>;
};

type OnPress = (key: string | null) => void;

export type MockAccordionProps = {
  activeKey?: string;
  defaultActiveKey?: string;
  setActiveKey?: (activeKey: string | null) => void;
  onChange?: OnPress;
  onPress1?: OnPress;
  onPress2?: OnPress;
};

export function accordionBuilder({
  Accordion,
  AccordionItem,
  Text,
  CellMedia,
  TextInput,
}: CreateAccordionProps) {
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
          <Text as="p">Accordion Content</Text>
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
          <Text as="p">Accordion Content</Text>
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
          <Text as="p">Accordion Content</Text>
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
          <Text as="p">Accordion Content</Text>
        </AccordionItem>
      </Accordion>
    );
  };

  const LongContent = () => {
    return (
      <Accordion defaultActiveKey="2" onChange={handlePress}>
        <AccordionItem itemKey="1" title="Accordion #1">
          <Text as="p">{loremIpsum.repeat(10)}</Text>
        </AccordionItem>
        <AccordionItem itemKey="2" onPress={handlePress} title="Accordion #2">
          <Text as="p">Accordion Content</Text>
        </AccordionItem>
      </Accordion>
    );
  };

  const MockAccordion = ({
    activeKey,
    defaultActiveKey,
    setActiveKey,
    onChange,
    onPress1,
    onPress2,
  }: MockAccordionProps) => {
    return (
      <Accordion
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        onChange={onChange}
        setActiveKey={setActiveKey}
        testID="mock-accordion"
      >
        <AccordionItem
          itemKey="1"
          media={<CellMedia name="wallet" testID="mock-accordion-item1-media" type="icon" />}
          onPress={onPress1}
          subtitle="subtitle1"
          testID="mock-accordion-item1"
          title="Accordion #1"
        >
          <Text as="p">Accordion Content1</Text>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          media={<CellMedia name="wallet" testID="mock-accordion-item2-media" type="icon" />}
          onPress={onPress2}
          subtitle="subtitle2"
          testID="mock-accordion-item2"
          title="Accordion #2"
        >
          <Text as="p">Accordion Content2</Text>
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
