import { render, fireEvent } from '@testing-library/react-native';
import { collapsibleBuilder } from '@cbhq/cds-common/internal/collapsibleBuilder';

import { Collapsible } from '../Collapsible';
import { Button } from '../../buttons';
import { TextBody } from '../../typography';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';

const { MockCollapsible } = collapsibleBuilder({
  Collapsible,
  Button,
  TextBody,
  DotCount,
  HStack,
});

describe('Collapsible', () => {
  it('renders collapsed content', () => {
    const result = render(<MockCollapsible />);

    expect(result.getByTestId('mock-collapse').props.style.opacity).toBe(0);
    expect(result.UNSAFE_queryByProps({ collapsed: true })).toBeTruthy();
    expect(result.getByText('Collapsible Content')).toBeTruthy();
  });

  it('renders expanded content', async () => {
    const result = render(<MockCollapsible />);

    jest.useFakeTimers();

    fireEvent.press(result.getByText('Click me!'));

    jest.advanceTimersByTime(500);
    expect(result.getByTestId('mock-collapse').props.style.opacity).toBe(1);
    expect(result.UNSAFE_queryByProps({ collapsed: false })).toBeTruthy();
    expect(result.getByText('Collapsible Content')).toBeTruthy();
  });
});
