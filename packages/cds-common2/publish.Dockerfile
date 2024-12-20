FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v20-ub22

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run cds-common2:typecheck:prod
RUN yarn nx run cds-common2:build

# Prepare the package for publish
RUN cd /repo/packages/cds-common2 && yarn pack
RUN mv /repo/packages/cds-common2 /shared

WORKDIR /shared
