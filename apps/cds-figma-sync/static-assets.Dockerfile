FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/ubuntu:production

RUN apt-get update && apt-get install -y zip && apt-get install -y git

WORKDIR /figma-assets

COPY apps/cds-figma-sync/shard-assets.sh /shard-assets.sh

# These directories have been pre-filtered by static-assets.Dockerfile.dockerignore
COPY packages/illustrations/src/__generated__ assets/ui-infra/illustration/v1

RUN /shard-assets.sh
