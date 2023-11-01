FROM 652969937640.dkr.ecr.us-east-1.amazonaws.com/containers/ubuntu:production

RUN apt-get update && apt-get install -y zip && apt-get install -y git

WORKDIR /repo

COPY apps/cds-figma-sync/shard-assets.sh /shard-assets.sh

COPY packages/illustrations/src/__generated__/heroSquare/png/dark/ assets/ui-infra/illustration/v1/heroSquare/png/dark/
COPY packages/illustrations/src/__generated__/heroSquare/png/light/ assets/ui-infra/illustration/v1/heroSquare/png/light/
COPY packages/illustrations/src/__generated__/heroSquare/svg/dark/ assets/ui-infra/illustration/v1/heroSquare/svg/dark/
COPY packages/illustrations/src/__generated__/heroSquare/svg/light/ assets/ui-infra/illustration/v1/heroSquare/svg/light/

COPY packages/illustrations/src/__generated__/pictogram/png/dark/ assets/ui-infra/illustration/v1/pictogram/png/dark/
COPY packages/illustrations/src/__generated__/pictogram/png/light/ assets/ui-infra/illustration/v1/pictogram/png/light/
COPY packages/illustrations/src/__generated__/pictogram/svg/dark/ assets/ui-infra/illustration/v1/pictogram/svg/dark/
COPY packages/illustrations/src/__generated__/pictogram/svg/light/ assets/ui-infra/illustration/v1/pictogram/svg/light/

COPY packages/illustrations/src/__generated__/spotIcon/png/dark/ assets/ui-infra/illustration/v1/spotIcon/png/dark/
COPY packages/illustrations/src/__generated__/spotIcon/png/light/ assets/ui-infra/illustration/v1/spotIcon/png/light/
COPY packages/illustrations/src/__generated__/spotIcon/svg/dark/ assets/ui-infra/illustration/v1/spotIcon/svg/dark/
COPY packages/illustrations/src/__generated__/spotIcon/svg/light/ assets/ui-infra/illustration/v1/spotIcon/svg/light/

COPY packages/illustrations/src/__generated__/spotRectangle/png/dark/ assets/ui-infra/illustration/v1/spotRectangle/png/dark/
COPY packages/illustrations/src/__generated__/spotRectangle/png/light/ assets/ui-infra/illustration/v1/spotRectangle/png/light/
COPY packages/illustrations/src/__generated__/spotRectangle/svg/dark/ assets/ui-infra/illustration/v1/spotRectangle/svg/dark/
COPY packages/illustrations/src/__generated__/spotRectangle/svg/light/ assets/ui-infra/illustration/v1/spotRectangle/svg/light/

COPY packages/illustrations/src/__generated__/spotSquare/png/dark/ assets/ui-infra/illustration/v1/spotSquare/png/dark/
COPY packages/illustrations/src/__generated__/spotSquare/png/light/ assets/ui-infra/illustration/v1/spotSquare/png/light/
COPY packages/illustrations/src/__generated__/spotSquare/svg/dark/ assets/ui-infra/illustration/v1/spotSquare/svg/dark/
COPY packages/illustrations/src/__generated__/spotSquare/svg/light/ assets/ui-infra/illustration/v1/spotSquare/svg/light/

RUN /shard-assets.sh
