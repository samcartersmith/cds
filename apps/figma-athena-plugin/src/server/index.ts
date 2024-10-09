import cors from 'cors';
import express, { type Request, type RequestHandler } from 'express';

import { type FigmaNodeData } from '../shared/FigmaNodeData';
import { type Prompt } from '../shared/Prompt';

import { CBGPTClient } from './cbgpt.js';
import { getPrompt } from './prompt.js';

const app = express();

app.use(cors());
app.use(express.json());

const requestLogger: RequestHandler = (req, res, next) => {
  const time = new Date(Date.now()).toISOString();
  console.log(time, req.method, req.hostname, req.path);
  next();
};

app.use(requestLogger);

app.get(['/', '/_health'], (req, res) => {
  res.send('ok');
});

type GenerateBody = Partial<{
  prompt: Prompt;
  selection: FigmaNodeData[];
  checkedNodes: string[];
  apiKey: string;
  secret: string;
}>;
app.post('/generate', async (req: Request<unknown, unknown, GenerateBody>, res) => {
  const { prompt, selection, checkedNodes, apiKey, secret } = req.body;
  if (!prompt || !selection?.length || !checkedNodes?.length || !apiKey || !secret) return;

  // ensures the secret (which is composed of multiple lines) is properly escaped
  const secretKey = secret.split('\\n').join('\n');

  const cbgpt = new CBGPTClient(apiKey, secretKey);

  const promptValue = getPrompt({ prompt });

  const result = await cbgpt.query({
    query: `\`\`\`${JSON.stringify(selection)}\`\`\``,
    task_config: {
      action_llm: {
        chat_llm: 'gpt-4o',
      },
      action_prompt_template: {
        init_llm_chain: promptValue,
      },
      max_response_tokens: 3000,
    },
  });
  res.send({ data: result.response });
});

app.listen(3001);

console.log('App is listening on localhost:3001');
