#!/usr/bin/env zsh

# - snowsql must be installed to run this: https://docs.snowflake.com/en/user-guide/snowsql
# - SNOWSQL_PWD for the cds_snowflake_user service account must be set in your environment

echo " "
echo "Uploading adoption tracker project data to Snowflake"
echo "https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_STATS"
echo " "
echo " "

base_directory=$ADOPTION_DIRECTORY

# Loop through each subdirectory
for sub_directory in "$base_directory"/*; do
    # Check if the item is a directory
    if [ -d "$sub_directory" ]; then
        # Set the variable to the subdirectory name
        subdir_name=$(basename "$sub_directory")

        echo "Processing adoption tracker project \"$sub_directory\""
        echo " "

        # Create the staging table and upload the file there
        snowsql \
        -a coinbase.us-east-1.privatelink \
        -u cds_snowflake_user@coinbase.com \
        -d ANALYTICS \
        -s AD_HOC \
        -w ANALYSTS_WAREHOUSE \
        -q "PUT file://$sub_directory/stats.json @~/stats.json OVERWRITE = TRUE;
  
        COPY INTO CDS_STATS (_DT, NAME, DATE, CDSPERCENT, CDS, PRESENTATIONAL, TOTALCDSANDPRESENTATIONAL, TOTALOTHER)
            FROM (
                SELECT CURRENT_TIMESTAMP(),
                '$subdir_name',
                TO_DATE(\$1:latest.date),
                \$1:latest.cdsPercent AS DOUBLE,
                \$1:latest.cds,
                \$1:latest.presentational,
                \$1:latest.totalCdsAndPresentational,
                \$1:latest.totalOther
            FROM @~/stats.json
            )
            FILE_FORMAT = (TYPE = 'JSON');
        "
    fi
done
"
