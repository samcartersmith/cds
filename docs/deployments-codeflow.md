# Deployments & Codeflow Configs

## Cheatsheet

| URL                        | Codeflow Build Name | Codeflow Deploy                  |
| -------------------------- | ------------------- | -------------------------------- |
| cds-dev.cbhq.net           | cds-docs            | development::cds-docs            |
| cds.cbhq.net               | cds-docs            | production::cds-docs             |
| cds-storybook-dev.cbhq.net | cds-storybook       | development::cds-storybook       |
| cds-storybook.cbhq.net     | cds-storybook       | infra-shared-prod::cds-storybook |

## Deployment Flow in AWS for Web Apps

1. Codeflow builds are configured in [.codeflow.yml](https://github.cbhq.net/frontend/cds/blob/master/.codeflow.yml) in this repo. It attributes a build name with a dockerfile (like [this](https://github.cbhq.net/frontend/cds/blob/master/apps/docs/development.Dockerfile)) that runs a series of commands to prep for the deploy.
2. Codeflow configurations determine the buttons shown w/ deployment options. You can edit theses in Deployment Settings. Each config for websites with have the S3 bucket name in the deploy config.
3. When you deploy from Codeflow, it will push the webapp to the S3 Bucket. You can look up the buckets by name (same as shown in Codeflow) using eng-ops@development login to AWS from Okta and navigating to S3.
4. Your files in the S3 will have an object url. This url must be the same as the Cloudfront (AWS Service) Origin Url. This connects your S3 files with the cloudfront record. This is automatically handled for you when you use infra/aws-resources to create your new S3.
5. The Cloudfront record is created for you when you merge in a cds.gps.yml change. This information will need to be added to the frontend/dns.gps.yml file for your desired domain. This creates a Route53 for all AWS environments which activates your domain and points it to your Cloudfront record. This means once your dns pr is merged, your website should display assuming your S3 bucket has your bundled webapp from Codeflow deployment. You can always confirm the Route53 is created in the AWS UI by searching for your specified domain.

All of our aws configurations can be found in: [infra/aws-resources/projects/frontend/cds.gps.yml](https://github.cbhq.net/infra/aws-resources/blob/master/projects/frontend/cds.gps.yml) && [infra/aws-resources/projects/frontend/dns.gps.yml](https://github.cbhq.net/infra/aws-resources/blob/master/projects/frontend/dns.gps.yml)

[ Here is detailed resource / tutorial](https://confluence.coinbase-corp.com/pages/viewpage.action?spaceKey=INFRA&title=Setting+up+Frontend+Application+Infrastructure+using+S3+and+CloudFront)

[ Another great resource from Miles ](https://github.cbhq.net/frontend/web/blob/master/apps/frontend-docs/docs/nx/deploy-static-app.md)
