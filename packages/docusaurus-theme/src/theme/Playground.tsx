import React, { memo, useCallback, useRef } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider, LiveProviderProps } from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { usePrismTheme } from '@docusaurus/theme-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Collapsible } from '@cbhq/cds-web/collapsible';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Pressable } from '@cbhq/cds-web/system/Pressable';
import { spacing } from '@cbhq/cds-web/tokens';
import { TextCaption } from '@cbhq/cds-web/typography/TextCaption';

type PlaygroundProps = LiveProviderProps & {
  children: string;
  borderless?: boolean;
  hideControls?: boolean;
};

const transformCodeFallback = (code: unknown) => `${code};`;

const Playground = memo(function Playground({
  children,
  transformCode: transformCodeProp = transformCodeFallback,
  borderless,
  hideControls,
  ...props
}: PlaygroundProps): JSX.Element {
  const prismTheme = usePrismTheme();
  const code = children.replace(/\n$/, '');
  const codeRef = useRef<string>(code);
  const [collapsed, { toggle }] = useToggler(true);
  const toast = useToast();

  const transformCode = useCallback(
    (val: string) => {
      const newValue = transformCodeProp(val.replace(/\n$/, ''));
      codeRef.current = newValue;
      return newValue;
    },
    [transformCodeProp],
  );

  const handleCopyToClipboard = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(code).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [toast, code]);

  const preview = useCallback(
    () => (
      <>
        <LivePreview />
        <LiveError />
      </>
    ),
    [],
  );

  return (
    <VStack gap={1} spacingBottom={3} dangerouslySetClassName="code-playground">
      {/* @ts-expect-error - issue with LiveProvider props */}
      <LiveProvider code={code} transformCode={transformCode} theme={prismTheme} {...props}>
        <VStack
          borderRadius="popover"
          bordered={!borderless}
          overflow={!borderless ? 'hidden' : undefined}
          spacing={borderless ? 0 : 3}
        >
          <BrowserOnly fallback={<div>Loading...</div>}>{preview}</BrowserOnly>
        </VStack>
        {!hideControls && (
          <HStack gap={0.5} alignItems="center" offsetHorizontal={1}>
            <Pressable
              backgroundColor="background"
              borderRadius="popover"
              onPress={toggle}
              noScaleOnPress
              transparentWhileInactive
            >
              <HStack gap={1} spacing={1} width={112} alignItems="center">
                <Icon name={collapsed ? 'caretDown' : 'caretUp'} size="xs" color="primary" />
                <TextCaption transform="none" as="p" color="primary">
                  {collapsed ? 'Show code' : 'Hide code'}
                </TextCaption>
              </HStack>
            </Pressable>
            <Pressable
              backgroundColor="background"
              borderRadius="round"
              noScaleOnPress
              onPress={handleCopyToClipboard}
              transparentWhileInactive
            >
              <HStack gap={1} spacing={1} alignItems="center">
                <Icon name="copy" size="xs" color="primary" />
                <TextCaption transform="none" as="p" color="primary">
                  Copy code
                </TextCaption>
              </HStack>
            </Pressable>
          </HStack>
        )}
        <Collapsible collapsed={collapsed}>
          <VStack width="100%" borderRadius="popover" overflow="hidden">
            <LiveEditor
              className="playground-live-wrapper"
              // @ts-expect-error - issue with LiveEditor props
              padding={spacing[3]}
            />
          </VStack>
        </Collapsible>
      </LiveProvider>
    </VStack>
  );
});

export default Playground;
