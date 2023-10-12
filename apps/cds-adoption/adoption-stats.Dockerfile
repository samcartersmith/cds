FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/ubuntu:production

RUN apt-get update && apt-get install -y zip && apt-get install -y git

WORKDIR /repo

COPY illustrations/src/__generated__/heroSquare/png/dark/ assets/ui-infra/illustration/v1/heroSquare/png/dark/
