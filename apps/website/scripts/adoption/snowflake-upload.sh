#!/usr/bin/env zsh

# - snowsql must be installed to run this, see: `docs/release/adoption-tracker.md`
# - SNOWSQL_PWD for the cds_snowflake_user service account must be set in your environment. You can find it in 1Password

# - This script uploads to four tables: 
# - CDS_ADOPTION_SUMMARY
# - CDS_PRODUCT_COMPONENT_STATS
# - CDS_STATS
# - CDS_CUJ_STATS

base_directory=$ADOPTION_DIRECTORY
adoption_stats_file_path=$ADOPTION_DIRECTORY/adoption/snowflake_adoption_stats.json

# The following script is to upload the CDS latest Adoption stats 
# from snowflake_adoption_stats into the CDS_ADOPTION_SUMMARY Snowflake table
echo " "
echo "Uploading overall cds adoption summary to Snowflake"
echo "https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_ADOPTION_SUMMARY"
echo " "
echo " "
echo "Processing overall adoption tracker summary file \"$adoption_stats_file_path\""
echo " "
# Upload the file and insert data into tables
snowsql \
        -a coinbase.us-east-1.privatelink \
        -u cds_snowflake_user@coinbase.com \
        -d ANALYTICS \
        -s AD_HOC \
        -w ANALYSTS_WAREHOUSE \
        -q "PUT file://$adoption_stats_file_path @~/snowflake_adoption_stats.json OVERWRITE = TRUE;
        COPY INTO CDS_ADOPTION_SUMMARY (DATE, LATEST_CDS_ADOPTION)
            FROM (
                SELECT
                    TO_DATE(\$1:date) AS DATE,
                    \$1:summaryReport.companyWide.latestCDSAdoption AS LATEST_CDS_ADOPTION
            FROM @~/snowflake_adoption_stats.json
            )
            FILE_FORMAT = (TYPE = 'JSON');
        "
        echo " "
        echo " "
echo "Data upload and table population for company wide stats completed."


# The following sql script is to upload product component usage to Snowflake 
# We take the productComponentSummary from each product component directory and upload to CDS_PRODUCT_COMPONENT_STATS
echo " "
echo "Uploading product component usage data to Snowflake"
echo "https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_PRODUCT_COMPONENT_STATS"
echo " "

echo "Processing product component usage stats file \"$component_stats_file_path\""
echo " "

for sub_directory in "$base_directory/product-component"/*; do
    # Check if the item is a directory
    if [ -d "$sub_directory" ]; then

        # Check for the presence of product_component_summary.json file and skip if missing
        if [ ! -f "$sub_directory/product_component_summary.json" ]; then
            echo "No product_component_summary.json found in $sub_directory, skipping..."
            echo " "
            continue # Skip the rest of the loop for this iteration
        fi

        # Set the variable to the subdirectory name
        subdir_name=$(basename "$sub_directory")

        echo "Processing product component \"$sub_directory\""
        echo " "

        # Create the staging table and upload the file there
        snowsql \
        -a coinbase.us-east-1.privatelink \
        -u cds_snowflake_user@coinbase.com \
        -d ANALYTICS \
        -s AD_HOC \
        -w ANALYSTS_WAREHOUSE \
        -q "PUT file://$sub_directory/product_component_summary.json @~/product_component_summary.json OVERWRITE = TRUE;

        COPY INTO CDS_PRODUCT_COMPONENT_STATS (DATE, PRODUCT_COMPONENT, TOTAL_INSTANCES, RELATIVE_USAGE, TOTAL_INSTANCE_ALL_ENTRIES)
            FROM (
                SELECT
                    TO_DATE(\$1:latest.date) AS DATE,
                    \$1:latest.productComponent AS PRODUCT_COMPONENT,
                    \$1:latest.totalInstances AS TOTAL_INSTANCES,
                    \$1:latest.relativeUsagePercent AS RELATIVE_USAGE,
                    \$1:latest.totalInstanceAllEntries AS TOTAL_INSTANCE_ALL_ENTRIES
            FROM @~/product_component_summary.json
            )
            FILE_FORMAT = (TYPE = 'JSON');
        "
        echo " "
        echo " "
    fi
done

echo "Data upload and table population for individual product component stats completed."


# The following sql script is to upload the stat.json files from each adopter project into the CDS_STATS Snowflake tableecho " "
echo "Begin processing for each individual project adoption stats."
echo " "
echo "Uploading adoption tracker project data to Snowflake"
echo "https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_STATS"
echo " "
echo " "

# Loop through each subdirectory
for sub_directory in "$base_directory/adoption"/*; do
    # Check if the item is a directory
    if [ -d "$sub_directory" ]; then

        # Check for the presence of stats.json file and skip if missing
        if [ ! -f "$sub_directory/stats.json" ]; then
            echo "No stats.json found in $sub_directory, skipping..."
            echo " "
            continue # Skip the rest of the loop for this iteration
        fi

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
        echo " "
        echo " "
    fi
done

echo "Data upload and table population for each adoption project stats is completed."

# The following sql script is to upload the stats.json files from each cuj adoption repo into the CDS_CUJ_STATS Snowflake tableecho " "
echo "Begin processing for each individual CUJ adoption stats."
echo " "
echo "Uploading CUJ adoption tracker project data to Snowflake"
echo "https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_CUJ_STATS"
echo " "
echo " "

# Loop through each subdirectory
for sub_directory in "$base_directory/adoption/cuj/summary"/*; do
    # Check if the item is a directory
    if [ -d "$sub_directory" ]; then

        # Check for the presence of stats.json file and skip if missing
        if [ ! -f "$sub_directory/stats.json" ]; then
            echo "No stats.json found in $sub_directory, skipping..."
            echo " "
            continue # Skip the rest of the loop for this iteration
        fi

        # Set the variable to the subdirectory name
        subdir_name=$(basename "$sub_directory")

        echo "Processing CUJ adoption tracker data for \"$sub_directory\""
        echo " "

        # Create the staging table and upload the file there
        snowsql \
        -a coinbase.us-east-1.privatelink \
        -u cds_snowflake_user@coinbase.com \
        -d ANALYTICS \
        -s AD_HOC \
        -w ANALYSTS_WAREHOUSE \
        -q "PUT file://$sub_directory/stats.json @~/stats.json OVERWRITE = TRUE;
  
        COPY INTO CDS_CUJ_STATS (_DT, NAME, DATE, CDSPERCENT, CDS, PRESENTATIONAL, TOTALCDSANDPRESENTATIONAL, TOTALOTHER)
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
        echo " "
        echo " "
    fi
done

echo "Data upload and table population for each CUJ adoption stats is completed."

# The following script is to upload the latest CUJ CDS Adoption stats 
# from cujsummaryreport into the CDS_CUJ_ADOPTION_SUMMARY Snowflake table
echo " "
echo "Uploading overall cds adoption summary to Snowflake"
echo "https://app.us-east-1.privatelink.snowflakecomputing.com/mx78708/coinbase/#/data/databases/ANALYTICS/schemas/AD_HOC/table/CDS_CUJ_ADOPTION_SUMMARY"
echo " "
echo " "
echo "Processing overall adoption tracker summary file \"$cuj_adoption_stats_file_path\""
echo " "
# Upload the file and insert data into tables
snowsql \
        -a coinbase.us-east-1.privatelink \
        -u cds_snowflake_user@coinbase.com \
        -d ANALYTICS \
        -s AD_HOC \
        -w ANALYSTS_WAREHOUSE \
        -q "PUT file://$cuj_adoption_stats_file_path @~/cujsummaryreport.json OVERWRITE = TRUE;
        COPY INTO CDS_CUJ_ADOPTION_SUMMARY (DATE, LATEST_CDS_ADOPTION)
            FROM (
                SELECT
                    \$1:latest.date AS DATE,
                    \$1:latest.overallCDSPercent AS LATEST_CDS_ADOPTION
            FROM @~/cujsummaryreport.json
            )
            FILE_FORMAT = (TYPE = 'JSON');
        "
        echo " "
        echo " "
echo "Data upload and table population for company wide stats completed."