FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

WORKDIR /repo
COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package
RUN yarn nx run docusaurus-theme:build

# Prepare the package for publish
RUN cd packages/docusaurus-theme && yarn pack
RUN mv /repo/packages/docusaurus-theme /shared


WORKDIR /shared
