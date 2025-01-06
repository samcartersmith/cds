import React, { memo, useCallback, useRef } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
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

type PlaygroundProps = Omit<React.ComponentProps<typeof LiveProvider>, 'transformCode'> & {
  transformCode?: (val: string) => string;
  children: string;
  borderless?: boolean;
  hideControls?: boolean;
  hidePreview?: boolean;
  editorStartsExpanded?: boolean;
};

const transformCodeFallback = (code: unknown) => `${code};`;

const Playground = memo(function Playground({
  children,
  transformCode: transformCodeProp = transformCodeFallback,
  borderless,
  hideControls,
  hidePreview,
  editorStartsExpanded,
  ...props
}: PlaygroundProps): JSX.Element {
  const prismTheme = usePrismTheme();
  const code = children.replace(/\n$/, '');
  const codeRef = useRef<string>(code);
  const [collapsed, { toggle }] = useToggler(!editorStartsExpanded);
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
    <VStack className="code-playground" gap={1} spacingBottom={3}>
      <LiveProvider code={code} theme={prismTheme} transformCode={transformCode} {...props}>
        {!hidePreview && (
          <VStack
            borderRadius="roundedLarge"
            bordered={!borderless}
            overflow={!borderless ? 'hidden' : undefined}
            spacing={borderless ? 0 : 3}
          >
            <BrowserOnly fallback={<div>Loading...</div>}>{preview}</BrowserOnly>
          </VStack>
        )}
        {!hideControls && (
          <HStack alignItems="center" gap={0.5} offsetHorizontal={1}>
            <Pressable
              noScaleOnPress
              transparentWhileInactive
              background="background"
              borderRadius="roundedLarge"
              onPress={toggle}
            >
              <HStack alignItems="center" gap={1} spacing={1} width={112}>
                <Icon color="primary" name={collapsed ? 'caretDown' : 'caretUp'} size="xs" />
                <TextCaption as="p" color="primary" transform="none">
                  {collapsed ? 'Show code' : 'Hide code'}
                </TextCaption>
              </HStack>
            </Pressable>
            <Pressable
              noScaleOnPress
              transparentWhileInactive
              background="background"
              borderRadius="roundedFull"
              onPress={handleCopyToClipboard}
            >
              <HStack alignItems="center" gap={1} spacing={1}>
                <Icon color="primary" name="copy" size="xs" />
                <TextCaption as="p" color="primary" transform="none">
                  Copy code
                </TextCaption>
              </HStack>
            </Pressable>
          </HStack>
        )}
        <Collapsible collapsed={collapsed}>
          <VStack borderRadius="roundedLarge" overflow="hidden" width="100%">
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
