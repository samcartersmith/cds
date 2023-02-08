import { memo } from 'react';
import { css } from 'linaria';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import names from '@cbhq/cds-icons/__generated__/nav/data/names';

import { HStack, VStack } from '../../layout';
import { FeatureFlagProvider } from '../../system/FeatureFlagProvider';
import { palette } from '../../tokens';
import { TextLegal } from '../../typography';
import { NavigationIcon, NavigationIconName, NavigationIconSize } from '../NavigationIcon';

type SvgFromFigmaProps = { name: NavigationIconName; size: NavigationIconSize; active?: boolean };

const iconFontOverride = css`
  span {
    color: ${palette.foreground} !important;
  }
`;

function SvgFromFigma({ name, size, active }: SvgFromFigmaProps) {
  const { iconSize, sourceSize } = useIconSize(size);
  const activeSuffix = active ? 'active' : 'inactive';
  const svgPath = `@cbhq/cds-icons/__generated__/nav/svg/nav-${name}-${sourceSize}-${activeSuffix}.svg`;
  return <img src={svgPath} alt={name} width={iconSize} height={iconSize} />;
}

function DisclaimerText() {
  return (
    <TextLegal as="p">
      The blue icons are icons loaded originally from Figma. This way you can see if the font
      generated icon differs from how the icon looks in Figma.
    </TextLegal>
  );
}

export const NavigationIconSheet = memo(function NavigationIconSheet() {
  return (
    <FeatureFlagProvider flexGap>
      <VStack gap={2}>
        <DisclaimerText />
        <HStack gap={2} spacingBottom={2} flexWrap="wrap">
          {names.map((name) => {
            return (
              <HStack key={`nav-icon-wrapper-${name}`} gap={2} flexWrap="wrap">
                <VStack gap={2}>
                  <HStack gap={2} alignItems="center" dangerouslySetClassName={iconFontOverride}>
                    <ScaleProvider value="xSmall">
                      <NavigationIcon name={name} size="s" />
                      <NavigationIcon name={name} size="s" active />
                    </ScaleProvider>
                    {(['s', 'm', 'l'] as const).map((size) => {
                      return (
                        <>
                          <NavigationIcon name={name} size={size} />
                          <NavigationIcon name={name} size={size} active />
                        </>
                      );
                    })}
                  </HStack>
                  <HStack gap={2} alignItems="center">
                    <ScaleProvider value="xSmall">
                      <SvgFromFigma name={name} size="s" />
                      <SvgFromFigma name={name} size="s" active />
                    </ScaleProvider>
                    {(['s', 'm', 'l'] as const).map((size) => {
                      return (
                        <>
                          <SvgFromFigma name={name} size={size} />
                          <SvgFromFigma name={name} size={size} active />
                        </>
                      );
                    })}
                  </HStack>
                </VStack>
              </HStack>
            );
          })}
        </HStack>
      </VStack>
    </FeatureFlagProvider>
  );
});
