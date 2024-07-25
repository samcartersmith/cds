# Adoption Tracker

> The Adoption Tracker allows us to view component level insight into CDS adoption.

For details regarding Adoption Tracker Development: See [Adoption Tracker Development Docs](../adoption-tracker-development.md)

For details regarding Adoption Tracker Config Modification: See [Adoption Tracker Config Docs](../adoption-tracker-config.md)

## Overview

config - `apps/website/scripts/adoption/config.ts`

script - `apps/website/scripts/adoption/main.ts`

parsers - `apps/website/scripts/adoption/parsers`

## Updating the Adoption Tracker

1. Run `yarn nx run website:adoption`. The result will output JSON files within the website directory
2. Commit the files using the following commit message convention: `[trivial] internal(AdoptionTracker): Update Adoption Tracker mm/dd/yyyy`
3. After you merge, manually deploy to `production::cds-docs` in [Codeflow](https://codeflow.cbhq.net/#/frontend/cds/commits) when the build finishes
4. Verify that the "Last Updated" date at the top of the [Adoption Tracker](https://cds.cbhq.net/adoption-tracker/retail-mobile/) pages is current
5. Upload the adoption stats to Snowflake by following the steps in the next section.

## Uploading adoption stats to Snowflake

1. Make sure you have [`snowsql` installed](https://docs.snowflake.com/en/user-guide/snowsql). You can install it via homebrew with:

```sh
$ brew install --cask snowflake-snowsql
```

2. Add the following zsh alias to your `.zshrc`:

```sh
alias snowsql=/Applications/SnowSQL.app/Contents/MacOS/snowsql
```

3. After installation, verify the connection:

   - open a new terminal window
   - execute the following command to test your connection: `snowsql -a <account_name> -u <login_name>`
   - Enter your password when prompted. Enter !quit to quit the connection.
   - Execute the following command to connect to Snowflake: `snowsql`
   - Ensure that you are able to access snowsql from any directory (home and project)
     - Test by running `snowsql --version`
   - If snowsql is not found in any directory except your home (~), add PATH to your `.zshrc`
     - Locate with `ls -la ~/.snowsql/`
     - `export PATH="$PATH:$HOME/.snowsql/1.2.31"`
     - Usually, you can find your snowsql in `.snowsql/ver`. You should replace `1.2.31` with your version.

4. Retrieve the CDS Snowflake service account password from the UI Systems account in 1Password
5. Set the `SNOWSQL_PWD` environment variable and run the `adoption-snowflake-upload` script in your branch:

Note: Change the password below to the one in 1Password.
Before running the command below, be sure to have already run `yarn nx run website:adoption`.

Note: the `SNOWSQL_PWD` below is incorrect. Replace it with the correct one from 1Password.

```sh
SNOWSQL_PWD=JDtdbe2mKSm13jDqlS yarn nx run website:adoption-snowflake-upload
```

4. You can view the uploaded adoption stats [in Snowflake here](https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_STATS).

## Adding a Project

Add the project config to `apps/website/scripts/adoption/config.ts` and follow the above [update steps](#updating-the-adoption-tracker)
