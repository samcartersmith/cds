FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v16

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable
RUN yarn setup

# Build the package with nx
RUN yarn nx run utils:build

# Prepare the package for publish
RUN cd /repo/.nx/dist/packages/utils && npm pack
RUN mv /repo/.nx/dist/packages/utils /shared

WORKDIR /shared
