import { render, fireEvent } from '@testing-library/react-native';
import { accordionBuilder } from '@cbhq/cds-common/internal/accordionBuilder';

import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem';
import { CellMedia } from '../../cells/CellMedia';
import { TextBody } from '../../typography';
import { TextInput } from '../../controls';

const { MockAccordion } = accordionBuilder({
  Accordion,
  AccordionItem,
  CellMedia,
  TextBody,
  TextInput,
});

describe('Accordion', () => {
  it('triggers on press', () => {
    const onItemPress = jest.fn();
    const onPress1 = jest.fn();
    const onPress2 = jest.fn();

    const { getByTestId } = render(
      <MockAccordion onItemPress={onItemPress} onPress1={onPress1} onPress2={onPress2} />,
    );

    fireEvent.press(getByTestId('mock-accordion-item1-header'));

    expect(onItemPress).toHaveBeenCalledTimes(1);
    expect(onItemPress).toHaveBeenCalledWith('1');

    expect(onPress1).toHaveBeenCalledTimes(1);
    expect(onPress1).toHaveBeenCalledWith('1');

    fireEvent.press(getByTestId('mock-accordion-item2-header'));

    expect(onItemPress).toHaveBeenCalledTimes(2);
    expect(onItemPress).toHaveBeenCalledWith('2');

    expect(onPress2).toHaveBeenCalledTimes(1);
    expect(onPress2).toHaveBeenCalledWith('2');
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
