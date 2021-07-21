#!/bin/bash

# A script to programmatically upload illustrations  
# to static-asset repo

## PREREQUISITES ##
# Before you can run this script, you must have the following 
# items completed:  
# 1. install hub (a CLI tool for managing github repo) 
# 2. https://confluence.coinbase-corp.com/display/INFRA/How+to+Fork+a+Repository - Follow these instruction 
#    to make sure that you have all the config to make a fork from Coinbase Repo 

## Troubleshoot Guide ##

# If you are having issue with permission denied when running this script. 
# run chmod u+x uploadToStaticAssets.sh (or path/to/script). This will give 
# it access to the script. 

# USAGE: ./uploadToStaticAssets.sh -b <branch-name> -r <root-dir-name> -u <username> [optional flags: -c -o -d]
# Example: ./uploadToStatic.sh -b new-upload -r /path/to/monorepo -u billy-joe 
# -c (CREATEDIRFLAG) = if true, will create a design-system/illustration directory in static-asset repo. default: false
# -o (OPENPRFLAG) = if true, will openPR using hub pull-request command. default: false
# -d (DELREPO) = if true, will remove static-assets repo. default: true
usage() {
  echo "USAGE: ./uploadToStaticAssets -b <branch-name> -r <root-dir-name> -u <username> [optional flags: -c (CREATEDIRFLAG) -o (OPENPRFLAG) -d (DELREPO)]"
}

while getopts b:r:u:c:o:d: option
do
	case "${option}" in
		b) BRANCHNAME=${OPTARG};;
		r) ROOTDIRPATH=${OPTARG};;
		u) USERNAME=${OPTARG};;
		c) CREATEDIRFLAG=${OPTARG};;
		o) OPENPRFLAG=${OPTARG};;
		d) DELREPO=${OPTARG};;
	esac
done

# Throw usage command and exit if these options do not exist, since they 
# are required 
if [ -z "$BRANCHNAME" ] || [ -z "${ROOTDIRPATH}" ] || [ -z "${USERNAME}" ] 
then
   usage
   exit
fi

echo "FLAGS --- BRANCHNAME: ${BRANCHNAME}, ROOTDIRPATH: ${ROOTDIRPATH}, USERNAME: ${USERNAME}, CREATEDIRFLAG: ${CREATEDIRFLAG}, OPENPRFLAG: ${OPENPRFLAG}, DELREPO: ${DELREPO}."


# Create a fork of static-assets to current directory
gcf2 engineering/static-assets $BRANCHNAME

# # Clone images from illustrations component to 
# # static/assets/design-system/illustrations folder
cd static-assets
git pull origin "${USERNAME}/${BRANCHNAME}" 

if [ ${CREATEDIRFLAG=false} == true ] 
then
	echo "Creating design-system/illustration directory..."
	mkdir -p design-system/illustrations
fi

echo "Copying images to static-assets..."
cp -rf "${ROOTDIRPATH}eng/shared/design-system/mobile/illustrations/images/" "${ROOTDIRPATH}eng/shared/design-system/codegen/illustrations/static-assets/assets/design-system/illustrations/"

echo "Pushing changes to static-assets"
git add -A &&  git ci -m "Update Illustration" && git push --set-upstream origin $BRANCHNAME 
if [ ${OPENPRFLAG=false} == true ]
then
	echo "Creating PR..."
	hub pull-request
fi

# # Clean up work after the PR has been created
if [ ${DELREPO=true} == true ]
then
	echo "Removing static-assets directory"
	cd .. && rm -rf static-assets
fi