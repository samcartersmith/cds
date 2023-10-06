#!/bin/bash

# Shard assets with awk
shard_0=$(find . -type f | awk 'NR%3==0')
shard_1=$(find . -type f | awk 'NR%3==1')
shard_2=$(find . -type f | awk 'NR%3==2')

# If non-empty create the zip file
[ -z "$shard_0" ] || echo $shard_0 | xargs zip -r /assets_shard_0.zip
[ -z "$shard_1" ] || echo $shard_1 | xargs zip -r /assets_shard_1.zip
[ -z "$shard_2" ] || echo $shard_2 | xargs zip -r /assets_shard_2.zip
