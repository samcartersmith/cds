FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run web-visualization:build

# Prepare the package for publish
RUN cd packages/web-visualization && yarn pack
RUN mv /repo/packages/web-visualization /shared

WORKDIR /shared
