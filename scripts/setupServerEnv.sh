#!/bin/bash

#set up local .env file
echo "
export PROD_CLIENT_URL = ''
export TWILIO_ACCOUNT_SID = ''
export TWILIO_AUTH_TOKEN = ''
export TWILIO_PHONE_NUMBER = ''
" >> server/.env

echo "server .env set up"