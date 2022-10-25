import { render, screen } from '@testing-library/react-native';
import { collapsibleBuilder } from '@cbhq/cds-common/internal/collapsibleBuilder';

import { Button } from '../../buttons';
import { DotCount } from '../../dots';
import { HStack } from '../../layout';
import { TextBody } from '../../typography';
import { Collapsible } from '../Collapsible';

const { MockCollapsible } = collapsibleBuilder({
  Collapsible,
  Button,
  TextBody,
  DotCount,
  HStack,
});

describe('Collapsible', () => {
  it('renders collapsed content', () => {
    render(<MockCollapsible />);

    expect(screen.getByTestId('mock-collapse').props.style.opacity).toBe(0);
    expect(screen.UNSAFE_queryByProps({ collapsed: true })).toBeTruthy();
    expect(screen.getByText('Collapsible Content')).toBeTruthy();
  });
});
