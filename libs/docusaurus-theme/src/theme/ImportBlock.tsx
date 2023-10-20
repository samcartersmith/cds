import React, { memo, useCallback, useState } from 'react';
import type { ImportBlockProps } from '@theme/ImportBlock';
import type { IconName } from '@cbhq/cds-web';
import { IconButton } from '@cbhq/cds-web/buttons';
import { HStack } from '@cbhq/cds-web/layout';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { TextLabel2 } from '@cbhq/cds-web/typography';
import { paletteValueToCssVar } from '@cbhq/cds-web/utils/palette';

/**
 * Displays the `import { Button } from '@cbhq/cds-mobile/buttons/Button` type of content
 */
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
      alignItems="center"
      borderRadius="rounded"
      dangerouslySetBackground={paletteValueToCssVar('blue0')}
      justifyContent="space-between"
      spacing={2}
    >
      <HStack>
        <TextLabel2
          mono
          as="span"
          dangerouslySetColor={paletteValueToCssVar('purple60')}
          spacingEnd={1}
        >
          {`import { ${name} } from `}
        </TextLabel2>
        <TextLabel2 mono as="span" dangerouslySetColor={paletteValueToCssVar('blue50')}>
          {` '${from}'`}
        </TextLabel2>
      </HStack>
      <IconButton
        compact
        transparent
        name={iconName}
        onPress={handleCopyToClipboard}
        variant="secondary"
      />
    </HStack>
  );
});

export default ImportBlock;
