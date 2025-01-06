import { fireEvent, render, screen } from '@testing-library/react-native';
import { accordionBuilder } from '@cbhq/cds-common2/internal/accordionBuilder';
import { noop } from '@cbhq/cds-utils';

import { CellMedia } from '../../cells/CellMedia';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';

const { MockAccordion } = accordionBuilder({
  Accordion,
  AccordionItem,
  CellMedia,
  TextBody,
  TextInput,
});

describe('Accordion', () => {
  it('passes a11y', () => {
    render(<MockAccordion />);

    expect(screen.getByTestId('mock-accordion-item1-header')).toBeAccessible();
  });

  it('triggers on press', () => {
    const onChange = jest.fn();
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();

    render(<MockAccordion onChange={onChange} onPress1={onPress1} onPress2={onPress2} />);

    fireEvent.press(screen.getByTestId('mock-accordion-item1-header'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('1');

    expect(onPress1).toHaveBeenCalledTimes(1);
    expect(onPress1).toHaveBeenCalledWith('1');

    fireEvent.press(screen.getByTestId('mock-accordion-item2-header'));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('2');

    expect(onPress2).toHaveBeenCalledTimes(1);
    expect(onPress2).toHaveBeenCalledWith('2');
  });

  it('renders titles', () => {
    render(<MockAccordion />);

    expect(screen.getByText('Accordion #1')).toBeTruthy();
    expect(screen.getByText('subtitle1')).toBeTruthy();
    expect(screen.getByText('Accordion #2')).toBeTruthy();
    expect(screen.getByText('subtitle2')).toBeTruthy();
  });

  it('renders media', () => {
    render(<MockAccordion />);

    expect(screen.getByTestId('mock-accordion-item1-media')).toBeTruthy();
    expect(screen.getByTestId('mock-accordion-item2-media')).toBeTruthy();
  });

  it('renders children', () => {
    render(<MockAccordion />);

    expect(screen.getByText('Accordion Content1')).toBeTruthy();
    expect(screen.getByText('Accordion Content2')).toBeTruthy();
  });

  it('can override styles', () => {
    render(
      <Accordion
        defaultActiveKey="2"
        onChange={noop}
        style={{ padding: 20 }}
        testID="mock-accordion"
      >
        <AccordionItem
          itemKey="1"
          onPress={noop}
          style={{ padding: 30 }}
          subtitle="subtitle1"
          testID="mock-accordion-item1"
          title="Accordion #1"
        >
          <TextBody>Accordion Content1</TextBody>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          onPress={noop}
          subtitle="subtitle2"
          testID="mock-accordion-item2"
          title="Accordion #2"
        >
          <TextBody>Accordion Content2</TextBody>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId('mock-accordion')).toHaveStyle('padding: 20');
    expect(screen.getByTestId('mock-accordion-item1')).toHaveStyle('padding: 30');
  });
});
