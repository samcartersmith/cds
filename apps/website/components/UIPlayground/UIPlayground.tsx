import { memo, useCallback, useEffect, useState } from 'react';
import { LiveProviderProps } from 'react-live';
import Playground from '@theme/Playground';
import { Select, SelectOption } from '@cbhq/cds-web/controls';
import { Box, VStack } from '@cbhq/cds-web/layout';
import { Link, TextBody, TextTitle1 } from '@cbhq/cds-web/typography';
import { getBrowserGlobals } from '@cbhq/cds-web/utils/browser';

import ReactLiveScope from ':cds-website/src/theme/ReactLiveScope';

import { playgroundOptions } from './UIPlaygroundSnippets';

type UICodePlaygroundProps = {
  code: string;
  readOnly?: boolean;
  editorStartsExpanded?: boolean;
};

export const UICodePlayground = memo(
  ({ code, readOnly, editorStartsExpanded }: UICodePlaygroundProps) => {
    return (
      <VStack offsetBottom={4}>
        <Playground
          disabled={readOnly}
          editorStartsExpanded={editorStartsExpanded}
          hidePreview={readOnly}
          scope={ReactLiveScope as LiveProviderProps['scope']}
        >
          {code}
        </Playground>
      </VStack>
    );
  },
);

type HelpfulDocumentationProps = {
  docs: string[];
};

const HelpfulDocumentation = ({ docs }: HelpfulDocumentationProps) => {
  const baseURL = 'https://cds.cbhq.net/';
  return (
    <VStack background="background" gap={2} spacingVertical={2}>
      <TextTitle1 as="h1">Related Documentation</TextTitle1>
      {docs.length === 0 && <TextBody as="p">No suggestions</TextBody>}
      {docs.map((doc) => (
        <Box key={doc}>
          <TextBody as="p">
            <Link openInNewWindow to={baseURL + doc}>
              {doc}
            </Link>
          </TextBody>
        </Box>
      ))}
    </VStack>
  );
};

export const UIPlayground = () => {
  const [selectedLabel, setSelectedLabel] = useState('Default');

  useEffect(() => {
    const globals = getBrowserGlobals();
    if (!globals?.window) return;

    const queryParams = new URLSearchParams(globals.window.location.search);
    const initialComponent = queryParams.get('component') || 'Default';
    setSelectedLabel(initialComponent);
  }, []);

  const handleSelectChange = useCallback((newValue: string) => {
    setSelectedLabel(newValue);
    const globals = getBrowserGlobals();
    if (!globals?.window) return;

    const newUrl = new URL(globals.window.location.href);
    newUrl.searchParams.set('component', newValue);
    globals.window.history.pushState({}, '', newUrl);
  }, []);

  const selectedSnippet = playgroundOptions.find(
    (playgroundOption) => playgroundOption.label === selectedLabel,
  )?.snippet;

  const selectedDocs =
    playgroundOptions.find((playgroundOption) => playgroundOption.label === selectedLabel)?.docs ||
    [];

  return (
    <VStack background gap={2}>
      <Select onChange={handleSelectChange} placeholder="Select Snippet" value={selectedLabel}>
        {playgroundOptions.map((option) => (
          <SelectOption
            key={option.label}
            description=""
            title={option.label}
            value={option.label}
          />
        ))}
      </Select>
      <UICodePlayground editorStartsExpanded code={selectedSnippet || ''} />
      <HelpfulDocumentation docs={selectedDocs} />
    </VStack>
  );
};
