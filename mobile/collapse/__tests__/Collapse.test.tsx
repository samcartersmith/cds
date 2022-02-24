import { render, fireEvent } from '@testing-library/react-native';
import { collapseBuilder } from '@cbhq/cds-common/internal/collapseBuilder';

import { Collapse } from '../Collapse';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';

const { MockCollapse } = collapseBuilder({
  Collapse,
  Button,
  TextBody,
});

describe('Collapse', () => {
  it('renders collapsed content', () => {
    const result = render(<MockCollapse />);

    expect(result.getByTestId('mock-collapse').props.style.opacity).toBe(0);
    expect(result.UNSAFE_queryByProps({ expanded: false })).toBeTruthy();
    expect(result.getByText('Collapse Content')).toBeTruthy();
  });

  it('renders expanded content', async () => {
    const result = render(<MockCollapse />);

    jest.useFakeTimers();

    fireEvent.press(result.getByText('Click me!'));

    jest.advanceTimersByTime(500);
    expect(result.getByTestId('mock-collapse').props.style.opacity).toBe(1);
    expect(result.UNSAFE_queryByProps({ expanded: true })).toBeTruthy();
    expect(result.getByText('Collapse Content')).toBeTruthy();
  });
});
