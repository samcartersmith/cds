import React, { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/CodeBlock/CopyButton';
import { IconButton } from '@cbhq/cds-web2/buttons/IconButton';
import { Tooltip } from '@cbhq/cds-web2/overlays/tooltip/Tooltip';

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export default function CopyButton({ code }: Props): ReactNode {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);
  const handleCopyCode = useCallback(async () => {
    const success = await copyTextToClipboard(code);
    if (success) {
      setIsCopied(true);
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }, [code]);

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  return (
    <Tooltip
      content={
        isCopied
          ? translate({
              id: 'theme.CodeBlock.copied',
              message: 'Copied',
              description: 'The copied button label on code blocks',
            })
          : translate({
              id: 'theme.CodeBlock.copyButtonAriaLabel',
              message: 'Copy code to clipboard',
              description: 'The ARIA label for copy code blocks button',
            })
      }
    >
      <IconButton
        compact
        transparent
        aria-label={
          isCopied
            ? translate({
                id: 'theme.CodeBlock.copied',
                message: 'Copied',
                description: 'The copied button label on code blocks',
              })
            : translate({
                id: 'theme.CodeBlock.copyButtonAriaLabel',
                message: 'Copy code to clipboard',
                description: 'The ARIA label for copy code blocks button',
              })
        }
        name={isCopied ? 'checkmark' : 'copy'}
        onClick={handleCopyCode}
      />
    </Tooltip>
  );
}
