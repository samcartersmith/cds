FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

ENV NODE_ENV=production

ARG CODEFLOW_COMMIT_TAG
ENV CODEFLOW_COMMIT_TAG=$CODEFLOW_COMMIT_TAG



WORKDIR /repo

COPY apps/cds-adoption/trigger.mjs /repo/apps/cds-adoption/trigger.mjs

WORKDIR /shared

RUN (cd /repo && zip -r - .) > /main.zip
