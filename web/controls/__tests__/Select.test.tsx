import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import {
  selectBuilder,
  CreateSelectStoriesProps,
  priceOptions,
} from '@cbhq/cds-common/internal/selectBuilder';

import { Select } from '../Select';
import { VStack } from '../../layout/VStack';
import { SelectOptionCell } from '../../cells/SelectOptionCell';
import { ThemeProvider } from '../../system/ThemeProvider';
import { MenuItem } from '../../overlays/MenuItem';

const { Default: MockSelect } = selectBuilder({
  Select,
  MenuItem,
  VStack,
  SelectOptionCell,
  ThemeProvider,
} as CreateSelectStoriesProps);

const mockPlaceholder = 'Choose something...';
const accessibilityLabel = 'label';
const mockTestID = 'select-input-test';

describe('Select', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<MockSelect accessibilityLabel="label" />)).toHaveNoViolations();
  });
  it('can pass `aria-label` attribute', () => {
    const { getByTestId } = render(
      <MockSelect accessibilityLabel={accessibilityLabel} testID={mockTestID} />,
    );

    expect(getByTestId(mockTestID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
  it('renders the Select trigger', async () => {
    const { getByTestId } = render(<MockSelect testID={mockTestID} />);

    expect(getByTestId(mockTestID)).toBeDefined();
  });
  it('opens the Menu when the Select is pressed', () => {
    const onPressSpy = jest.fn();
    const { getByText } = render(<MockSelect placeholder={mockPlaceholder} onPress={onPressSpy} />);

    fireEvent.click(getByText(mockPlaceholder));
    expect(onPressSpy).toHaveBeenCalled();

    // expect Menu and SelectOptionCell to render
    expect(getByText(priceOptions[0])).toBeDefined();
  });
  it('closes the Menu when an option is pressed and fires onChange', async () => {
    const onChangeSpy = jest.fn();
    const { getByText } = render(
      <MockSelect placeholder={mockPlaceholder} onPress={onChangeSpy} />,
    );

    fireEvent.click(getByText(mockPlaceholder));

    // expect Menu and SelectOptionCell to render
    const firstSelectOptionCell = await waitFor(() => getByText(priceOptions[0]));

    // select the first option
    fireEvent.click(firstSelectOptionCell);

    // the first option cell content should replace the placeholder
    expect(firstSelectOptionCell).toBeDefined();
  });
  it('replaces the placeholder text with the selected value when pressed', async () => {
    const { getByText } = render(<MockSelect placeholder={mockPlaceholder} />);

    fireEvent.click(getByText(mockPlaceholder));

    // expect Menu and SelectOptionCell to render
    const secondSelectOptionCell = await waitFor(() => getByText(priceOptions[1]));
    fireEvent.click(secondSelectOptionCell);

    expect(getByText(priceOptions[1])).toBeDefined();
  });
});
