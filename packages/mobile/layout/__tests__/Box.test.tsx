import { Animated, Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { LinearGradient } from '../../gradients/LinearGradient';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Box as BoxComponent, BoxProps } from '../Box';

const Box = (props: BoxProps) => (
  <ThemeProvider name="box-test">
    <BoxComponent {...props} />
  </ThemeProvider>
);

describe('Box', () => {
  it('renders a view', () => {
    render(
      <Box testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.UNSAFE_queryAllByType(View)).toHaveLength(1);
  });

  it('renders an animated view', () => {
    render(
      <Box animated testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders no background by default', async () => {
    render(
      <Box testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).not.toHaveProperty('backgroundColor');
  });

  it('renders alternate background', async () => {
    render(
      <Box background="backgroundAlternate" testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      backgroundColor: 'rgba(238,240,243,1)',
    });
  });

  it('can dangerously override styles', async () => {
    render(
      // eslint-disable-next-line react-native/no-color-literals
      <Box dangerouslySetStyle={{ backgroundColor: '#000' }} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toHaveStyle({
      backgroundColor: '#000',
    });
  });

  it('renders borders and radius', async () => {
    render(
      <Box bordered borderRadius="rounded" testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      borderColor: 'rgba(91,97,110,0.2)',
      borderRadius: 8,
      borderWidth: 1,
    });
  });

  it('renders elevation 1 styles', async () => {
    render(
      <Box elevation={1} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      shadowColor: '#000000',
      shadowOpacity: 0.02,
      shadowRadius: 12,
    });
  });

  it('renders elevation 2 styles', async () => {
    render(
      <Box elevation={2} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 24,
    });
  });

  it('renders width styles', async () => {
    render(
      <Box maxWidth={789} minWidth="66%" testID="parent" width="321px">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      width: '321px',
      maxWidth: 789,
      minWidth: '66%',
    });
  });

  it('renders height styles', async () => {
    render(
      <Box height="321px" maxHeight={789} minHeight="66%" testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      height: '321px',
      maxHeight: 789,
      minHeight: '66%',
    });
  });

  it('renders position styles', async () => {
    render(
      <Box
        bottom="8rem"
        left="1000%"
        position="absolute"
        right="30px"
        testID="parent"
        top="25%"
        zIndex={200}
      >
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      bottom: '8rem',
      left: '1000%',
      position: 'absolute',
      right: '30px',
      top: '25%',
      zIndex: 200,
    });
  });

  it('renders flex styles', async () => {
    render(
      <Box
        alignContent="space-around"
        alignItems="center"
        alignSelf="auto"
        flexBasis="50%"
        flexDirection="column-reverse"
        flexGrow={2}
        flexShrink={3}
        flexWrap="nowrap"
        justifyContent="space-evenly"
        testID="parent"
      >
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
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
    render(
      <Box overflow="gradient" testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.UNSAFE_queryAllByType(LinearGradient)).toHaveLength(1);
  });

  describe('spacing', () => {
    it('renders all', async () => {
      render(
        <Box spacing={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('renders horizontal', async () => {
      render(
        <Box spacingHorizontal={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('renders vertical', async () => {
      render(
        <Box spacingVertical={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 8,
      });
    });

    it('renders start/end', async () => {
      render(
        <Box spacingEnd={2} spacingStart={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingLeft: 8,
        paddingRight: 16,
      });
    });

    it('renders individual', async () => {
      render(
        <Box spacingBottom={2} spacingEnd={4} spacingStart={3} spacingTop={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 24,
        paddingRight: 32,
      });
    });
  });

  describe('offset', () => {
    it('renders all', async () => {
      render(
        <Box offset={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -8,
        marginLeft: -8,
        marginRight: -8,
      });
    });

    it('renders horizontal', async () => {
      render(
        <Box offsetHorizontal={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginLeft: -8,
        marginRight: -8,
      });
    });

    it('renders vertical', async () => {
      render(
        <Box offsetVertical={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -8,
      });
    });

    it('renders start/end', async () => {
      render(
        <Box offsetEnd={2} offsetStart={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginLeft: -8,
        marginRight: -16,
      });
    });

    it('renders individual', async () => {
      render(
        <Box offsetBottom={2} offsetEnd={4} offsetStart={3} offsetTop={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -16,
        marginLeft: -24,
        marginRight: -32,
      });
    });
  });

  describe('pin', () => {
    it('renders "top" pin', async () => {
      render(
        <Box pin="top" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      });
    });

    it('renders "bottom" pin', async () => {
      render(
        <Box pin="bottom" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      });
    });

    it('renders "right" pin', async () => {
      render(
        <Box pin="right" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      });
    });

    it('renders "left" pin', async () => {
      render(
        <Box pin="left" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
      });
    });

    it('renders "all" pin', async () => {
      render(
        <Box pin="all" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      });
    });
  });
});
