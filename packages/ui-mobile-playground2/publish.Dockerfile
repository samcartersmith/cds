FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v20-ub22

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run ui-mobile-playground2:typecheck:prod
RUN yarn nx run ui-mobile-playground2:build
RUN node rewrite-alpha.mjs ui-mobile-playground2
RUN rm -rf packages/ui-mobile-playground/

# Prepare the package for publish
RUN cd /repo/packages/ui-mobile-playground2 && yarn pack
RUN mv /repo/packages/ui-mobile-playground2 /shared

WORKDIR /shared
