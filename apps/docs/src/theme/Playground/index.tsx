import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback, usePrismTheme } from '@docusaurus/theme-common';
import { Collapsible } from '@cbhq/cds-web/collapsible/Collapsible';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { Box } from '@cbhq/cds-web/layout';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { useToast } from '@cbhq/cds-web/overlays/useToast';
import { Pressable } from '@cbhq/cds-web/system';
import { ThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import { Text } from '@cbhq/cds-web/typography/Text';

import { usePlaygroundTheme } from '../Layout/Provider/UnifiedThemeContext';

import styles from './styles.module.css';

type PlaygroundProps = Omit<React.ComponentProps<typeof LiveProvider>, 'transformCode'> & {
  transformCode?: (val: string) => string;
  children: string;
  hideControls?: boolean;
  hidePreview?: boolean;
  editorStartsExpanded?: boolean;
};

const renderErrorFallback = (params: any) => <ErrorBoundaryErrorMessageFallback {...params} />;

const previewComponent = () => (
  <>
    <ErrorBoundary fallback={renderErrorFallback}>
      <LivePreview />
    </ErrorBoundary>
    <LiveError />
  </>
);

const isHeader = (element: HTMLElement): boolean => {
  return (
    element.tagName === 'H1' ||
    element.tagName === 'H2' ||
    element.tagName === 'H3' ||
    element.tagName === 'H4' ||
    element.tagName === 'H5' ||
    element.tagName === 'H6'
  );
};

const useGetHeadingText = () => {
  const [headingText, setHeadingText] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the heading text from the previous header sibling
    if (!editorRef.current?.parentElement) return;

    let currentElement = editorRef.current.parentElement;
    if (isHeader(currentElement) && currentElement.classList.contains('anchor')) {
      setHeadingText(currentElement.textContent?.toLowerCase() || '');
      return;
    }

    // Look through previous siblings for a header
    while (currentElement.previousElementSibling) {
      currentElement = currentElement.previousElementSibling as HTMLElement;
      if (isHeader(currentElement) && currentElement.classList.contains('anchor')) {
        setHeadingText(currentElement.textContent?.toLowerCase() || '');
        return;
      }
    }

    // No appropriate heading found
    setHeadingText('');
  }, []);

  return { editorRef, headingText };
};

const Playground = memo(function Playground({
  children,
  transformCode,
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

  const { editorRef, headingText } = useGetHeadingText();

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
    <VStack ref={editorRef} paddingBottom={3}>
      <ThemeProvider activeColorScheme={colorScheme} theme={theme}>
        <LiveProvider code={code} theme={prismTheme} transformCode={transformCode} {...props}>
          {!hidePreview && (
            <VStack background="bg" borderRadius={400} color="fg" font="body" padding={3}>
              <BrowserOnly fallback={<div>Loading...</div>}>{previewComponent}</BrowserOnly>
            </VStack>
          )}
          <Collapsible collapsed={collapsed} paddingBottom={0.5} paddingTop={1}>
            <VStack background="bg" borderRadius={400} overflow="hidden" width="100%">
              <Box borderedBottom paddingBottom={0.5} paddingTop={0.75} paddingX={1} width="100%">
                <Text
                  alignItems="center"
                  color="fgMuted"
                  display="flex"
                  font="label1"
                  userSelect="none"
                >
                  <Icon color="fgMuted" name="pencil" paddingEnd={0.5} size="xs" /> Live Code
                </Text>
              </Box>
              <LiveEditor className={styles.playgroundEditor} />
            </VStack>
          </Collapsible>
          {!hideControls && (
            <HStack alignItems="center" gap={2} paddingTop={0.5}>
              <Pressable
                noScaleOnPress
                accessibilityLabel={`${collapsed ? 'Show' : 'Hide'} code${
                  headingText ? ` for ${headingText} example` : ''
                }`}
                onClick={toggleCode}
              >
                <HStack alignItems="center">
                  <Icon name={collapsed ? 'caretDown' : 'caretUp'} paddingEnd={0.5} size="xs" />
                  <Text color="fgPrimary" font="label1">
                    {collapsed ? 'Show code' : 'Hide code'}
                  </Text>
                </HStack>
              </Pressable>
              <Pressable
                noScaleOnPress
                accessibilityLabel={`Copy code${headingText ? ` for ${headingText} example` : ''}`}
                onClick={handleCopyToClipboard}
              >
                <HStack alignItems="center">
                  <Icon name="copy" paddingEnd={0.5} size="xs" />
                  <Text color="fgPrimary" font="label1">
                    Copy code
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
          )}
        </LiveProvider>
      </ThemeProvider>
    </VStack>
  );
});

export default Playground;
