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

type IconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const IconSheet = memo(function IconSheet({ startIndex, endIndex }: IconSheetProps) {
  return (
    <VStack gap={2}>
      <DisclaimerText />
      <HStack flexWrap="wrap" gap={2} spacingBottom={2}>
        {names.slice(startIndex, endIndex).map((name) => {
          return (
            <HStack key={`icon-wrapper-${name}`} flexWrap="wrap" gap={2}>
              <VStack gap={2}>
                <HStack alignItems="center" dangerouslySetClassName={iconFontOverride} gap={2}>
                  <ScaleProvider value="xSmall">
                    <Icon color="foreground" name={name} size="s" />
                  </ScaleProvider>
                  {(['s', 'm', 'l'] as const).map((size) => {
                    return <Icon key={`icon-${size}`} color="foreground" name={name} size={size} />;
                  })}
                </HStack>
                <HStack alignItems="center" gap={2}>
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
