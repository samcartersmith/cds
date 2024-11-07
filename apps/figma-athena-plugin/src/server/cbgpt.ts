import crypto from 'crypto';
import jsonwebtoken, { type Secret } from 'jsonwebtoken';

// --- BEGIN manually copied/maintained type definitions for CB-GPT service
/** See https://confluence.coinbase-corp.com/pages/viewpage.action?spaceKey=PLAT&title=LLM+Roadmap */
export type LLMName =
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-16k'
  | 'gpt-4'
  | 'gpt-4-32k'
  | 'gpt-4o'
  | 'text-bison'
  | 'text-bison-32k'
  | 'code-bison'
  | 'code-bison-32k'
  | 'gemini-1.0-pro'
  | 'gemini-1.5-pro'
  | 'gemini-1.5-flash'
  | 'claude-3-haiku@20240307'
  | 'claude-3-sonnet@20240229'
  | 'claude-3-5-sonnet@20240620'
  | 'anthropic.claude-v2'
  | 'cbgpt-q2-2023'
  | 'cbgpt-defog-7bt2s'
  | 'cbgpt-zephyr7b';

export type PromptTemplate = {
  /** Defines system prompt for chat_llm */
  init_llm_chain: string;
  /** Defines the prompt to generate context search query, using conversation history, that is then sent to the Embedding Service search query template should have the placeholders {{chat_history}} and {{user_massage}} to be replaced with the chat history and user message respectively Template Params - These are the placeholders that are replaced with the actual values. They can be used with any prompt.{{current_date}} - Replaced with the current date in format like (1st March, 2024) */
  generate_context_search_query?: string;
  /** Defines the prompt to generate the resonse using search context. Context template must have the placeholder {{context}} to be replaced with the search context */
  context_template?: string;
};

export type LLMType = {
  /** chat_llm is used to generate the chat response. This is a must required field. */
  chat_llm: LLMName;
  /** embedding_llm is NOT being used anywhere as of now. */
  embedding_llm?: string;
  /** search_query_llm is used to generate the search query based on the current user input and the on-going session's conversation history.The generated search query is then sent to the Knowledge Embedding Service to fetch the internal CB knowledge articles.This is an optional field. If not specified, then the search query is generated using either Azure OpenAI's gpt-3.5-turbo-16k when uses_only_public_data is set to True or GCP Vertex's text-bison-32k@latest when uses_only_public_data is set to False */
  search_query_llm?: string;
};

export type TaskConfig = {
  /** Used for specifying LLM model. Can be different based on different "actions".Find list of available LLM Models https://confluence.coinbase-corp.com/pages/viewpage.action?spaceKey=PLAT&title=LLM+Roadmap */
  action_llm: LLMType;
  /** Main LLM */
  chat_llm?: LLMName;
  /** The prompt templates for each action_llm */
  action_prompt_template?: PromptTemplate;
  /** Uses a default value of 300 if not specified by the client. The maximum number of tokens to be used for generating the response. */
  max_response_tokens?: number;
  /** This field is used to validate whether the LLMs used are approved for "private" (non-MNPI) data. Currently, all LLMs hosted by CB-GPT are approved for "private" (non-MNPI) data */
  uses_only_public_data?: boolean;
};

export type QueryRequest = {
  /** Query text for LLM */
  query: string;
  /** To be specified when query has to be done for an existing session. Not required for single shot query. */
  chat_session_id?: string;
  /** Only allowlisted clients can use this field */
  user_uuid?: string;
  /** Specifying this will temporarily override session's task config if chat_session_id is provided, otherwise the request will use single shot query mode and create a new session with the above query as the first query. It is mandatory to specify either chat_session_id or task_config. Task Config model is same as CreateSession API. */
  task_config?: TaskConfig;
  /** Set it to True if it's a single use query and session history is not required. Session and query history will NOT be persisted in the DB. Logging and monitoring stays the same. */
  is_single_use?: boolean;
  /** Allows clients to use use case specific token limit quota explicitly */
  use_case?: string;
  /** Allows clients store their metadata (upto 128 characters). This field is ETL'd to Snowflake and can be used for analysis */
  analytics_metadata?: string;
};

export type QueryResponse = {
  /** Unique Query response ID */
  id: string;
  /** Chat Session id */
  chat_session_id: string;
  /** LLM Response */
  response: string;
};
// --- END manually copied/maintained type definitions for CB-GPT service

/**
 * A generic client for interacting with the CB-GPT service's HTTP API - requires a signed JWT
 *
 * The type declarations above have been copied manually from the CB-GPT service docs (linked below).
 * TODO: In an ideal world we would have generated these types from the service protobuf definition
 * There are in fact tools for doing just that, but we haven't been successful in getting them to work.
 * On the latest attempt, using Connect (@connectrpc/connect-node) to create an SDK from generated code (@bufteam/data_cb-gpt-service.bufbuild_connect-es),
 * I was unable to get it running correct. It was not obvious whether there was an issue with the generated code or the setup was wrong.
 * For maintainability sake, we should pursue this approach again in the futrue when there is more time.
 *
 * Helpful resources:
 * API Docs: https://docs.cbhq.net/app-services/cbgpt/cb-gpt-api/http-api
 * Data models: https://docs.cbhq.net/app-services/cbgpt/api-data-model
 * Protobuf registry: https://buf.cbhq.net/data/cb-gpt-service/docs/main:coinbase.cb_gpt_service.api.v1
 */
export class CBGPTClient {
  static baseUri = 'cloud-api-dev.cbhq.net/cb-gpt-api/v1';

  private apiKey: string;

  private secret: Secret;

  constructor(apiKey: string, secret: Secret) {
    this.apiKey = apiKey;
    this.secret = secret;
  }

  private createJwt(uri: string) {
    // @ts-expect-error nonce is required but not expected in the type definitions
    const jwt = jsonwebtoken.sign(
      {
        uri: `POST ${uri}`,
        iss: 'cdp',
        nbf: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 120,
        sub: this.apiKey,
      },
      this.secret,
      {
        algorithm: 'ES256',
        header: {
          alg: 'ES256',
          kid: this.apiKey,
          nonce: crypto.randomBytes(16).toString('hex'),
          typ: 'JWT',
        },
      },
    ) as string;

    console.log({
      jwt: `${jwt.substring(0, 20)}...`,
      uri,
    });

    return jwt;
  }

  private async fetch<T>(endpoint: string, data: RequestInit) {
    const uri = `${CBGPTClient.baseUri}/${endpoint}`;
    const jwt = this.createJwt(uri);
    const request = {
      ...data,
      headers: {
        ...data.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    };

    const response = await fetch(`https://${uri}`, request);
    const isJson = response.headers.get('content-type') === 'application/json';
    const result = await (isJson ? response.json() : response.text());
    console.log({
      uri,
      request: {
        ...request,
        headers: {
          ...request.headers,
          Authorization: `${request.headers?.Authorization.substring(0, 27)}...`,
        },
      },
      response: result,
    });
    return result as T;
  }

  async query(options: QueryRequest) {
    return this.fetch<QueryResponse>('query', {
      method: 'post',
      body: JSON.stringify(options),
    });
  }
}
