import { fireEvent, render, screen } from '@testing-library/react-native';
import { accordionBuilder } from '@cbhq/cds-common/internal/accordionBuilder';

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
    const onItemPress = jest.fn();
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();

    render(<MockAccordion onItemPress={onItemPress} onPress1={onPress1} onPress2={onPress2} />);

    fireEvent.press(screen.getByTestId('mock-accordion-item1-header'));

    expect(onItemPress).toHaveBeenCalledTimes(1);
    expect(onItemPress).toHaveBeenCalledWith('1');

    expect(onPress1).toHaveBeenCalledTimes(1);
    expect(onPress1).toHaveBeenCalledWith('1');

    fireEvent.press(screen.getByTestId('mock-accordion-item2-header'));

    expect(onItemPress).toHaveBeenCalledTimes(2);
    expect(onItemPress).toHaveBeenCalledWith('2');

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
});
