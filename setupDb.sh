#!/bin/bash

#set up postgres database
set -e
DB_USER=${1:-tipster_dev_user}
DB_USER_PASS=${2:-password}
DB_NAME=${3:-tipster_development}

psql postgres <<EOF
CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_USER_PASS';
ALTER ROLE $DB_USER CREATEDB;
EOF
echo "Postgres User '$DB_USER' created."

psql -d postgres -U $DB_USER <<EOF
CREATE DATABASE $DB_NAME;
EOF
echo "Postgres database '$DB_NAME' created."

psql -d $DB_NAME -U $DB_USER <<EOF
CREATE TABLE user_data (
ID SERIAL PRIMARY KEY,
KEY VARCHAR,
notification_id VARCHAR,
phone_number VARCHAR,
prompt_content VARCHAR,
notification_content VARCHAR,
allow_memo BOOL,
active BOOL,
created_at TIMESTAMPTZ DEFAULT Now()
);
EOF
echo "Table 'user_data' created for '$DB_NAME'."

#add credentials to local .env file
echo "
export DB_USER = '$DB_USER'
export DB_NAME = '$DB_NAME'
export DB_USER_PASSWORD = '$DB_USER_PASS'
export DB_HOST = 'localhost'
export DB_PORT = 5432
" >> server/.env

echo "development DB credentials added to local .env"