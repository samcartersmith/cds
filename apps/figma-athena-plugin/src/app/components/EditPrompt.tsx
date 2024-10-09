import { useState } from 'react';
import { Button } from '@cbhq/cds-web/buttons/Button';
import { NativeTextArea } from '@cbhq/cds-web/controls/NativeTextArea';
import { TextInput } from '@cbhq/cds-web/controls/TextInput';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextTitle2 } from '@cbhq/cds-web/typography/TextTitle2';

import { type Prompt } from '../../shared/Prompt';
import { fetchFigma } from '../fetchFigma';
import { type Routes, useRouter } from '../hooks/useRouter';

export const EditPrompt = () => {
  const router = useRouter<{ prompt: Prompt; onSaveRoute: string }>();
  const prompt = router.state?.prompt ?? null;
  const [name, setName] = useState(prompt?.name ?? '');
  const [projectContext, setProjectContext] = useState(prompt?.projectContext ?? '');

  const handleSavePrompt = async () => {
    const savedPrompt = await fetchFigma('update-prompt', {
      id: prompt?.id ?? null,
      name,
      projectContext: projectContext.trim(),
      chatSessionIds: prompt?.chatSessionIds ?? [],
    });
    router.navigate((router.state?.onSaveRoute as Routes) ?? 'prompt-list', {
      prompt: savedPrompt,
    });
  };

  return (
    <VStack gap={2} spacing={2}>
      <TextTitle2 as="span">{prompt ? 'Edit prompt' : 'Create new prompt'}</TextTitle2>
      <TextInput
        helperText="The name of your prompt."
        label="Prompt name"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <TextInput
        helperText="A short, several-sentence description of your project that helps CBGPT understand the context of your designs. You can change this at any time."
        inputNode={
          <NativeTextArea
            onChange={(event) => setProjectContext(event.target.value)}
            rows={5}
            value={projectContext}
          />
        }
        label="Prompt text"
      />

      <Button compact disabled={!name.trim()} onPress={handleSavePrompt}>
        Save
      </Button>
      <Button compact onPress={() => router.goBack()} variant="secondary">
        Cancel
      </Button>
    </VStack>
  );
};
