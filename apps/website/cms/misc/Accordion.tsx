import React, { memo } from 'react';
import { Document } from '@contentful/rich-text-types';
import { Entry } from 'contentful';
import { AccordionBaseProps, AccordionItemBaseProps } from '@cbhq/cds-common';
import { Accordion as CDSAccordion, AccordionItem } from '@cbhq/cds-web/accordion';

import { RichText } from './RichText';

export type AccordionFields = {
  defaultActiveKey?: AccordionBaseProps['defaultActiveKey'];
  items: Entry<AccordionItemFields>[];
} & Pick<AccordionBaseProps, 'defaultActiveKey'>;

export type AccordionItemFields = {
  content?: Document;
} & Pick<AccordionItemBaseProps, 'title' | 'subtitle'>;

export const Accordion = memo(function Accordion({ defaultActiveKey, items }: AccordionFields) {
  return (
    <CDSAccordion defaultActiveKey={defaultActiveKey}>
      {items.map(({ fields: { title, subtitle, content } }) => (
        <AccordionItem
          key={title}
          itemKey={title}
          maxHeight={1000}
          subtitle={subtitle}
          title={title}
        >
          <RichText content={content} />
        </AccordionItem>
      ))}
    </CDSAccordion>
  );
});
