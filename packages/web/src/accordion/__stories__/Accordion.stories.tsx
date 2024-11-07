import { useMemo } from 'react';
import { accordionBuilder, CreateAccordionProps } from '@cbhq/cds-common/internal/accordionBuilder';
import { noop } from '@cbhq/cds-utils';

import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';
import { Accordion, AccordionItem } from '..';

export default {
  component: Accordion,
  title: 'Core Components/Accordion',
};

const { BasicAccordion, NoMedia, NoSubtitle, TitleOnly, LongContent } = accordionBuilder({
  Accordion,
  AccordionItem,
  TextBody,
  CellMedia,
  TextInput,
} as CreateAccordionProps);

export { BasicAccordion, LongContent, NoMedia, NoSubtitle, TitleOnly };

export const CustomStyle = () => {
  const customStyle = useMemo(
    () => ({
      paddingLeft: '20px',
      paddingRight: '20px',
    }),
    [],
  );
  return (
    <Accordion defaultActiveKey="2" onChange={noop} style={customStyle}>
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
        onPress={noop}
        style={customStyle}
        subtitle="subtitle2"
        title="Accordion #2"
      >
        <TextBody as="p">Accordion Content</TextBody>
      </AccordionItem>
    </Accordion>
  );
};
