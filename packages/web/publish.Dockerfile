FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the package with nx
RUN yarn nx run web:build

# Prepare the package for publish
RUN cd /repo/.nx/dist/packages/web && yarn pack
RUN mv /repo/.nx/dist/packages/web /shared

WORKDIR /shared
