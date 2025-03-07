import React, { memo, useCallback, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback, usePrismTheme } from '@docusaurus/theme-common';
import { Collapsible } from '@cbhq/cds-web2/collapsible/Collapsible';
import { Icon } from '@cbhq/cds-web2/icons/Icon';
import { HStack } from '@cbhq/cds-web2/layout/HStack';
import { VStack } from '@cbhq/cds-web2/layout/VStack';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
import { Pressable } from '@cbhq/cds-web2/system/Pressable';
import { ThemeProvider } from '@cbhq/cds-web2/system/ThemeProvider';
import { Text } from '@cbhq/cds-web2/typography/Text';

import { usePlaygroundTheme } from '../Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

type PlaygroundProps = Omit<React.ComponentProps<typeof LiveProvider>, 'transformCode'> & {
  transformCode?: (val: string) => string;
  children: string;
  hideControls?: boolean;
  hidePreview?: boolean;
  editorStartsExpanded?: boolean;
};

const transformCodeFallback = (code: unknown) => `${code};`;

const renderErrorFallback = (params: any) => <ErrorBoundaryErrorMessageFallback {...params} />;

const previewComponent = () => (
  <>
    <ErrorBoundary fallback={renderErrorFallback}>
      <LivePreview />
    </ErrorBoundary>
    <LiveError />
  </>
);

const Playground = memo(function Playground({
  children,
  transformCode: transformCodeProp = transformCodeFallback,
  hideControls,
  hidePreview,
  editorStartsExpanded,
  ...props
}: PlaygroundProps): JSX.Element {
  const prismTheme = usePrismTheme();
  const code = children.replace(/\n$/, '');
  const [collapsed, setIsCollapsed] = useState(!editorStartsExpanded);
  const toggleCode = useCallback(() => setIsCollapsed((collapsed) => !collapsed), []);
  const toast = useToast();
  const { colorScheme, theme } = usePlaygroundTheme();

  const transformCode = useCallback(
    (val: string) => transformCodeProp(val.replace(/\n$/, '')),
    [transformCodeProp],
  );

  const handleCopyToClipboard = useCallback(() => {
    if (navigator) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          toast.show('Copied to clipboard');
        })
        .catch(() => {
          toast.show('Failed to copy to clipboard');
        });
    }
  }, [toast, code]);

  return (
    <ThemeProvider activeColorScheme={colorScheme} theme={theme}>
      <VStack gap={1} paddingBottom={3}>
        <LiveProvider code={code} theme={prismTheme} transformCode={transformCode} {...props}>
          {!hidePreview && (
            <VStack background="bg" borderRadius={400} padding={3}>
              <BrowserOnly fallback={<div>Loading...</div>}>{previewComponent}</BrowserOnly>
            </VStack>
          )}
          {!hideControls && (
            <HStack alignItems="center" gap={0.5}>
              <Pressable
                noScaleOnPress
                transparentWhileInactive
                background="bg"
                borderRadius={400}
                onClick={toggleCode}
              >
                <HStack alignItems="center" gap={1} padding={1}>
                  <Icon color="fgPrimary" name={collapsed ? 'caretDown' : 'caretUp'} size="xs" />
                  <Text as="p" color="fgPrimary" font="caption" transform="none">
                    {collapsed ? 'Show code' : 'Hide code'}
                  </Text>
                </HStack>
              </Pressable>
              <Pressable
                noScaleOnPress
                transparentWhileInactive
                background="bg"
                borderRadius={1000}
                onClick={handleCopyToClipboard}
              >
                <HStack alignItems="center" gap={1} padding={1}>
                  <Icon color="fgPrimary" name="copy" size="xs" />
                  <Text color="fgPrimary" font="caption" transform="none">
                    Copy code
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
          )}
          <Collapsible collapsed={collapsed}>
            <VStack
              background="bg"
              borderRadius={400}
              overflow="hidden"
              paddingX={3}
              paddingY={2}
              width="100%"
            >
              <LiveEditor className={styles.playgroundEditor} />
            </VStack>
          </Collapsible>
        </LiveProvider>
      </VStack>
    </ThemeProvider>
  );
});

export default Playground;
