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
        <Pressable noScaleOnPress as="button" backgroundColor="background">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled as="button" backgroundColor="background">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled noScaleOnPress as="button" backgroundColor="background">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable block as="button" backgroundColor="primary">
          <TextBody as="p" color="negativeForeground">
            Pressable full-width
          </TextBody>
        </Pressable>
      </Box>
      <Box>
        <Pressable loading as="button" backgroundColor="primary">
          <TextBody as="p" color="negativeForeground">
            loading
          </TextBody>
        </Pressable>
      </Box>
    </VStack>
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
      <Pressable transparentWhileInactive as="button" backgroundColor="primary">
        <TextBody as="p" color="primaryForeground" spacing={1}>
          transparentWhileInactive
        </TextBody>
      </Pressable>
      <Pressable disabled as="button" backgroundColor="transparent">
        <TextBody as="p" spacing={1}>
          transparent
        </TextBody>
      </Pressable>
      <Pressable disabled transparentWhileInactive as="button" backgroundColor="primary">
        <TextBody as="p" color="primaryForeground" spacing={1}>
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
        transparentWhileInactive
        as="button"
        backgroundColor="primary"
        borderColor="positive"
      >
        <TextBody as="p" spacing={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable disabled as="button" backgroundColor="transparent" borderColor="positive">
        <TextBody as="p" spacing={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        disabled
        transparentWhileInactive
        as="button"
        backgroundColor="primary"
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
        borderRadius="roundedSmall"
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
        borderRadius="rounded"
      >
        <TextBody as="p" color="primaryForeground" spacing={1}>
          positive + standard
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="secondary"
        borderColor="lineHeavy"
        borderRadius="rounded"
      >
        <TextBody as="p" color="secondaryForeground" spacing={1}>
          lineHeavy + tooltip
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="positive"
        borderColor="line"
        borderRadius="roundedLarge"
      >
        <TextBody as="p" color="positiveForeground" spacing={1}>
          line + pill
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        backgroundColor="negative"
        borderColor="primaryWash"
        borderRadius="roundedFull"
      >
        <TextBody as="p" color="negativeForeground" spacing={1}>
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
      <Borders />
    </VStack>
  );
};
