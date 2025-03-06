# Athena Plugin Server

This NodeJS service acts as the backend for the Athena Figma plugin.
It's current responsibility is mainly to act as a proxy to the CB-GPT service.

### Setup

To run, either of the following from the repo root:

```shell
yarn nx run figma-athena-plugin:serve
```

or

```shell
# requires docker deskop install with docker-compose
yarn nx run figma-athena-plugin:server-dockerup
```

### Dockerfile

The Dockerfile for this service is located at the application's root (`/apps/figma-athena-plugin`).
At this time, this NodeJS service is the only component of the stack that needs to be containerized & deployed.
