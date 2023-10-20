import { memo } from 'react';
import { css } from 'linaria';
import { useIconSize } from '@cbhq/cds-common/hooks/useIconSize';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import names from '@cbhq/cds-icons/__generated__/nav/data/names';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../alpha/VStack';
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
  return <img alt={name} height={iconSize} src={svgPath} width={iconSize} />;
}

function DisclaimerText() {
  return (
    <TextLegal as="p">
      The blue icons are icons loaded originally from Figma. This way you can see if the font
      generated icon differs from how the icon looks in Figma.
    </TextLegal>
  );
}

type NavigationIconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const NavigationIconSheet = memo(function NavigationIconSheet({
  startIndex,
  endIndex,
}: NavigationIconSheetProps) {
  return (
    <VStack gap={2}>
      <DisclaimerText />
      <HStack flexWrap="wrap" gap={2} spacingBottom={2}>
        {names.slice(startIndex, endIndex).map((name) => {
          return (
            <HStack key={`nav-icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <VStack gap={2}>
                <HStack alignItems="center" dangerouslySetClassName={iconFontOverride} gap={2}>
                  <ScaleProvider value="xSmall">
                    <NavigationIcon name={name} size="s" />
                    <NavigationIcon active name={name} size="s" />
                  </ScaleProvider>
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return (
                      <>
                        <NavigationIcon name={name} size={size} />
                        <NavigationIcon active name={name} size={size} />
                      </>
                    );
                  })}
                </HStack>
                <HStack alignItems="center" gap={2}>
                  <ScaleProvider value="xSmall">
                    <SvgFromFigma name={name} size="s" />
                    <SvgFromFigma active name={name} size="s" />
                  </ScaleProvider>
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return (
                      <>
                        <SvgFromFigma name={name} size={size} />
                        <SvgFromFigma active name={name} size={size} />
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
  );
});
