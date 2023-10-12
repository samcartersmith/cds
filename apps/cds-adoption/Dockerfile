FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

# PROJECT should be the same as the package.json name
ENV PROJECT=cds-adoption

ENV NODE_ENV=production

ARG CODEFLOW_COMMIT_TAG
ENV CODEFLOW_COMMIT_TAG=$CODEFLOW_COMMIT_TAG



WORKDIR /repo

COPY . .
RUN yarn install --immutable
RUN yarn nx run $PROJECT:build

RUN yarn workspaces focus $PROJECT --production

WORKDIR /repo/apps/$PROJECT

EXPOSE 3001

CMD node ./mjs/index.mjs
