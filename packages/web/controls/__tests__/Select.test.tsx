import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  CreateSelectStoriesProps,
  exampleOptions,
  selectBuilder,
} from '@cbhq/cds-common/internal/selectBuilder';
import { renderA11y } from '@cbhq/cds-web-utils/jest';

import { Icon } from '../../icons/Icon';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { InputIcon } from '../InputIcon';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

const { Default: MockSelect } = selectBuilder({
  Select,
  VStack,
  SelectOption,
  ThemeProvider,
  Icon,
  InputIcon,
} as unknown as CreateSelectStoriesProps);

const mockPlaceholder = 'Choose something...';
const accessibilityLabel = 'label';
const mockTestID = 'select-input-test';

describe('Select', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(<MockSelect accessibilityLabel={accessibilityLabel} />),
    ).toHaveNoViolations();
    expect(await renderA11y(<MockSelect label="Test" />)).toHaveNoViolations();
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
  it('opens the Menu when the Select is pressed', async () => {
    const onPressSpy = jest.fn();
    const { getByText } = render(<MockSelect placeholder={mockPlaceholder} onPress={onPressSpy} />);

    fireEvent.click(getByText(mockPlaceholder));
    expect(onPressSpy).toHaveBeenCalled();

    const firstOption = await waitFor(() => getByText(exampleOptions[0]));
    // expect Menu and SelectOption to render
    expect(firstOption).toBeDefined();
  });
  it('closes the Menu when an option is pressed and fires onChange', async () => {
    const onChangeSpy = jest.fn();

    const { getByText, queryByText } = render(
      <MockSelect placeholder={mockPlaceholder} onPress={onChangeSpy} />,
    );

    const placeholder = getByText(mockPlaceholder);

    fireEvent.click(placeholder);

    // expect Menu and SelectOption to render
    const firstSelectOption = await waitFor(() => getByText(exampleOptions[0]));

    // select the first option
    fireEvent.click(firstSelectOption);
    expect(onChangeSpy).toHaveBeenCalled();

    expect(queryByText(mockPlaceholder)).toBeNull();
  });
  it('replaces the placeholder text with the selected value when pressed', async () => {
    const { getByText, getAllByText, queryByText } = render(
      <MockSelect placeholder={mockPlaceholder} />,
    );

    const placeholder = getByText(mockPlaceholder);

    fireEvent.click(placeholder);

    // expect Menu and SelectOption to render
    const secondSelectOption = await waitFor(() => getByText(exampleOptions[1]));
    fireEvent.click(secondSelectOption);

    expect(getAllByText(exampleOptions[1])).toBeDefined();
    expect(queryByText(mockPlaceholder)).toBeNull();
  });
});
