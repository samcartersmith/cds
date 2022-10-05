import { Box, Grid, VStack } from '../../layout';
import { TextBody } from '../../typography/TextBody';
import { Pressable } from '../Pressable';

export default {
  title: 'Core Components/Pressable',
  component: Pressable,
};

const Default = () => {
  return (
    <VStack gap={2}>
      <Box>
        <Pressable as="button" backgroundColor="background">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable as="button" backgroundColor="background" noScaleOnPress>
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable as="button" backgroundColor="background" disabled>
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable as="button" backgroundColor="background" noScaleOnPress disabled>
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable as="button" backgroundColor="primary" block>
          <TextBody as="p" color="negativeForeground">
            Pressable full-width
          </TextBody>
        </Pressable>
      </Box>
      <Box>
        <Pressable as="button" backgroundColor="primary" loading>
          <TextBody as="p" color="negativeForeground">
            loading
          </TextBody>
        </Pressable>
      </Box>
    </VStack>
  );
};

// const Backgrounds = () => {
//   return (

//   )
// }

const Layers = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" backgroundColor="background">
        <TextBody as="p" spacing={1}>
          none
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="background" wrapWithLayeredElements>
        <TextBody as="p" spacing={1}>
          layered
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="transparent" wrapWithLayeredElements>
        <TextBody as="p" spacing={1}>
          layered + transparent
        </TextBody>
      </Pressable>
    </Grid>
  );
};

const Transparent = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" backgroundColor="transparent">
        <TextBody as="p" spacing={1}>
          transparent
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="primary" transparentWhileInactive>
        <TextBody as="p" spacing={1} color="primaryForeground">
          transparentWhileInactive
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="transparent" disabled>
        <TextBody as="p" spacing={1}>
          transparent
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="primary" transparentWhileInactive disabled>
        <TextBody as="p" spacing={1} color="primaryForeground">
          transparentWhileInactive
        </TextBody>
      </Pressable>
    </Grid>
  );
};

const Borders = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" backgroundColor="transparent" borderColor="positive">
        <TextBody as="p" spacing={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="primary"
        transparentWhileInactive
        borderColor="positive"
      >
        <TextBody as="p" spacing={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="transparent" disabled borderColor="positive">
        <TextBody as="p" spacing={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="primary"
        transparentWhileInactive
        disabled
        borderColor="positive"
      >
        <TextBody as="p" spacing={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="background"
        borderColor="primary"
        borderRadius="compact"
      >
        <TextBody as="p" spacing={1}>
          primary + compact
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="backgroundAlternate" borderColor="negative">
        <TextBody as="p" spacing={1}>
          negative
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="primary"
        borderColor="positive"
        borderRadius="standard"
      >
        <TextBody as="p" spacing={1} color="primaryForeground">
          positive + standard
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="secondary"
        borderColor="lineHeavy"
        borderRadius="tooltip"
      >
        <TextBody as="p" spacing={1} color="secondaryForeground">
          lineHeavy + tooltip
        </TextBody>
      </Pressable>
      <Pressable as="button" backgroundColor="positive" borderColor="line" borderRadius="pill">
        <TextBody as="p" spacing={1} color="positiveForeground">
          line + pill
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="negative"
        borderColor="primaryWash"
        borderRadius="round"
      >
        <TextBody as="p" spacing={1} color="negativeForeground">
          primaryWash + round
        </TextBody>
      </Pressable>
    </Grid>
  );
};

export const Variations = () => {
  return (
    <VStack gap={3}>
      <Default />
      <Transparent />
      <Layers />
      <Borders />
    </VStack>
  );
};
