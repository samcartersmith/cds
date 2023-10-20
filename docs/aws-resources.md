# AWS Resources

Any time you need to use AWS to host something at Coinbase you will need to interact with [the `infra/aws-resources` repo](https://github.cbhq.net/infra/aws-resources), which contains [Terraform configuration files](https://www.terraform.io/) that define our AWS resources like Lambda functions, EC2 instances, and S3 buckets. After changes in `infra/aws-resources` are merged to master a bot called GeoEngineer will automatically apply the changes to our AWS accounts.

The `infra/aws-resources` repo [`projects/` directory](https://github.cbhq.net/infra/aws-resources/tree/master/projects) contains directories named after Coinbase github orgs, like `frontend` and `eaa-eng`. Each org's directory contains `.gps.yml` Terraform configuration files named after github repos within that github org. Using this `frontend/cds` repo as an example, you can locate the corresponding [`projects/frontend/cds.gps.yml`](https://github.cbhq.net/infra/aws-resources/blob/master/projects/frontend/cds.gps.yml) file.

### Helpful links

- [Infrastructure Provisioner » AWS Resources / GeoEngineer](https://confluence.coinbase-corp.com/pages/viewpage.action?pageId=1376395905#InfrastructureProvisioner%C2%BBAWSResources/GeoEngineer-Howdoesitwork?)

### General process

Creating a new AWS resource will follow a similar pattern whether you're creating a new Lambda function, EC2 instance, or S3 bucket. You'll need to:

1. Locate or create the `infra/aws-resources` Terraform configuration file for the github org/repo that will house the code or assets that you're deploying to AWS.
2. Create [a configuration](#terraform-configurations) inside this file that defines the AWS resource using the guides below depending on the AWS resource type. This configuration must also contain metadata about the owning team and type of data used.
3. Create a PR to `infra/aws-resources` then wait to be notified by the Infra Provisioner bot if your provisioning plan has passed or failed. The Infra Provisioner bot will also comment on your PR with a link to your Provisioning Plan. You can see all the details about the AWS resource changes caused by your PR in the Provisioning Plan.
4. Merge your changes to `infra/aws-resources` master branch after all provisioning plans are passing, then watch your Provisioning Plan for the `Apply` section. The `Apply` section will show up after GeoEngineer has applied your merged configurations. The Infra Provisioner bot will also comment on your PR with the results of the apply step.
5. Optionally assign a friendly domain name to your provisioned resource.
6. Optionally configure access to the resource from the corporate VPN or from outside Coinbase.

### Terraform configurations

All AWS resources follow the same `context:configuration` pattern in the `.gps.yml` files, where `context` is the AWS account name of the account that will be hosting your resource, and `configuration` is the Codeflow config name that will be deploying to your resource:

```yml
infra-shared-dev: # This is a Coinbase AWS account name
  cds-figma-sync: # This is a frontend/cds Codeflow config name
    REPLACE_ME_WITH_YOUR_CONFIG # Define your AWS resource starting on this line!
```

All configurations must also include metadata about the owning team and type of data used. It can be useful to define a reusable block of a metadata for all of your configurations using [YAML anchors](https://support.atlassian.com/bitbucket-cloud/docs/yaml-anchors/):

```yml
_cds_metadata: &cds_metadata
  metadata:
    metadata:
      product: 'Shared-Services'
      owning_team: 'design-system'
      jira_queue: 'DX'
      data_classification: 'Internal'
      compliance_classification:
        - 'None'
      slack_channel: 'cds-builds'

infra-shared-dev: # This is a Coinbase AWS account name
  cds-figma-sync: # This is a frontend/cds Codeflow config name
    <<: *cds_metadata # Apply the metadata to this resource
    REPLACE_ME_WITH_YOUR_CONFIG # Define your AWS resource starting on this line!
```

You can use this same concept to create reusable resource configurations:

```yml
_lambda_config: &lambda_config
  serverless_service:
    main: {}

infra-shared-dev: # This is a Coinbase AWS account name
  cds-figma-sync: # This is a frontend/cds Codeflow config name
    <<: *cds_metadata # Apply the metadata to this resource
    <<: *lamba_config # Apply the Lambda function config to this resource
```

### Lambda functions

In this example we'll walk through creating and deploying to a new AWS Lambda function using code in this repo.

1. Locate the [`projects/frontend/cds.gps.yml`](https://github.cbhq.net/infra/aws-resources/blob/master/projects/frontend/cds.gps.yml) file in the `infra/aws-resources` repo.
2. Create a new configuration with the following pattern:

```yml
infra-shared-dev: # AWS account name
  my-lambda-function: # Codeflow config name in frontend/cds
    serverless_service: # Specifies that our resource will be a Lambda function
      main: {}
```

3. Follow the [general process](#general-process) steps above create your `infra/aws-resources` PR and get it merged.
4. Create a new Codeflow configuration for the `frontend/cds` repo to deploy your Lambda function...

### S3 buckets

In this example we'll walk through creating and deploying to a new AWS S3 bucket using code in this repo. S3 buckets can be configured with a variety of server settings, given an explicit bucket name, and a friendly domain name.

1. Locate the [`projects/frontend/cds.gps.yml`](https://github.cbhq.net/infra/aws-resources/blob/master/projects/frontend/cds.gps.yml) file in the `infra/aws-resources` repo.
2. Create a new configuration with the following pattern:

```yml
infra-shared-dev: # AWS account name
  my-s3-bucket: # Codeflow config name in frontend/cds
    static_website: # Specifies that our resource will be an S3 bucket
      static:
        domain: my-s3-bucket.coinbase.com
        bucket_name: frontend-cds-my-s3-bucket-development
        default_root_object: index.html
        allowed_file_types:
          - jpg
          - png
          - svg
        cache_allowed_methods: ['GET', 'HEAD', 'OPTIONS']
        http_headers:
          cache-control: 'public, max-age=604800'
          content-security-policy: "base-uri 'none'; default-src 'self' https://*.coinbase.com; img-src 'self';"
        external: true
        cors_hosts:
          - https://coinbase.com
        cors_expose_headers: ['Content-Length']
        cors_max_age_seconds: 86400
```

3. Follow the [general process](#general-process) steps above create your `infra/aws-resources` PR and get it merged.
4. Create a new Codeflow configuration for the `frontend/cds` repo to deploy your S3 bucket...

### EC2 instances

In this example we'll walk through creating and deploying to a new AWS EC2 instance using code in this repo. EC2 instances require a `service` config and an `application_load_balancer` config, and may optionally have a `dns` config for adding a friendly domain name.

1. Locate the [`projects/frontend/cds.gps.yml`](https://github.cbhq.net/infra/aws-resources/blob/master/projects/frontend/cds.gps.yml) file in the `infra/aws-resources` repo.
2. Create a new configuration with the following pattern:

```yml
infra-shared-dev: # AWS account name
  my-ec2-service: # Codeflow config name in frontend/cds
    service: # Specifies that our resource will be an EC2 instance
      app:
        load_balancers:
          - ':::application_load_balancer:app'
        ssh: # Enables ssh, only valid for dev environments
          security_groups: []
          bastions: []
          ports:
            - 22
            - 2222
          self_ingress: false
          disabled: false
    application_load_balancer: # Configures the ALB for our resource's EC2 instance
      app:
        lb_name: !sub 'frontend-cds-app-{{context:configuration}}' # context:configuration here is infra-shared-dev:my-ec2-service
        listeners:
          app:
            health_check:
              path: '/health-check' # Customizes the health check endpoint, defaults to /_health
            instance_port: 3001 #
            instance_protocol: http
            ingress_cidr_blocks: !flatten
              - !ref 'constant::private_cidr_blocks'
              - !ref 'constant::private_office_cidr_blocks' # Allow VPN traffic
              - !ref 'constant:corporate:private_cidr_blocks' # Allow corporate VPN traffic
              - !ref 'constant:development:private_cidr_blocks' # Allow traffic from development AWS account (e.g. entry-gateway)
            target_group_name: !sub 'frontend-cds-app-{{context:configuration}}'
```

3. Follow the [general process](#general-process) steps above create your `infra/aws-resources` PR and get it merged.
4. If you want to add a friendly domain name you can open a new PR that configures your same EC2 instance. You must add the same dns configuration to the `corporate` AWS account if you want your EC2 service domain name to be accessible to traffic on the VPN:

```yml
infra-shared-dev:
  my-ec2-service:
    service:
      # etc...
    application_load_balancer:
      # etc...
    dns: # This whole `dns` block should be copy-pasted to the corporate AWS account under the same Codeflow config name
      my-ec2-service.cbhq.net: # Set the domain name you want here
        records: # And point your domain name to the load balancer
          - internal-frontend-cds-app-cds-figma-sync-2117335883.us-east-1.elb.amazonaws.com # This URL will come from GeoEngineer's apply step results, which is why it must be done in a second PR

corporate:
  my-ec2-service: # This must match the infra-shared-dev:my-ec2-service `dns` config from above!
    dns:
      my-ec2-service.cbhq.net:
        records:
          - internal-frontend-cds-app-cds-figma-sync-2117335883.us-east-1.elb.amazonaws.com
```

4. Create a new Codeflow configuration for the `frontend/cds` repo to deploy your EC2 instance...
