FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run cds-tasks:build

# Prepare the package for publish
RUN cd packages/cds-tasks && yarn pack
RUN mv /repo/packages/cds-tasks /shared

WORKDIR /shared
