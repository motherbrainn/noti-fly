#!/bin/bash

#set up local .env file
echo "
NEXT_PUBLIC_PROD_CLIENT_URL = ''
NEXT_PUBLIC_PROD_API_URL = ''
" >> client/.env.local

echo "client .env.local set up"