import { Accordion, AccordionItem } from '..';
import { CellMedia } from '../../cells';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';

export default {
  component: Accordion,
  title: 'Core Components/Accordion',
};

export const BasicAccordion = () => {
  // eslint-disable-next-line no-console
  const handlePress = console.log;
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

export const SingleAccordionItem = () => {
  return (
    <Accordion defaultActiveKey="1">
      <AccordionItem itemKey="1" title="Accordion #1" subtitle="subtitle1">
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
    </Accordion>
  );
};

export const CollapsedAccordion = () => {
  return (
    <Accordion>
      <AccordionItem itemKey="1" title="Accordion #1">
        <TextInput compact label="Amount" placeholder="8293323.23" suffix="USD" />
      </AccordionItem>
      <AccordionItem itemKey="2" title="Accordion #2">
        <TextBody as="p">Accordion Content</TextBody>
      </AccordionItem>
    </Accordion>
  );
};
