import { Animated, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { render, waitFor } from '@testing-library/react-native';

import { ThemeProvider } from '../../system/ThemeProvider';
import { Box as BoxComponent, BoxProps } from '../Box';

const Box = (props: BoxProps) => (
  <ThemeProvider name="box-test">
    <BoxComponent {...props} />
  </ThemeProvider>
);

describe('Box', () => {
  it('renders a view', () => {
    const result = render(
      <Box>
        <Text>Child</Text>
      </Box>,
    );

    expect(result.UNSAFE_queryAllByType(View)).toHaveLength(1);
  });

  it('renders an animated view', () => {
    const result = render(
      <Box animated>
        <Text>Child</Text>
      </Box>,
    );

    expect(result.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders no background by default', async () => {
    const { getByTestId } = render(
      <Box testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).not.toHaveProperty('backgroundColor');
  });

  it('renders alternate background', async () => {
    const { getByTestId } = render(
      <Box testID="parent" background="backgroundAlternate">
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      backgroundColor: 'rgba(238,240,243,1)',
    });
  });

  it('can dangerously override styles', async () => {
    const { getByTestId } = render(
      // eslint-disable-next-line react-native/no-color-literals
      <Box testID="parent" dangerouslySetStyle={{ backgroundColor: '#000' }}>
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      backgroundColor: '#000',
    });
  });

  it('renders borders and radius', async () => {
    const { getByTestId } = render(
      <Box testID="parent" bordered borderRadius="standard">
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      borderColor: 'rgba(91,97,110,0.2)',
      borderRadius: 8,
      borderWidth: 1,
    });
  });

  it('renders elevation 1 styles', async () => {
    const { getByTestId } = render(
      <Box testID="parent" elevation={1}>
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      shadowColor: '#000000',
      shadowOpacity: 0.02,
      shadowRadius: 12,
    });
  });

  it('renders elevation 2 styles', async () => {
    const { getByTestId } = render(
      <Box testID="parent" elevation={2}>
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 24,
    });
  });

  it('renders width styles', async () => {
    const { getByTestId } = render(
      <Box testID="parent" width="321px" maxWidth={789} minWidth="66%">
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      width: '321px',
      maxWidth: 789,
      minWidth: '66%',
    });
  });

  it('renders height styles', async () => {
    const { getByTestId } = render(
      <Box testID="parent" height="321px" maxHeight={789} minHeight="66%">
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      height: '321px',
      maxHeight: 789,
      minHeight: '66%',
    });
  });

  it('renders position styles', async () => {
    const { getByTestId } = render(
      <Box
        testID="parent"
        position="absolute"
        top="25%"
        right="30px"
        bottom="8rem"
        left="1000%"
        zIndex={200}
      >
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      bottom: '8rem',
      left: '1000%',
      position: 'absolute',
      right: '30px',
      top: '25%',
      zIndex: 200,
    });
  });

  it('renders flex styles', async () => {
    const { getByTestId } = render(
      <Box
        testID="parent"
        alignContent="space-around"
        alignItems="center"
        alignSelf="auto"
        flexBasis="50%"
        flexDirection="column-reverse"
        flexGrow={2}
        flexShrink={3}
        flexWrap="nowrap"
        justifyContent="space-evenly"
      >
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => getByTestId('parent'));

    expect(getByTestId('parent')).toHaveStyle({
      alignContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'auto',
      flexBasis: '50%',
      flexDirection: 'column-reverse',
      flexGrow: 2,
      flexShrink: 3,
      flexWrap: 'nowrap',
      justifyContent: 'space-evenly',
    });
  });

  it('renders an overflow gradient', async () => {
    const result = render(
      <Box testID="parent" overflow="gradient">
        <Text>Child</Text>
      </Box>,
    );

    await waitFor(() => result.getByTestId('parent'));

    expect(result.UNSAFE_queryAllByType(LinearGradient)).toHaveLength(1);
  });

  describe('spacing', () => {
    it('renders all', async () => {
      const { getByTestId } = render(
        <Box testID="parent" spacing={1}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('renders horizontal', async () => {
      const { getByTestId } = render(
        <Box testID="parent" spacingHorizontal={1}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('renders vertical', async () => {
      const { getByTestId } = render(
        <Box testID="parent" spacingVertical={1}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 8,
      });
    });

    it('renders start/end', async () => {
      const { getByTestId } = render(
        <Box testID="parent" spacingStart={1} spacingEnd={2}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        paddingLeft: 8,
        paddingRight: 16,
      });
    });

    it('renders individual', async () => {
      const { getByTestId } = render(
        <Box testID="parent" spacingTop={1} spacingBottom={2} spacingStart={3} spacingEnd={4}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 32,
      });
    });
  });

  describe('offset', () => {
    it('renders all', async () => {
      const { getByTestId } = render(
        <Box testID="parent" offset={1}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -8,
        marginLeft: -8,
        marginRight: -8,
      });
    });

    it('renders horizontal', async () => {
      const { getByTestId } = render(
        <Box testID="parent" offsetHorizontal={1}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        marginLeft: -8,
        marginRight: -8,
      });
    });

    it('renders vertical', async () => {
      const { getByTestId } = render(
        <Box testID="parent" offsetVertical={1}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -8,
      });
    });

    it('renders start/end', async () => {
      const { getByTestId } = render(
        <Box testID="parent" offsetStart={1} offsetEnd={2}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        marginLeft: -8,
        marginRight: -16,
      });
    });

    it('renders individual', async () => {
      const { getByTestId } = render(
        <Box testID="parent" offsetTop={1} offsetBottom={2} offsetStart={3} offsetEnd={4}>
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -16,
        marginLeft: -24,
        marginRight: -32,
      });
    });
  });

  describe('pin', () => {
    it('renders "top" pin', async () => {
      const { getByTestId } = render(
        <Box testID="parent" pin="top">
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      });
    });

    it('renders "bottom" pin', async () => {
      const { getByTestId } = render(
        <Box testID="parent" pin="bottom">
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      });
    });

    it('renders "right" pin', async () => {
      const { getByTestId } = render(
        <Box testID="parent" pin="right">
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      });
    });

    it('renders "left" pin', async () => {
      const { getByTestId } = render(
        <Box testID="parent" pin="left">
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
      });
    });

    it('renders "all" pin', async () => {
      const { getByTestId } = render(
        <Box testID="parent" pin="all">
          <Text>Child</Text>
        </Box>,
      );

      await waitFor(() => getByTestId('parent'));

      expect(getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      });
    });
  });
});
