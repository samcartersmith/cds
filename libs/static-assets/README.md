# static-assets

Uploads CDS illustrations to the static-assets S3 bucket, which is defined in [`infra/aws-resources/projects/engineering/static-assets.gps.yml`](https://github.cbhq.net/infra/aws-resources/blob/master/projects/engineering/static-assets.gps.yml)

## Running docker locally

1. Build and start the docker image

```sh
cd libs/static-assets
docker-compose -f static-assets.docker-compose.yml build
docker-compose -f static-assets.docker-compose.yml up -d
```

2. Run commands on the running image

```sh
docker-compose exec app sh
```

3. When you're done, stop the running image

```sh
docker-compose down
```
