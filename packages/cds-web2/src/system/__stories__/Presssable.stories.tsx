import React from 'react';
import { type ThemeVars } from '@cbhq/cds-common2/core/theme';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';

import { useTheme } from '../../hooks/useTheme';
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
        <Pressable as="button" background="background">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable noScaleOnPress as="button" background="background">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled as="button" background="background">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled noScaleOnPress as="button" background="background">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable block as="button" background="backgroundPrimary">
          <TextBody as="p" color="textForegroundInverse">
            Pressable full-width
          </TextBody>
        </Pressable>
      </Box>
      <Box>
        <Pressable loading as="button" background="backgroundPrimary">
          <TextBody as="p" color="textForegroundInverse">
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
      <Pressable as="button" background="transparent">
        <TextBody as="p" padding={1}>
          transparent
        </TextBody>
      </Pressable>
      <Pressable transparentWhileInactive as="button" background="backgroundPrimary">
        <TextBody as="p" color="textForegroundInverse" padding={1}>
          transparentWhileInactive
        </TextBody>
      </Pressable>
      <Pressable disabled as="button" background="transparent">
        <TextBody as="p" padding={1}>
          transparent
        </TextBody>
      </Pressable>
      <Pressable disabled transparentWhileInactive as="button" background="backgroundPrimary">
        <TextBody as="p" color="textForegroundInverse" padding={1}>
          transparentWhileInactive
        </TextBody>
      </Pressable>
    </Grid>
  );
};

const Borders = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" background="transparent" borderColor="backgroundPositive">
        <TextBody as="p" padding={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        transparentWhileInactive
        as="button"
        background="backgroundPrimary"
        borderColor="backgroundPositive"
      >
        <TextBody as="p" padding={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable disabled as="button" background="transparent" borderColor="backgroundPositive">
        <TextBody as="p" padding={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        disabled
        transparentWhileInactive
        as="button"
        background="backgroundPrimary"
        borderColor="backgroundPositive"
      >
        <TextBody as="p" padding={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        background="background"
        borderColor="backgroundPrimary"
        borderRadius={100}
      >
        <TextBody as="p" padding={1}>
          primary + compact
        </TextBody>
      </Pressable>
      <Pressable as="button" background="backgroundAlternate" borderColor="backgroundNegative">
        <TextBody as="p" padding={1}>
          negative
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        background="backgroundPrimary"
        borderColor="backgroundPositive"
        borderRadius={200}
      >
        <TextBody as="p" color="textForegroundInverse" padding={1}>
          positive + standard
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        background="backgroundSecondary"
        borderColor="lineHeavy"
        borderRadius={200}
      >
        <TextBody as="p" color="textForeground" padding={1}>
          lineHeavy + tooltip
        </TextBody>
      </Pressable>
      <Pressable as="button" background="backgroundPositive" borderColor="line" borderRadius={400}>
        <TextBody as="p" color="textForegroundInverse" padding={1}>
          line + pill
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        background="backgroundNegative"
        borderColor="backgroundPrimaryWash"
        borderRadius={1000}
      >
        <TextBody as="p" color="textForegroundInverse" padding={1}>
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

export const ThemeColors = () => {
  const theme = useTheme();
  return (
    <VStack gap={2}>
      {Object.entries(theme.color).map(([color, value]) => {
        let textColor = getAccessibleColor(value);
        if (color === 'currentColor') textColor = '#ffffff';
        return (
          <Pressable
            key={color}
            as="button"
            background={color as ThemeVars.Color}
            borderColor="line"
            borderWidth={100}
          >
            <TextBody as="p" dangerouslySetColor={textColor} padding={1}>
              {color}
            </TextBody>
          </Pressable>
        );
      })}
    </VStack>
  );
};

export const ThemeColorsWithDisabled = () => {
  const theme = useTheme();
  return (
    <VStack gap={2}>
      {Object.entries(theme.color).map(([color, value]) => {
        let textColor = getAccessibleColor(value);
        if (color === 'currentColor') textColor = '#ffffff';
        return (
          <Pressable
            key={color}
            disabled
            as="button"
            background={color as ThemeVars.Color}
            borderColor="line"
            borderWidth={100}
          >
            <TextBody as="p" dangerouslySetColor={textColor} padding={1}>
              {color}
            </TextBody>
          </Pressable>
        );
      })}
    </VStack>
  );
};
