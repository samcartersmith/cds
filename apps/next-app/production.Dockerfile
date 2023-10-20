FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

RUN apt-get update && apt-get install -y zip

ENV NODE_ENV=production

WORKDIR /repo

COPY . .

# Install dependencies
RUN yarn --immutable
RUN yarn build

# DYNAMIC: Serve the the app with Node.js
RUN yarn nx run next-app:build
RUN yarn workspaces focus --all --production

EXPOSE 8080
CMD ["yarn", "workspace", "@app/next-app", "start", "-p", "8080"]
