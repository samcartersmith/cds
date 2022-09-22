#!/bin/bash

# A script to programmatically upload illustrations  
# to static-asset repo

## PREREQUISITES ##
# Before you can run this script, you must have the following 
# items completed:  
# 1. install hub using homebrew (a CLI tool for managing github repo) 
# 2. https://confluence.coinbase-corp.com/display/INFRA/How+to+Fork+a+Repository - Follow these instruction 
#    to make sure that you have all the config to make a fork from Coinbase Repo 
# 3. install pngcrush using homebrew (a CLI tool to compress pngs)

## Troubleshoot Guide ##

# If you are having issue with permission denied when running this script. 
# run chmod u+x uploadToStaticAssets.sh (or path/to/script). This will give 
# it access to the script. 

# USAGE: ./uploadToStaticAssets.sh [optional flags: -r -b -u -c -o -d]

# The most basic usage without any optional flags. You will probably run it like this 
# 90% of the time 
# Basic Example: ./uploadToStatic.sh

# Example on how to set root path. In case we detected the wrong root path
# Setting rootpath Example: ./uploadToStatic.sh -r /path/to/monorepo 

# Example on how to set custom branch name
# Setting Branchname Example: ./uploadToStatic.sh -r /path/to/monorepo -b publish-illo-today

# Example on how to set custom username. In case, this script is unable to detect your username
# With Username Example: ./uploadToStatic.sh -r /path/to/monorepo -u jennifer-liu 

# -u (USERNAME) = set your github username
# -b (BRANCHNAME) = set the branch name of this cloned static asset
# -c (CREATEDIRFLAG) = if true, will create a design-system/illustration directory in static-asset repo. default: false
# -o (OPENPRFLAG) = if true, will openPR using hub pull-request command. default: false
# -d (DELREPO) = if true, will remove static-assets repo. default: true

usage() {
  echo "USAGE: ./uploadToStaticAssets -r <root-dir-name> [optional flags: -b (BRANCHNAME) -u (USERNAME) -c (CREATEDIRFLAG) -o (OPENPRFLAG) -d (DELREPO)]"
}

getGithubUsername() {
	email=`git config user.email`

	IFS='.' # setting period as delimiter
	read -ra EMAIL <<<"$email" #reading email as an array as tokens separated by IFS

	firstName=${EMAIL[0]}

	IFS='@'
	read -ra EMAIL <<<"${EMAIL[1]}"

	lastName=${EMAIL[0]}

	echo "${firstName}-${lastName}"
}

getRootPath() {
	root=`npm root`
	IFS='/' #setting / as delimiter
	read -ra ROOT <<<"$root" #reading root as an array as tokens separated by IFS

	ROOT_LEN=${#ROOT[@]}
	SLASH="/"

	rootPath=""
	for (( i=1; i<$(expr $ROOT_LEN - 1); i++ ))
	do
		rootPath="$rootPath${SLASH}${ROOT[i]}"
	done
	echo "$rootPath/packages/codegen/illustrations"
}

compressPNGs() {
	# Obtain the size of png directory
	# before it is compressed
	uncompressedSize=`du $1`

	cd $1 

	for dir in *.png; do
		# Obtain filename
		originalFileName="$(basename -- $dir)"
		newFileName="${originalFileName%.*}-uncompressed.png"

		# Rename file so that its in this format
		# <original-filename>-uncompressed.png
		mv $originalFileName $newFileName

		# compress png
		pngcrush $newFileName $originalFileName

		# remove the temporary file used during compression
		rm $newFileName
	done

	# Obtain the size of png directory
	# after it is compressed
	compressedSize=`du $1`

	echo "Path: $1"	
	echo "Uncompressed Size: $uncompressedSize"
	echo "Compressed Size: $compressedSize"
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

# define username if its not set by user
if [ -z "${USERNAME}" ]
then
	USERNAME=`getGithubUsername`
fi

# define branchname if its not set by users 
# The default branch name will be publish-illo-<today's name>-<random number>
if [ -z "${BRANCHNAME}" ]
then
	now=$(date +'%m-%d-%Y')
	BRANCHNAME="publish-illo-${now}-$RANDOM"
fi

# define rootPath if its not set by users 
if [ -z "${ROOTDIRPATH}" ]
then
	ROOTDIRPATH=`getRootPath`
fi

echo "FLAGS --- BRANCHNAME: ${BRANCHNAME}, ROOTDIRPATH: ${ROOTDIRPATH}, USERNAME: ${USERNAME}, CREATEDIRFLAG: ${CREATEDIRFLAG}, OPENPRFLAG: ${OPENPRFLAG}, DELREPO: ${DELREPO}."

# Optimize PNGs so they are smallest size possible
pngLight=`compressPNGs "${ROOTDIRPATH}/images/png-light/"`
pngDark=`compressPNGs "${ROOTDIRPATH}/images/png-dark/"`
echo $pngLight
echo $pngDark

echo "Creating fork of engineering/static-assets with branchname $BRANCHNAME"
gcf2 engineering/static-assets $BRANCHNAME

echo "Copying images from illustrations component to static/assets/design-system/illustrations folder"
cd static-assets
git pull origin "${USERNAME}/${BRANCHNAME}" 

if [ ${CREATEDIRFLAG=false} == true ] 
then
	echo "Creating design-system/illustration directory..."
	mkdir -p design-system/illustrations
fi

echo "Copying images to static-assets..."
cp -rf "${ROOTDIRPATH}/images/" "${ROOTDIRPATH}/static-assets/assets/design-system/illustrations/"

echo "Pushing changes to static-assets"
git add -A &&  git commit -m "Publish Illustration $(date +'%m-%d-%Y')" && git push --set-upstream origin "${USERNAME}/${BRANCHNAME}" 
if [ ${OPENPRFLAG=false} == true ]
then
	echo "Creating PR..."
	hub pull-request
fi

# # Clean up work after the PR has been created
# Deletes the cloned static-assets repo
# Deletes the png-dark and png-light directory so we
# don't commit so much to git
if [ ${DELREPO=true} == true ]
then
	echo "Removing static-assets directory"
	cd .. && rm -rf static-assets
	echo "Deleting png-dark directory"
	cd images
	rm -rf png-dark
	echo "Deleting png-light directory"
	rm -rf png-light
fi