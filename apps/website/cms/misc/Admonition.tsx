import { Document } from '@contentful/rich-text-types';
import { PaletteValue } from '@cbhq/cds-common/types';
import { usePaletteValueToRgbaString } from '@cbhq/cds-web/color/usePaletteValueToRgbaString';
import { Icon, IconName } from '@cbhq/cds-web/icons/Icon';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { TextTitle4 } from '@cbhq/cds-web/typography';

import { RichText } from './RichText';

type Type = 'note' | 'tip' | 'danger' | 'info' | 'caution';

const backgroundMap: Record<Type, PaletteValue> = {
  note: 'gray5',
  tip: 'green5',
  danger: 'red5',
  info: 'blue5',
  caution: 'orange5',
};

const iconMap: Record<Type, IconName> = {
  note: 'annotation',
  tip: 'lightbulb',
  danger: 'flame',
  info: 'info',
  caution: 'warning',
};

export const Admonition = ({
  type = 'tip',
  content,
  title,
}: {
  type?: Type;
  content: Document;
  title?: string;
}) => {
  const backgroundColor = usePaletteValueToRgbaString(backgroundMap[type]);
  return (
    <VStack spacingVertical={1}>
      <VStack borderRadius="roundedLarge" dangerouslySetBackground={backgroundColor} spacing={3}>
        <HStack gap={3}>
          <Icon name={iconMap[type]} size="s" spacingTop={1} color="foreground" />
          {title ? <TextTitle4 as="h4">{title}</TextTitle4> : null}
        </HStack>
        <HStack spacingStart={5}>
          <RichText content={content} />
        </HStack>
      </VStack>
    </VStack>
  );
};
