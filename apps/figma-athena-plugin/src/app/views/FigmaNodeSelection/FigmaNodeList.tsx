import React, { useEffect, useMemo, useState } from 'react';
import { HeroSquare } from '@cbhq/cds-web/illustrations/HeroSquare';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Spinner } from '@cbhq/cds-web/loaders/Spinner';
import { TextHeadline } from '@cbhq/cds-web/typography';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';

import type { FigmaNodeData } from '../../../shared/FigmaNodeData';
import { Redirect } from '../../components/Redirect';
import { useGlobalState } from '../../hooks/useGlobalState';
import { useRouter } from '../../hooks/useRouter';
import { subscribeFigma } from '../../subscribeFigma';

import { FigmaNodeListItem } from './FigmaNodeListItem';
import { Footer } from './Footer';
import { Header } from './Header';

const getTextNodes = (acc: FigmaNodeData[], cur: FigmaNodeData) => {
  if (cur.type === 'TEXT') acc.push(cur);
  if (cur.children) acc.push(...cur.children.reduce(getTextNodes, []));
  return acc;
};

export const FigmaNodeList = () => {
  const [selection, setSelection] = useState<FigmaNodeData[]>([]);
  const [checkedNodes, setCheckedNodes] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  const { prompt } = useGlobalState();

  const textNodes = useMemo(() => selection.reduce(getTextNodes, []), [selection]);
  const allTextIds = textNodes.map((n) => n.id);
  const router = useRouter();

  // Handles updating the selection and checkedNodes state when the current selection changes in Figma
  useEffect(() => {
    let loadingTimeoutId: ReturnType<typeof setTimeout>;

    // Listen for selection change start, to set isPending if it takes a while to load
    const unsubscribeSelectionStart = subscribeFigma('selection-change-start', () => {
      clearTimeout(loadingTimeoutId);
      setCheckedNodes([]);
      setSelection([]);
      loadingTimeoutId = setTimeout(() => setIsPending(true), 200);
    });

    // Listen for selection change end, to set the selection node data and reset isPending
    const unsubscribeSelectionEnd = subscribeFigma('selection-change-end', (data) => {
      clearTimeout(loadingTimeoutId);
      setCheckedNodes([]);
      setSelection(data);
      setIsPending(false);
    });

    return () => {
      unsubscribeSelectionStart();
      unsubscribeSelectionEnd();
    };
  }, []);

  if (!prompt) return <Redirect to="prompt-list" />;

  const handlePressPromptName = () =>
    router.navigate('edit-prompt', { onSaveRoute: 'select-nodes', prompt });

  const handlePressGenerate = () =>
    router.navigate('generate-descriptors', { selection, checkedNodes });

  return (
    <VStack height="100%">
      <Header
        checkedNodes={checkedNodes}
        onCheckAll={() => setCheckedNodes(allTextIds)}
        onPressPrompt={handlePressPromptName}
        onUncheckAll={() => setCheckedNodes([])}
        promptName={prompt.name}
        textNodes={textNodes}
      />
      {/* TODO wire up Suspense for fetch figma and calls to server */}
      {isPending ? (
        <VStack alignItems="center" flexGrow={1} gap={2} justifyContent="center" pin="all">
          <Spinner size={4} />
          <TextLabel1 as="span" color="foregroundMuted">
            Loading...
          </TextLabel1>
        </VStack>
      ) : textNodes.length === 0 ? (
        <VStack alignItems="center" flexGrow={1} spacing={2} spacingTop={4}>
          <HeroSquare name="claimCryptoUsername" />
          <TextHeadline align="center" as="span">
            There are no text nodes in your current selection. Select a node or group of nodes to
            get started!
          </TextHeadline>
        </VStack>
      ) : (
        <VStack gap={1} overflow="scroll" spacingVertical={2}>
          {textNodes.map((nodeData) => (
            <FigmaNodeListItem
              key={nodeData.id}
              checkedNodes={checkedNodes}
              depth={1}
              setCheckedNodes={setCheckedNodes}
              {...nodeData}
            />
          ))}
        </VStack>
      )}
      <Footer
        isGenerateDisabled={checkedNodes.length < 1}
        onPressBack={() => router.goBack()}
        onPressGenerate={handlePressGenerate}
      />
    </VStack>
  );
};
