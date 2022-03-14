FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v16

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run fonts:build

# Prepare the package for publish
RUN cd /repo/.nx/dist/packages/fonts && npm pack
RUN mv /repo/.nx/dist/packages/fonts /shared

WORKDIR /shared
