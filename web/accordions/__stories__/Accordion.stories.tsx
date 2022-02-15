import { accordionBuilder, CreateAccordionProps } from '@cbhq/cds-common/internal/accordionBuilder';

import { Accordion, AccordionItem } from '..';
import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';

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
