# Creates images for src/server which contains a NodeJS service, the only component in this app that gets deployed
FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v20-ub22

ENV PROJECT=figma-athena-plugin

ARG CODEFLOW_COMMIT_TAG
ENV CODEFLOW_COMMIT_TAG=$CODEFLOW_COMMIT_TAG

RUN apt-get update && apt-get install -y wget

WORKDIR /repo

COPY . .
# note that we need dev dependencies to run tsx so no --production flag on the install
RUN yarn install --immutable

ENV PATH=/repo/node_modules/.bin:$PATH

WORKDIR /repo/apps/$PROJECT

EXPOSE 3001

CMD tsx ./src/server/index.ts
