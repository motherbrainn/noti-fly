#!/bin/sh

#install dependencies
yarn add -D concurrently
yarn run install-noti-fly

#set up local env files
scripts/setupClientEnv.sh
scripts/setupServerEnv.sh

#set up database
source scripts/setupDb.sh