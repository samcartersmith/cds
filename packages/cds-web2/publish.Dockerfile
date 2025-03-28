FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v20-ub22

RUN apt-get update && apt-get install

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run cds-web2:typecheck:prod
RUN yarn nx run cds-web2:build

RUN node rewrite-alpha.mjs cds-web2

RUN rm -rf packages/common/
RUN rm -rf packages/mobile/
RUN rm -rf packages/web/
RUN rm -rf packages/mobile-visualization/
RUN rm -rf packages/web-visualization/
RUN rm -rf packages/lottie-files/
RUN rm -rf packages/ui-mobile-playground/

# Prepare the package for publish
RUN cd /repo/packages/cds-web2 && yarn pack
RUN mv /repo/packages/cds-web2 /shared

WORKDIR /shared
