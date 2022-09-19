FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v16

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run ui-scorecard:build

# Prepare the package for publish
RUN cd packages/ui-scorecard && npm pack
RUN mv /repo/packages/ui-scorecard /shared

WORKDIR /shared
