import { useMemo } from 'react';
import {
  advanceAnimationByTime,
  withReanimatedTimer,
} from 'react-native-reanimated/lib/reanimated2/jestUtils';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useToggler } from '@cbhq/cds-common';
import { generateRandomId } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { TextBody } from '../../typography';
import { Collapsible } from '../Collapsible';

const MockCollapsible = ({ defaultCollapsed = true }: { defaultCollapsed?: boolean }) => {
  const [collapsed, { toggle }] = useToggler(defaultCollapsed);
  const collapsibleId = useMemo(() => generateRandomId('collapsible-id--'), []);
  return (
    <>
      <Button
        onPress={toggle}
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        testID="mock-collapse-trigger"
        disableDebounce
      >
        Click me!
      </Button>
      <Collapsible collapsed={collapsed} testID="mock-collapse">
        <TextBody>Collapsible Content</TextBody>
      </Collapsible>
    </>
  );
};

describe('Collapsible', () => {
  it('renders collapsed content', () => {
    render(<MockCollapsible />);

    const view = screen.getByTestId('mock-collapse');

    expect(view).toHaveAnimatedStyle({ height: 0 });
    expect(view.props.style.opacity).toBe(0);
    expect(screen.UNSAFE_queryByProps({ collapsed: true })).toBeTruthy();
    expect(screen.getByText('Collapsible Content')).toBeTruthy();
  });

  it('expands and collapses', () => {
    withReanimatedTimer(() => {
      render(<MockCollapsible />);

      const style = { opacity: 0 };

      const view = screen.getByTestId('mock-collapse');
      // TODO: figure out how to trigger layout event in scroll view content container
      // const scrollView = screen.getByTestId('mock-collapse-scroll-view');

      // fireEvent(scrollView, 'layout', {
      //   nativeEvent: { layout: { height: 20, width: 100 } },
      // });

      expect(view).toHaveAnimatedStyle(style);

      // expand
      fireEvent.press(screen.getByTestId('mock-collapse-trigger'));
      advanceAnimationByTime(350);
      style.opacity = 1;
      expect(view).toHaveAnimatedStyle(style);

      // collapse
      fireEvent.press(screen.getByTestId('mock-collapse-trigger'));
      advanceAnimationByTime(300);
      style.opacity = 0;
      expect(view).toHaveAnimatedStyle(style);
    });
  });

  it('skips animation if initially expanded', () => {
    withReanimatedTimer(() => {
      render(<MockCollapsible defaultCollapsed={false} />);

      const style = { opacity: 1 };
      const view = screen.getByTestId('mock-collapse');
      advanceAnimationByTime(0);
      expect(view).toHaveAnimatedStyle(style);

      // collapse
      fireEvent.press(screen.getByTestId('mock-collapse-trigger'));
      advanceAnimationByTime(300);
      style.opacity = 0;
      expect(view).toHaveAnimatedStyle(style);
    });
  });
});
