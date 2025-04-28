import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { ErrorBoundaryErrorMessageFallback, usePrismTheme } from '@docusaurus/theme-common';
import { Button } from '@cbhq/cds-web2/buttons/Button';
import { Collapsible } from '@cbhq/cds-web2/collapsible/Collapsible';
import { HStack } from '@cbhq/cds-web2/layout/HStack';
import { VStack } from '@cbhq/cds-web2/layout/VStack';
import { useToast } from '@cbhq/cds-web2/overlays/useToast';
import { ThemeProvider } from '@cbhq/cds-web2/system/ThemeProvider';

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

  const { editorRef, headingText } = useGetHeadingText();

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
      <VStack ref={editorRef} gap={1}>
        <LiveProvider code={code} theme={prismTheme} transformCode={transformCode} {...props}>
          {!hidePreview && (
            <VStack background="bg" borderRadius={400} color="fg" font="body" padding={3}>
              <BrowserOnly fallback={<div>Loading...</div>}>{previewComponent}</BrowserOnly>
            </VStack>
          )}
          {!hideControls && (
            <HStack alignItems="center" gap={0.5}>
              <Button
                compact
                noScaleOnPress
                transparent
                transparentWhilePressed
                accessibilityLabel={`${collapsed ? 'Show' : 'Hide'} code${
                  headingText ? ` for ${headingText} example` : ''
                }`}
                flush="start"
                onClick={toggleCode}
                startIcon={collapsed ? 'caretDown' : 'caretUp'}
                variant="primary"
              >
                {collapsed ? 'Show code' : 'Hide code'}
              </Button>
              <Button
                compact
                noScaleOnPress
                transparent
                accessibilityLabel={`Copy code${headingText ? ` for ${headingText} example` : ''}`}
                flush="start"
                onClick={handleCopyToClipboard}
                startIcon="copy"
                variant="primary"
              >
                Copy code
              </Button>
            </HStack>
          )}
          <Collapsible collapsed={collapsed}>
            <VStack background="bg" borderRadius={400} overflow="hidden" width="100%">
              <LiveEditor className={styles.playgroundEditor} />
            </VStack>
          </Collapsible>
        </LiveProvider>
      </VStack>
    </ThemeProvider>
  );
});

export default Playground;
