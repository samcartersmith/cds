import { renderHook } from '@testing-library/react-hooks';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import { useCallback } from 'react';
import { ScrollView } from 'react-native';

import { Button } from '../../buttons';
import { Box } from '../../layout';
import { useScrollTo } from '../useScrollTo';

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView');

describe('useScrollTo', () => {
  afterEach(cleanup);

  it('returns ref and scrollTo', () => {
    const { result } = renderHook(() => useScrollTo());
    expect(result.current[0]).not.toBeNull();
    expect(result.current[1]).not.toBeNull();
  });

  it('fires scrollTo on ScrollView', () => {
    const MockUsage = () => {
      const [scrollRef, { scrollTo }] = useScrollTo();
      const onPress = useCallback(() => scrollTo({ x: 400 }), [scrollTo]);
      return (
        <Box>
          <Button testID="Button" onPress={onPress}>
            Scroll To
          </Button>
          <ScrollView ref={scrollRef} horizontal>
            <Box width={900} />
          </ScrollView>
        </Box>
      );
    };
    const result = render(<MockUsage />);
    fireEvent.press(result.getByTestId('Button'));
    expect(result.UNSAFE_getByType(ScrollView).instance.scrollTo).toHaveBeenCalledWith({
      x: 400,
      y: 0,
      animated: true,
    });
  });

  it('fires scrollToEnd on ScrollView', () => {
    const MockUsage = () => {
      const [scrollRef, { scrollToEnd }] = useScrollTo();
      const onPress = useCallback(() => scrollToEnd(), [scrollToEnd]);
      return (
        <Box>
          <Button testID="Button" onPress={onPress}>
            Scroll To
          </Button>
          <ScrollView ref={scrollRef} horizontal>
            <Box width={900} />
          </ScrollView>
        </Box>
      );
    };
    const result = render(<MockUsage />);
    fireEvent.press(result.getByTestId('Button'));
    expect(result.UNSAFE_getByType(ScrollView).instance.scrollToEnd).toHaveBeenCalled();
  });
});
