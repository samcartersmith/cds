#!/bin/bash

# A script to programmatically upload illustrations
# to static-asset repo

## PREREQUISITES ##
# Before you can run this script, you must have the following
# items completed:
# 1. install hub using homebrew (a CLI tool for managing github repo)
# 2. https://confluence.coinbase-corp.com/display/INFRA/How+to+Fork+a+Repository - Follow these instruction
#    to make sure that you have all the config to make a fork from Coinbase Repo

## Troubleshoot Guide ##

# If you are having issue with permission denied when running this script.
# run chmod u+x uploadToStaticAssets.sh (or path/to/script). This will give
# it access to the script.

# USAGE: ./uploadToStaticAssets.sh [optional flags: -r -b -u -c -o -d]

# The most basic usage without any optional flags. You will probably run it like this
# 90% of the time
# Basic Example: ./uploadToStatic.sh

# Example on how to set root path. In case we detected the wrong root path
# Setting rootpath Example: ./uploadToStatic.sh -r /path/to/repo

# Example on how to set custom branch name
# Setting Branchname Example: ./uploadToStatic.sh -r /path/to/repo -b publish-illo-today

# Example on how to set custom username. In case, this script is unable to detect your username
# With Username Example: ./uploadToStatic.sh -r /path/to/repo -u jennifer-liu

# -u (USERNAME) = set your github username
# -b (BRANCHNAME) = set the branch name of this cloned static asset
# -o (OPENPRFLAG) = if true, will openPR using hub pull-request command. default: false
# -d (DELREPO) = if true, will remove static-assets repo. default: true

usage() {
	echo "USAGE: ./uploadToStaticAssets -r <root-dir-name> [optional flags: -b (BRANCHNAME) -u (USERNAME) -o (OPENPRFLAG) -d (DELREPO)]"
}

getGithubUsername() {
	email=$(git config user.email)

	IFS='.'                    # setting period as delimiter
	read -ra EMAIL <<<"$email" #reading email as an array as tokens separated by IFS

	firstName=${EMAIL[0]}

	IFS='@'
	read -ra EMAIL <<<"${EMAIL[1]}"

	lastName=${EMAIL[0]}

	echo "${firstName}-${lastName}"
}

getRootPath() {
	root=$(npm root)
	IFS='/'                  #setting / as delimiter
	read -ra ROOT <<<"$root" #reading root as an array as tokens separated by IFS

	ROOT_LEN=${#ROOT[@]}
	SLASH="/"

	rootPath=""
	for ((i = 1; i < $(expr $ROOT_LEN - 1); i++)); do
		rootPath="$rootPath${SLASH}${ROOT[i]}"
	done
	echo "$rootPath/packages/illustrations"
}

while getopts b:r:u:c:o:d: option; do
	case "${option}" in
	b) BRANCHNAME=${OPTARG} ;;
	r) ROOTDIRPATH=${OPTARG} ;;
	u) USERNAME=${OPTARG} ;;
	o) OPENPRFLAG=${OPTARG} ;;
	d) DELREPO=${OPTARG} ;;
	esac
done

# define username if its not set by user
if [ -z "${USERNAME}" ]; then
	USERNAME=$(getGithubUsername)
fi

# define branchname if its not set by users
# The default branch name will be publish-illo-<today's name>-<random number>
if [ -z "${BRANCHNAME}" ]; then
	now=$(date +'%m-%d-%Y')
	BRANCHNAME="publish-illo-${now}-$RANDOM"
fi

# define rootPath if its not set by users
if [ -z "${ROOTDIRPATH}" ]; then
	ROOTDIRPATH=$(getRootPath)
fi

TEAM_NAME="ui-infra"

echo "FLAGS --- BRANCHNAME: ${BRANCHNAME}, ROOTDIRPATH: ${ROOTDIRPATH}, USERNAME: ${USERNAME}, CREATEDIRFLAG: ${CREATEDIRFLAG}, OPENPRFLAG: ${OPENPRFLAG}, DELREPO: ${DELREPO}."

echo "Creating fork of engineering/static-assets with branchname $BRANCHNAME"
gcf2 engineering/static-assets $BRANCHNAME

echo "Copying images from illustrations component to static/assets/$TEAM_NAME/illustration folder"
cd static-assets
git pull origin "${USERNAME}/${BRANCHNAME}"

ILLUSTRATION_VERSION="v1"
VARIANTS=('heroSquare' 'pictogram' 'spotRectangle' 'spotSquare' 'spotIcon')
FOLDER_PREFIX="assets/$TEAM_NAME/illustration/$ILLUSTRATION_VERSION"

for variant in "${VARIANTS[@]}"; do
	echo "Creating $FOLDER_PREFIX/$variant/png/dark directory..."
	mkdir -p $FOLDER_PREFIX/$variant/png/dark

	echo "Creating $FOLDER_PREFIX/$variant/png/light directory..."
	mkdir -p $FOLDER_PREFIX/$variant/png/light

	echo "Creating $FOLDER_PREFIX/$variant/svg/dark directory..."
	mkdir -p $FOLDER_PREFIX/$variant/svg/dark

	echo "Creating $FOLDER_PREFIX/$variant/svg/light directory..."
	mkdir -p $FOLDER_PREFIX/$variant/svg/light
done

echo "Copying images to static-assets..."

static_assets_local_root_dir="${ROOTDIRPATH}/static-assets/assets/$TEAM_NAME/illustration/$ILLUSTRATION_VERSION"

for variant in "${VARIANTS[@]}"; do
	cp "${ROOTDIRPATH}/src/__generated__/$variant/svg/dark/"* "$static_assets_local_root_dir/$variant/svg/dark/"
	cp "${ROOTDIRPATH}/src/__generated__/$variant/svg/light/"* "$static_assets_local_root_dir/$variant/svg/light/"

	cp "${ROOTDIRPATH}/src/__generated__/$variant/png/dark/"* "$static_assets_local_root_dir/$variant/png/dark/"
	cp "${ROOTDIRPATH}/src/__generated__/$variant/png/light/"* "$static_assets_local_root_dir/$variant/png/light/"
done

echo "Pushing changes to static-assets"

git add -A && git commit -m "Publish Illustration $(date +'%m-%d-%Y')" && git push --set-upstream origin "${USERNAME}/${BRANCHNAME}"
if [ ${OPENPRFLAG=false} == true ]; then
	echo "Creating PR..."
	hub pull-request
fi

# # Clean up work after the PR has been created
# Deletes the cloned static-assets repo
if [ ${DELREPO=true} == true ]; then
	echo "Removing static-assets directory"
	cd .. && rm -rf static-assets
fi
