FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/node:v18

WORKDIR /repo

COPY . .

# Prepare the package for publish
RUN cd packages/d3 && yarn pack
RUN mv /repo/packages/d3 /shared


WORKDIR /shared
