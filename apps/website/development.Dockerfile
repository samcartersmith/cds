FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v16

RUN apt-get update && apt-get install -y zip

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the app with nx
ENV THEME=refresh
ENV NODE_ENV=development
RUN yarn nx run website:build

# Zip the app for deploy
RUN (cd /repo/.nx/outs/projects/apps/website/docusaurus && zip -r - .) > /repo/app.zip
