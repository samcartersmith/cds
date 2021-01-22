import React from 'react';

import { render, waitFor } from '@testing-library/react-native';
import { Text, View } from 'react-native';

import { Box } from './Box';

// TODO test animated, spacing, overflow
describe('Box', () => {
  it('renders a view', () => {
    const result = render(<Box>Child</Box>);

    expect(result.UNSAFE_queryAllByType(View)).toHaveLength(1);
  });

  it('renders background by default', async () => {
    const { getByText } = render(
      <Box>
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,1)',
    });
  });

  it('renders alternate background', async () => {
    const { getByText } = render(
      <Box background="backgroundAlternate">
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      backgroundColor: 'rgba(238,240,243,1)',
    });
  });

  it('can dangerously override styles', async () => {
    const { getByText } = render(
      <Box dangerouslySetStyle={{ backgroundColor: 'red' }}>
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      backgroundColor: 'red',
    });
  });

  it('renders borders and radius', async () => {
    const { getByText } = render(
      <Box bordered rounded>
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,1)',
      borderColor: 'rgba(91,97,110,0.66)',
      borderRadius: 10,
      borderWidth: 1,
    });
  });

  it('renders elevation 1 styles', async () => {
    const { getByText } = render(
      <Box elevation={1}>
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      borderWidth: 1,
      borderColor: 'rgba(91,97,110,0.33)',
      shadowColor: '#000',
      shadowOpacity: 0.02,
      shadowRadius: 12,
    });
  });

  it('renders elevation 2 styles', async () => {
    const { getByText } = render(
      <Box elevation={2}>
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      borderWidth: 1,
      borderColor: 'rgba(91,97,110,0.33)',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 24,
    });
  });

  it('renders width styles', async () => {
    const { getByText } = render(
      <Box width="321px" maxWidth={789} minWidth="66%">
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      width: '321px',
      maxWidth: 789,
      minWidth: '66%',
    });
  });

  it('renders height styles', async () => {
    const { getByText } = render(
      <Box height="321px" maxHeight={789} minHeight="66%">
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      height: '321px',
      maxHeight: 789,
      minHeight: '66%',
    });
  });

  it('renders position styles', async () => {
    const { getByText } = render(
      <Box position="absolute" top="25%" right="30px" bottom="8rem" left="1000%" zIndex={200}>
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
      bottom: '8rem',
      left: '1000%',
      position: 'absolute',
      right: '30px',
      top: '25%',
      zIndex: 200,
    });
  });

  it('renders flex styles', async () => {
    const { getByText } = render(
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
      >
        <Text>Child</Text>
      </Box>
    );

    await waitFor(() => getByText('Child'));

    expect(getByText('Child').parent).toHaveStyle({
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
});
