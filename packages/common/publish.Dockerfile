FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run common:build

# Prepare the package for publish
RUN cd /repo/.nx/dist/packages/common && npm pack
RUN mv /repo/.nx/dist/packages/common /shared

WORKDIR /shared
