FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v20-ub22

RUN apt-get update && apt-get install -y zip

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable

# Build the app with nx
ENV NODE_ENV=development
RUN yarn nx run web:build-css

# Zip the app for deploy
RUN (cd /repo/.nx/dist/cloud/css && zip -r - .) > /repo/app.zip