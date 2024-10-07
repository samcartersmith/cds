import React, { FormEvent, useCallback } from 'react';
import { Button } from '@cbhq/cds-web/buttons';
import { NativeTextArea, TextInput } from '@cbhq/cds-web/controls';
import { VStack } from '@cbhq/cds-web/layout';
import { TextBody, TextTitle1 } from '@cbhq/cds-web/typography';

import { fetchFigma } from '../fetchFigma';
import { useGlobalState } from '../hooks/useGlobalState';

export function SetCbGptCredentials() {
  const {
    cbGPT: { setCredentials },
  } = useGlobalState();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;

      const apiKey = (form.elements.namedItem('apiKey') as HTMLInputElement).value.trim();
      const secret = (form.elements.namedItem('secret') as HTMLInputElement).value.trim();

      fetchFigma('set-credentials', { apiKey, secret })
        .then(() => {
          setCredentials(apiKey, secret);
        })
        .catch((e) => {
          // TODO error handling
          console.error(e);
        });
    },
    [setCredentials],
  );

  return (
    <VStack gap={2}>
      <TextTitle1 as="h1">Log in</TextTitle1>
      <TextBody as="p" color="foregroundMuted">
        In order to use Athena, you must set your personal CB-GPT API keys.
      </TextBody>
      <form onSubmit={handleSubmit}>
        <VStack gap={2}>
          <TextInput
            bordered={false}
            inputNode={
              <NativeTextArea
                required
                name="apiKey"
                placeholder="Your API key"
                rows={4}
                style={{ resize: 'none', fontSize: 'small' }}
              />
            }
            label="Platform API Key"
          />
          <TextInput
            bordered={false}
            inputNode={
              <NativeTextArea
                required
                name="secret"
                placeholder="Your secret key"
                rows={8}
                style={{ resize: 'none', fontSize: 'small' }}
              />
            }
            label="Secret Key"
          />
          <Button block type="submit" variant="primary">
            Set
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}
