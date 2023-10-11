import { memo } from 'react';
import { css } from 'linaria';
import { IconName, IconSize, useIconSize } from '@cbhq/cds-common';
import { ScaleProvider } from '@cbhq/cds-common/scale/ScaleProvider';
import names from '@cbhq/cds-icons/__generated__/ui/data/names';

import { HStack } from '../../alpha/HStack';
import { VStack } from '../../alpha/VStack';
import { palette } from '../../tokens';
import { TextLegal } from '../../typography';
import { Icon } from '../Icon';

type SvgFromFigmaProps = { name: IconName; size: IconSize };

const iconFontOverride = css`
  span {
    color: ${palette.foreground} !important;
  }
`;

function SvgFromFigma({ name, size }: SvgFromFigmaProps) {
  const { iconSize, sourceSize } = useIconSize(size);
  const svgPath = `@cbhq/cds-icons/__generated__/ui/svg/ui-${name}-${sourceSize}.svg`;
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

type IconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const IconSheet = memo(function IconSheet({ startIndex, endIndex }: IconSheetProps) {
  return (
    <VStack gap={2}>
      <DisclaimerText />
      <HStack gap={2} spacingBottom={2} flexWrap="wrap">
        {names.slice(startIndex, endIndex).map((name) => {
          return (
            <HStack key={`icon-wrapper-${name}`} gap={2} flexWrap="wrap">
              <VStack gap={2}>
                <HStack gap={2} alignItems="center" dangerouslySetClassName={iconFontOverride}>
                  <ScaleProvider value="xSmall">
                    <Icon name={name} size="s" color="foreground" />
                  </ScaleProvider>
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return <Icon key={`icon-${size}`} name={name} size={size} color="foreground" />;
                  })}
                </HStack>
                <HStack gap={2} alignItems="center">
                  <ScaleProvider value="xSmall">
                    <SvgFromFigma name={name} size="s" />
                  </ScaleProvider>
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return <SvgFromFigma key={`figma-icon-${size}`} name={name} size={size} />;
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
