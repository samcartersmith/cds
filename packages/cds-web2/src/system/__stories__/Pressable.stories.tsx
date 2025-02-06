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
        <Pressable as="button" background="bg">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable noScaleOnPress as="button" background="bg">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled as="button" background="bg">
          Pressable
        </Pressable>
      </Box>
      <Box>
        <Pressable disabled noScaleOnPress as="button" background="bg">
          Without scaling
        </Pressable>
      </Box>
      <Box>
        <Pressable block as="button" background="bgPrimary">
          <TextBody as="p" color="fgInverse">
            Pressable full-width
          </TextBody>
        </Pressable>
      </Box>
      <Box>
        <Pressable loading as="button" background="bgPrimary">
          <TextBody as="p" color="fgInverse">
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
      <Pressable transparentWhileInactive as="button" background="bgPrimary">
        <TextBody as="p" color="fgInverse" padding={1}>
          transparentWhileInactive
        </TextBody>
      </Pressable>
      <Pressable disabled as="button" background="transparent">
        <TextBody as="p" padding={1}>
          transparent
        </TextBody>
      </Pressable>
      <Pressable disabled transparentWhileInactive as="button" background="bgPrimary">
        <TextBody as="p" color="fgInverse" padding={1}>
          transparentWhileInactive
        </TextBody>
      </Pressable>
    </Grid>
  );
};

const Borders = () => {
  return (
    <Grid columnMin={200} gap={2}>
      <Pressable as="button" background="transparent" borderColor="bgPositive">
        <TextBody as="p" padding={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        transparentWhileInactive
        as="button"
        background="bgPrimary"
        borderColor="bgPositive"
      >
        <TextBody as="p" padding={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable disabled as="button" background="transparent" borderColor="bgPositive">
        <TextBody as="p" padding={1}>
          transparent with borders
        </TextBody>
      </Pressable>
      <Pressable
        disabled
        transparentWhileInactive
        as="button"
        background="bgPrimary"
        borderColor="bgPositive"
      >
        <TextBody as="p" padding={1}>
          transparentWhileInactive with borders
        </TextBody>
      </Pressable>
      <Pressable as="button" background="bg" borderColor="bgPrimary" borderRadius={100}>
        <TextBody as="p" padding={1}>
          primary + compact
        </TextBody>
      </Pressable>
      <Pressable as="button" background="bgAlternate" borderColor="bgNegative">
        <TextBody as="p" padding={1}>
          negative
        </TextBody>
      </Pressable>
      <Pressable as="button" background="bgPrimary" borderColor="bgPositive" borderRadius={200}>
        <TextBody as="p" color="fgInverse" padding={1}>
          positive + standard
        </TextBody>
      </Pressable>
      <Pressable as="button" background="bgSecondary" borderColor="bgLineHeavy" borderRadius={200}>
        <TextBody as="p" color="fg" padding={1}>
          bgLineHeavy + tooltip
        </TextBody>
      </Pressable>
      <Pressable as="button" background="bgPositive" borderColor="bgLine" borderRadius={400}>
        <TextBody as="p" color="fgInverse" padding={1}>
          line + pill
        </TextBody>
      </Pressable>
      <Pressable
        as="button"
        background="bgNegative"
        borderColor="bgPrimaryWash"
        borderRadius={1000}
      >
        <TextBody as="p" color="fgInverse" padding={1}>
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
        let textColor = getAccessibleColor({ background: value });
        if (color === 'currentColor') textColor = '#ffffff';
        return (
          <Pressable
            key={color}
            as="button"
            background={color as ThemeVars.Color}
            borderColor="bgLine"
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
        let textColor = getAccessibleColor({ background: value });
        if (color === 'currentColor') textColor = '#ffffff';
        return (
          <Pressable
            key={color}
            disabled
            as="button"
            background={color as ThemeVars.Color}
            borderColor="bgLine"
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
