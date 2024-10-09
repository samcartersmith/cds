import { Button } from '@cbhq/cds-web/buttons/Button';
import { VStack } from '@cbhq/cds-web/layout/VStack';
import { TextTitle4 } from '@cbhq/cds-web/typography';

import type { Prompt } from '../../shared/Prompt';
import { fetchFigma } from '../fetchFigma';
import { useRouter } from '../hooks/useRouter';

import { Redirect } from './Redirect';

export const DeletePrompt = () => {
  const router = useRouter<{ prompt: Prompt }>();
  const prompt = router.state?.prompt;

  if (!prompt) return <Redirect to="prompt-list" />;

  const handlePressDelete = async () => {
    await fetchFigma('delete-prompt', prompt.id);
    router.navigate('prompt-list');
  };
  return (
    <VStack height="100vh" justifyContent="space-between" spacing={2}>
      <VStack gap={2} spacingTop={4}>
        <TextTitle4 align="center" as="span">
          Are you sure you want to delete this prompt?
        </TextTitle4>
        <TextTitle4 align="center" as="span" color="primary">
          {prompt.name}
        </TextTitle4>
        <TextTitle4 align="center" as="span">
          This action cannot be undone!
        </TextTitle4>
      </VStack>
      <VStack gap={2}>
        <Button compact onPress={handlePressDelete} variant="negative">
          Delete
        </Button>
        <Button compact onPress={() => router.goBack()} variant="secondary">
          Cancel
        </Button>
      </VStack>
    </VStack>
  );
};
