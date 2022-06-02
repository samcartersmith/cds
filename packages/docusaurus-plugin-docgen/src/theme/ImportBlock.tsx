import React, { memo, useCallback, useState } from 'react';
import type { ImportBlockProps } from '@theme/ImportBlock';
import { IconName } from '@cbhq/cds-common/types';
import { IconButton } from '@cbhq/cds-web/buttons';
import { HStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { TextLabel2 } from '@cbhq/cds-web/typography';
import { paletteValueToCssVar } from '@cbhq/cds-web/utils/palette';

const ImportBlock = memo(function ImportBlock({ name, from }: ImportBlockProps) {
  const [iconName, setIconName] = useState<IconName>('clipboard');
  const toast = useToast();

  const handleCopyToClipboard = useCallback(() => {
    setIconName('checkmark');
    if (navigator) {
      void navigator.clipboard.writeText(`import {${name}} from '${from}';`).then(() => {
        toast.show('Copied to clipboard');
        setTimeout(() => {
          setIconName('clipboard');
        }, 600);
      });
    }
  }, [from, name, toast]);

  return (
    <HStack
      spacing={2}
      alignItems="center"
      borderRadius="rounded"
      justifyContent="space-between"
      dangerouslySetBackground={paletteValueToCssVar('blue0')}
    >
      <HStack>
        <TextLabel2
          as="span"
          mono
          dangerouslySetColor={paletteValueToCssVar('purple60')}
          spacingEnd={1}
        >
          {`import { ${name} } from `}
        </TextLabel2>
        <TextLabel2 as="span" mono dangerouslySetColor={paletteValueToCssVar('blue50')}>
          {` '${from}'`}
        </TextLabel2>
      </HStack>
      <IconButton
        compact
        variant="secondary"
        transparent
        name={iconName}
        onPress={handleCopyToClipboard}
      />
    </HStack>
  );
});

export default ImportBlock;
