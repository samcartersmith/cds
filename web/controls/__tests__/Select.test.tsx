import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderA11y } from '@cbhq/jest-utils';
import {
  selectBuilder,
  CreateSelectStoriesProps,
  priceOptions,
} from '@cbhq/cds-common/internal/selectBuilder';

import { Select } from '../Select';
import { VStack } from '../../layout/VStack';
import { SelectOption } from '../SelectOption';
import { ThemeProvider } from '../../system/ThemeProvider';
import { MenuItem } from '../../overlays/MenuItem';
import { Icon } from '../../icons/Icon';

const { Default: MockSelect } = selectBuilder({
  Select,
  MenuItem,
  VStack,
  SelectOption,
  ThemeProvider,
  Icon,
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

    // expect Menu and SelectOption to render
    expect(getByText(priceOptions[0])).toBeDefined();
  });
  it('closes the Menu when an option is pressed and fires onChange', async () => {
    const onChangeSpy = jest.fn();
    const { getByText } = render(
      <MockSelect placeholder={mockPlaceholder} onPress={onChangeSpy} />,
    );

    fireEvent.click(getByText(mockPlaceholder));

    // expect Menu and SelectOption to render
    const firstSelectOption = await waitFor(() => getByText(priceOptions[0]));

    // select the first option
    fireEvent.click(firstSelectOption);

    // the first option cell content should replace the placeholder
    expect(firstSelectOption).toBeDefined();
  });
  it('replaces the placeholder text with the selected value when pressed', async () => {
    const { getByText } = render(<MockSelect placeholder={mockPlaceholder} />);

    fireEvent.click(getByText(mockPlaceholder));

    // expect Menu and SelectOption to render
    const secondSelectOption = await waitFor(() => getByText(priceOptions[1]));
    fireEvent.click(secondSelectOption);

    expect(getByText(priceOptions[1])).toBeDefined();
  });
});
