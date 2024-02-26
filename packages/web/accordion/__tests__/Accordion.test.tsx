import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { accordionBuilder, CreateAccordionProps } from '@cbhq/cds-common/internal/accordionBuilder';
import { noop } from '@cbhq/cds-utils';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { CellMedia } from '../../cells/CellMedia';
import { TextInput } from '../../controls';
import { TextBody } from '../../typography';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';
import { getAccordionHeaderId, getAccordionPanelId } from '../utils';

const { MockAccordion } = accordionBuilder({
  Accordion,
  AccordionItem,
  CellMedia,
  TextBody,
  TextInput,
} as CreateAccordionProps);
const customAccordionStyle = { padding: '20px' };
const customAccordionItemStyle = { padding: '30px' };

describe('Accordion', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockAccordion />)).toHaveNoViolations();
  });

  it('has a11y attributes', () => {
    render(<MockAccordion />);

    const item1Header = screen.getByTestId('mock-accordion-item1-header');
    const item1Panel = screen.getByTestId('mock-accordion-item1-panel');
    const item2Header = screen.getByTestId('mock-accordion-item2-header');
    const item2Panel = screen.getByTestId('mock-accordion-item2-panel');

    expect(item1Header).toHaveAttribute('aria-expanded', 'false');
    expect(item1Header).toHaveAttribute('aria-controls', getAccordionPanelId('1'));
    expect(item1Panel).toHaveAttribute('aria-labelledby', getAccordionHeaderId('1'));

    expect(item2Header).toHaveAttribute('aria-expanded', 'true');
    expect(item2Header).toHaveAttribute('aria-controls', getAccordionPanelId('2'));
    expect(item2Panel).toHaveAttribute('aria-labelledby', getAccordionHeaderId('2'));
  });

  it('triggers on press', () => {
    const onChange = jest.fn();
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();

    render(<MockAccordion onChange={onChange} onPress1={onPress1} onPress2={onPress2} />);

    fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('1');

    expect(onPress1).toHaveBeenCalledTimes(1);
    expect(onPress1).toHaveBeenCalledWith('1');

    fireEvent.click(screen.getByTestId('mock-accordion-item2-header'));

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('2');

    expect(onPress2).toHaveBeenCalledTimes(1);
    expect(onPress2).toHaveBeenCalledWith('2');
  });

  it('renders active key by default', () => {
    render(<MockAccordion />);

    expect(screen.getByTestId('mock-accordion-item1-panel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-accordion-item1-panel')).toHaveStyle('visibility: hidden');
    expect(screen.getByTestId('mock-accordion-item2-panel')).toBeInTheDocument();
    expect(screen.getByTestId('mock-accordion-item2-panel')).toHaveStyle('visibility: visible');
  });

  it('expand pressed panel and collapse expanded panel', () => {
    render(<MockAccordion />);

    fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

    expect(screen.getByTestId('mock-accordion-item1-header')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByTestId('mock-accordion-item2-header')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('renders titles', () => {
    render(<MockAccordion />);

    expect(screen.getByText('Accordion #1')).toBeVisible();
    expect(screen.getByText('subtitle1')).toBeVisible();
    expect(screen.getByText('Accordion #2')).toBeVisible();
    expect(screen.getByText('subtitle2')).toBeVisible();
  });

  it('renders media', () => {
    render(<MockAccordion />);

    expect(screen.getByTestId('mock-accordion-item1-media')).toBeVisible();
    expect(screen.getByTestId('mock-accordion-item2-media')).toBeVisible();
  });

  it('renders children', async () => {
    render(<MockAccordion />);

    expect(screen.getByText('Accordion Content1')).not.toBeVisible();
    expect(screen.getByText('Accordion Content2')).toBeVisible();

    fireEvent.click(screen.getByTestId('mock-accordion-item1-header'));

    await waitFor(() => {
      expect(screen.getByText('Accordion Content1')).toBeVisible();
    });
    await waitFor(() => {
      expect(screen.getByText('Accordion Content2')).not.toBeVisible();
    });
  });

  it('can override styles', () => {
    render(
      <Accordion
        defaultActiveKey="2"
        onChange={noop}
        style={customAccordionStyle}
        testID="mock-accordion"
      >
        <AccordionItem
          itemKey="1"
          onPress={noop}
          style={customAccordionItemStyle}
          subtitle="subtitle1"
          testID="mock-accordion-item1"
          title="Accordion #1"
        >
          <TextBody as="p">Accordion Content1</TextBody>
        </AccordionItem>
        <AccordionItem
          itemKey="2"
          onPress={noop}
          subtitle="subtitle2"
          testID="mock-accordion-item2"
          title="Accordion #2"
        >
          <TextBody as="p">Accordion Content2</TextBody>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByTestId('mock-accordion')).toHaveStyle('padding: 20px');
    expect(screen.getByTestId('mock-accordion-item1')).toHaveStyle('padding: 30px');
  });
});
