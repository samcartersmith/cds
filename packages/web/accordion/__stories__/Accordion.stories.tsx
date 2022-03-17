import { accordionBuilder, CreateAccordionProps } from '@cbhq/cds-common/internal/accordionBuilder';

import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';
import { Accordion, AccordionItem } from '..';

export default {
  component: Accordion,
  title: 'Core Components/Accordion',
};

export const { BasicAccordion, NoMedia, NoSubtitle, TitleOnly, LongContent } = accordionBuilder({
  Accordion,
  AccordionItem,
  TextBody,
  CellMedia,
  TextInput,
} as CreateAccordionProps);
