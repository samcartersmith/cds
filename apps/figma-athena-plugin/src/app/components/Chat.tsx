import { useCallback, useEffect, useRef, useState } from 'react';
import { ColorSurgeRefBaseProps } from '@cbhq/cds-common/types/ColorSurgeBaseProps';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { Spinner } from '@cbhq/cds-web/loaders/Spinner';
import { ColorSurge } from '@cbhq/cds-web/motion/ColorSurge';
import { PressableOpacity } from '@cbhq/cds-web/system/PressableOpacity';
import { TextBody } from '@cbhq/cds-web/typography/TextBody';
import { TextLabel1 } from '@cbhq/cds-web/typography/TextLabel1';
import { TextLabel2 } from '@cbhq/cds-web/typography/TextLabel2';
import { TextTitle4 } from '@cbhq/cds-web/typography/TextTitle4';

import type { FigmaNodeData } from '../../shared/FigmaNodeData';
import type { Prompt } from '../../shared/Prompt';
import { AthenaServerClient } from '../AthenaServerClient';
import { useGlobalState } from '../hooks/useGlobalState';
import { useRouter } from '../hooks/useRouter';

import { Redirect } from './Redirect';

const copyToClipboard = (text: string) => {
  // @ts-expect-error copy exists TODO - use Navigator/clipboard API?
  if ('copy' in window) window.copy(value);
  else {
    const tempElement = document.createElement('textarea');
    tempElement.style.width = '0px';
    tempElement.style.height = '0px';
    tempElement.style.opacity = '0';
    document.body.appendChild(tempElement);
    tempElement.value = text;
    tempElement.focus();
    tempElement.select();
    const result = document.execCommand('copy');
    document.body.removeChild(tempElement);
    if (!result) throw new Error('Failed to copy to clipboard');
  }
};

const CODE_REGEX = /```(?:typescript|ts)?[\r\n]?(.*?)[\r\n]?```/s;
const generateDescriptors = async ({
  prompt,
  selection,
  checkedNodes,
  apiKey,
  secret,
}: {
  prompt: Prompt;
  selection: FigmaNodeData[];
  checkedNodes: string[];
  apiKey: string;
  secret: string;
}) => {
  const { data } = await AthenaServerClient.post<{ data: string }>(
    'generate',
    JSON.stringify({ prompt, selection, checkedNodes, apiKey, secret }),
  );

  // get the first match which should be the generated typescript code block from the server
  const [, p1] = data.match(CODE_REGEX) ?? [];
  return p1 ?? '';
};

const headerHeight = 60;
const footerHeight = 60;

export const Chat = () => {
  const { prompt, cbGPT } = useGlobalState();
  const router = useRouter<{ selection: FigmaNodeData[]; checkedNodes: string[] }>();
  const { selection, checkedNodes } = router.state;
  const [responses, setResponses] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const responseListRef = useRef<HTMLElement>(null);
  const colorSurgeRefs = useRef<Record<string, ColorSurgeRefBaseProps>>({});

  const handleGenerate = useCallback(async () => {
    if (!prompt || !selection?.length || !checkedNodes?.length || !cbGPT.apiKey || !cbGPT.secret) {
      const error = new Error('Missing required data for CB-GPT codegen');
      return Promise.reject(error);
    }

    setIsPending(true);
    generateDescriptors({
      prompt,
      selection,
      checkedNodes,
      apiKey: cbGPT.apiKey,
      secret: cbGPT.secret,
    })
      .then((response) => {
        if (response) {
          setResponses((s) => [...s, response]);
        }

        if (!responseListRef.current) return;
        responseListRef.current.scrollTo({
          top: responseListRef.current.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch((e) => {
        // TODO error handling from server
        console.error(e);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [cbGPT.apiKey, cbGPT.secret, checkedNodes, prompt, selection]);

  useEffect(() => {
    void handleGenerate();
  }, [handleGenerate]);

  const handlePressGenerate = async () => {
    void handleGenerate();
  };

  const handlePressResponse = (response: string, index: number) => {
    copyToClipboard(response);
    void colorSurgeRefs.current[index].play();
  };

  const registerColorSurgeRef = (index: number, ref: ColorSurgeRefBaseProps | null) => {
    if (ref) colorSurgeRefs.current[index] = ref;
  };

  if (!prompt || !selection?.length || !checkedNodes?.length) return <Redirect to="select-nodes" />;

  return (
    <VStack height="100vh" width="100%">
      <VStack
        alignItems="flex-start"
        background="background"
        elevation={1}
        height={headerHeight}
        justifyContent="space-between"
        spacing={1}
        width="100%"
      >
        <TextTitle4 as="span">{prompt.name}</TextTitle4>
        <HStack gap={1}>
          <TextLabel1 as="span">{checkedNodes.length}</TextLabel1>
          <TextLabel2 as="span">text nodes selected</TextLabel2>
        </HStack>
      </VStack>
      {isPending ? (
        <VStack alignItems="center" gap={2} justifyContent="center" pin="all">
          <Spinner size={4} />
          <TextLabel1 as="span" color="foregroundMuted">
            Generating...
          </TextLabel1>
        </VStack>
      ) : (
        <VStack
          maxHeight={`calc(100vh - ${headerHeight + footerHeight}px)`}
          overflow="scroll"
          spacing={2}
          spacingVertical={4}
        >
          {responses.map((response, index) => (
            <VStack
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              bordered
              background="secondary"
              borderRadius="roundedMedium"
              overflow="scroll"
              width="100%"
            >
              <PressableOpacity onPress={() => handlePressResponse(response, index)}>
                <TextBody as="pre" spacing={1}>
                  {response}
                </TextBody>
                <ColorSurge
                  ref={(ref) => registerColorSurgeRef(index, ref)}
                  disableAnimateOnMount
                />
              </PressableOpacity>
            </VStack>
          ))}
        </VStack>
      )}
      <HStack
        background="background"
        elevation={1}
        gap={2}
        height={footerHeight}
        pin="bottom"
        spacing={1}
        width="100%"
      >
        <Button compact onPress={() => router.goBack()} variant="secondary">
          Back
        </Button>
        <Button compact disabled={checkedNodes.length < 1} onPress={handlePressGenerate}>
          Generate
        </Button>
      </HStack>
    </VStack>
  );
};
