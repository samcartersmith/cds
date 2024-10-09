import { useEffect, useState } from 'react';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { Icon } from '@cbhq/cds-web/icons/Icon';
import { HeroSquare } from '@cbhq/cds-web/illustrations/HeroSquare';
import { HStack } from '@cbhq/cds-web/layout/HStack';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { PressableOpacity } from '@cbhq/cds-web/system/PressableOpacity';
import { TextHeadline } from '@cbhq/cds-web/typography';
import { Link } from '@cbhq/cds-web/typography/Link';
import { TextTitle2 } from '@cbhq/cds-web/typography/TextTitle2';

import type { Prompt } from '../../shared/Prompt';
import { fetchFigma } from '../fetchFigma';
import { useGlobalState } from '../hooks/useGlobalState';
import { useRouter } from '../hooks/useRouter';

type PromptListItemProps = Prompt;

const PromptListItem = (props: PromptListItemProps) => {
  const { setPrompt } = useGlobalState();
  const router = useRouter();
  const [showIcons, setShowIcons] = useState(false);
  const handlePressLink = () => {
    setPrompt(props);
    router.navigate('select-nodes');
  };
  const handlePressPencil = () => router.navigate('edit-prompt', { prompt: props });
  const handlePressTrash = () => router.navigate('delete-prompt', { prompt: props });
  return (
    <HStack
      alignItems="center"
      alignSelf="flex-start"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      width="100%"
    >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link onPress={handlePressLink} variant="title4">
        {props.name || <span>&nbsp;</span>}
      </Link>
      {showIcons && (
        <>
          <PressableOpacity onPress={handlePressPencil}>
            <Icon name="pencil" size="s" spacingStart={1} />
          </PressableOpacity>
          <PressableOpacity onPress={handlePressTrash}>
            <Icon name="trashCan" size="s" spacingStart={1} />
          </PressableOpacity>
        </>
      )}
    </HStack>
  );
};

export const PromptList = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const router = useRouter();

  useEffect(() => void fetchFigma('get-prompts', undefined).then(setPrompts), []);

  return (
    <VStack gap={2} spacing={2}>
      {prompts.length > 0 && (
        <VStack>
          <TextTitle2 as="span">Prompt list</TextTitle2>
          <VStack gap={1} spacingTop={2}>
            {prompts.map((prompt) => (
              <PromptListItem key={prompt.id} {...prompt} />
            ))}
          </VStack>
        </VStack>
      )}
      {prompts.length === 0 && (
        <VStack alignItems="center" gap={2} spacingTop={4}>
          <HeroSquare name="addMoreCrypto" />
          <TextHeadline align="center" as="span">
            You don&apos;t currently have any prompts, create a new prompt to get started!
          </TextHeadline>
        </VStack>
      )}
      <VStack spacingTop={2}>
        <Button compact onPress={() => router.navigate('edit-prompt')}>
          Create new prompt
        </Button>
      </VStack>
    </VStack>
  );
};
