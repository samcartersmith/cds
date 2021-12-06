import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import {
  selectInputBuilder,
  CreateSelectInputStoriesProps,
  priceOptions,
} from '@cbhq/cds-common/internal/selectInputBuilder';

import { SelectInput } from '../SelectInput';
import { VStack } from '../../layout/VStack';
import { SelectOptionCell } from '../../cells/SelectOptionCell';
import { ThemeProvider } from '../../system/ThemeProvider';

const { Default: MockSelectInput } = selectInputBuilder({
  SelectInput,
  VStack,
  SelectOptionCell,
  ThemeProvider,
} as CreateSelectInputStoriesProps);

const mockPlaceholder = 'Choose something...';
const accessibilityLabel = 'label';
const mockTestID = 'select-input-test';

describe('SelectInput', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockSelectInput accessibilityLabel="label" />)).toHaveNoViolations();
  });
  it('can pass `aria-label` attribute', () => {
    const { getByTestId } = render(
      <MockSelectInput accessibilityLabel={accessibilityLabel} testID={mockTestID} />,
    );

    expect(getByTestId(mockTestID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
  it('renders the SelectInput trigger', async () => {
    const { getByTestId } = render(<MockSelectInput testID={mockTestID} />);

    expect(getByTestId(mockTestID)).toBeDefined();
  });
  it('opens the Menu when the SelectInput is pressed', () => {
    const onPressSpy = jest.fn();
    const { getByText } = render(
      <MockSelectInput placeholder={mockPlaceholder} onPress={onPressSpy} />,
    );

    fireEvent.click(getByText(mockPlaceholder));
    expect(onPressSpy).toHaveBeenCalled();

    // expect Menu and SelectOptionCell to render
    expect(getByText(priceOptions[0])).toBeDefined();
  });
  it('closes the Menu when an option is pressed and fires onChange', async () => {
    const onChangeSpy = jest.fn();
    const { getByText } = render(
      <MockSelectInput placeholder={mockPlaceholder} onPress={onChangeSpy} />,
    );

    fireEvent.click(getByText(mockPlaceholder));

    // expect Menu and SelectOptionCell to render
    const firstSelectOptionCell = await waitFor(() => getByText(priceOptions[0]));

    // select the first option
    fireEvent.click(firstSelectOptionCell);

    // the first option cell content should replace the placeholder
    expect(firstSelectOptionCell).toBeDefined();
    // TODO: check that the menu should be dismounted
  });
  it('replaces the placeholder text with the selected value when pressed', async () => {
    const { getByText } = render(<MockSelectInput placeholder={mockPlaceholder} />);

    fireEvent.click(getByText(mockPlaceholder));

    // expect Menu and SelectOptionCell to render
    const secondSelectOptionCell = await waitFor(() => getByText(priceOptions[1]));
    fireEvent.click(secondSelectOptionCell);

    expect(getByText(priceOptions[1])).toBeDefined();
  });
});
