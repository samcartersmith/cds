FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

# PROJECT should be the same as the package.json name
ENV PROJECT=cds-figma-sync

ENV NODE_ENV=production
ENV IS_AWS_LAMBDA=true

ARG CODEFLOW_COMMIT_TAG
ENV CODEFLOW_COMMIT_TAG=$CODEFLOW_COMMIT_TAG



WORKDIR /repo
COPY . .
RUN yarn install --immutable
RUN yarn nx run $PROJECT:build
# RUN yarn workspaces focus design-system $PROJECT --production

WORKDIR /shared
# RUN apt-get update && apt-get install -y zip
RUN (cd /repo && zip -r - .) > /main.zip
