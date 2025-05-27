import React, { type ReactNode } from 'react';
import { usePrismTheme, useThemeConfig } from '@docusaurus/theme-common';
import {
  containsLineNumbers,
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
} from '@docusaurus/theme-common/internal';
import { cx } from '@linaria/core';
import type { Props } from '@theme/CodeBlock/Content/String';
import CopyButton from '@theme/CodeBlock/CopyButton';
import Line from '@theme/CodeBlock/Line';
import { Highlight } from 'prism-react-renderer';
import { Box, Divider, HStack, VStack } from '@cbhq/cds-web/layout';
import { Text } from '@cbhq/cds-web/typography';

import styles from './styles.module.css';

// Prism languages are always lowercase
// We want to fail-safe and allow both "php" and "PHP"
// See https://github.com/facebook/docusaurus/issues/9012
function normalizeLanguage(language: string | undefined): string | undefined {
  return language?.toLowerCase();
}

export default function CodeBlockString({
  children,
  className: blockClassName = '',
  metastring,
  title: titleProp,
  showLineNumbers: showLineNumbersProp,
  language: languageProp,
}: Props): ReactNode {
  const {
    prism: { defaultLanguage, magicComments },
  } = useThemeConfig();
  const language = normalizeLanguage(
    languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage,
  );

  const prismTheme = usePrismTheme();
  // We still parse the metastring in case we want to support more syntax in the
  // future. Note that MDX doesn't strip quotes when parsing metastring:
  // "title=\"xyz\"" => title: "\"xyz\""
  const title = parseCodeBlockTitle(metastring) || titleProp;

  const { lineClassNames, code } = parseLines(children, {
    metastring,
    language,
    magicComments,
  });
  const showLineNumbers = showLineNumbersProp ?? containsLineNumbers(metastring);

  return (
    <VStack
      as="div"
      background="bg"
      borderRadius={400}
      className={cx(
        styles.codeBlock,
        blockClassName,
        language && !blockClassName.includes(`language-${language}`) && `language-${language}`,
      )}
      overflow="hidden"
    >
      {title && (
        <HStack
          alignItems="center"
          justifyContent="space-between"
          paddingEnd={0.75}
          paddingStart={2}
          paddingY={0.75}
        >
          <Text font="label1">{title}</Text>
          <HStack>
            <CopyButton className={styles.codeButton} code={code} />
          </HStack>
        </HStack>
      )}
      {title && <Divider />}
      <Box className={styles.codeBlockContent} position="relative">
        <Highlight code={code} language={language ?? 'text'} theme={prismTheme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Box
              as="pre"
              className={cx(className, 'thin-scrollbar')}
              display="block"
              margin={0}
              padding={0}
              style={style}
            >
              <Text
                mono
                as="code"
                className={styles.codeBlockLines}
                display="block"
                font="label2"
                minWidth="100%"
                paddingX={2}
                paddingY={showLineNumbers ? 0 : 2}
              >
                {tokens.map((line, i) => (
                  <Line
                    key={`${line.map((token) => token.content).join('')}`}
                    classNames={lineClassNames[i]}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                    line={line}
                    showLineNumbers={showLineNumbers}
                  />
                ))}
              </Text>
            </Box>
          )}
        </Highlight>
        {!title && (
          <HStack
            className={styles.buttonGroup}
            padding={0.75}
            position="absolute"
            right={0}
            top={0}
          >
            <CopyButton code={code} />
          </HStack>
        )}
      </Box>
    </VStack>
  );
}
