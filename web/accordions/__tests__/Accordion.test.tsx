import { render, fireEvent } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import { accordionBuilder, CreateAccordionProps } from '@cbhq/cds-common/internal/accordionBuilder';

import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';
import { CellMedia } from '../../cells/CellMedia';
import { TextBody } from '../../typography';
import { TextInput } from '../../controls';

import { getAccordionHeaderId, getAccordionPanelId } from '../utils';

const { MockAccordion } = accordionBuilder({
  Accordion,
  AccordionItem,
  CellMedia,
  TextBody,
  TextInput,
} as CreateAccordionProps);

describe('Accordion', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockAccordion />)).toHaveNoViolations();
  });

  it('has a11y attributes', () => {
    const { getByTestId } = render(<MockAccordion />);

    const item1Header = getByTestId('mock-accordion-item1-header');
    const item1Panel = getByTestId('mock-accordion-item1-panel');
    const item2Header = getByTestId('mock-accordion-item2-header');
    const item2Panel = getByTestId('mock-accordion-item2-panel');

    expect(item1Header).toHaveAttribute('aria-expanded', 'false');
    expect(item1Header).toHaveAttribute('aria-controls', getAccordionPanelId('1'));
    expect(item1Panel).toHaveAttribute('aria-labelledby', getAccordionHeaderId('1'));

    expect(item2Header).toHaveAttribute('aria-expanded', 'true');
    expect(item2Header).toHaveAttribute('aria-controls', getAccordionPanelId('2'));
    expect(item2Panel).toHaveAttribute('aria-labelledby', getAccordionHeaderId('2'));
  });

  it('triggers on press', () => {
    const onItemPress = jest.fn();
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();

    const { getByTestId } = render(
      <MockAccordion onItemPress={onItemPress} onPress1={onPress1} onPress2={onPress2} />,
    );

    fireEvent.click(getByTestId('mock-accordion-item1-header'));

    expect(onItemPress).toHaveBeenCalledTimes(1);
    expect(onItemPress).toHaveBeenCalledWith('1');

    expect(onPress1).toHaveBeenCalledTimes(1);
    expect(onPress1).toHaveBeenCalledWith('1');

    fireEvent.click(getByTestId('mock-accordion-item2-header'));

    expect(onItemPress).toHaveBeenCalledTimes(2);
    expect(onItemPress).toHaveBeenCalledWith('2');

    expect(onPress2).toHaveBeenCalledTimes(1);
    expect(onPress2).toHaveBeenCalledWith('2');
  });

  it('renders active key by default', () => {
    const { getByTestId } = render(<MockAccordion />);

    expect(getByTestId('mock-accordion-item1-panel')).toBeInTheDocument();
    expect(getByTestId('mock-accordion-item1-panel')).toHaveClass('collapsed');
    expect(getByTestId('mock-accordion-item2-panel')).toBeInTheDocument();
  });

  it('expand pressed panel and collapse expanded panel', () => {
    const { getByTestId } = render(<MockAccordion />);

    fireEvent.click(getByTestId('mock-accordion-item1-header'));

    expect(getByTestId('mock-accordion-item1-header')).toHaveAttribute('aria-expanded', 'true');
    expect(getByTestId('mock-accordion-item2-header')).toHaveAttribute('aria-expanded', 'false');

    expect(getByTestId('mock-accordion-item1-panel')).not.toHaveClass('collapsed');
    expect(getByTestId('mock-accordion-item2-panel')).toHaveClass('collapsed');
  });

  it('renders titles', () => {
    const { getByText } = render(<MockAccordion />);

    expect(getByText('Accordion #1')).toBeTruthy();
    expect(getByText('subtitle1')).toBeTruthy();
    expect(getByText('Accordion #2')).toBeTruthy();
    expect(getByText('subtitle2')).toBeTruthy();
  });

  it('renders media', () => {
    const { getByTestId } = render(<MockAccordion />);

    expect(getByTestId('mock-accordion-item1-media')).toBeTruthy();
    expect(getByTestId('mock-accordion-item2-media')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(<MockAccordion />);

    expect(getByText('Accordion Content1')).toBeTruthy();
    expect(getByText('Accordion Content2')).toBeTruthy();
  });
});
