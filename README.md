# noti-fly
Create a QR Code that will notify the provided phone number when scanned. Some basic QR code maintenance functionality can be accessed via text. 

**Local Install**  
You will need a local PostgreSQL server instance running to use this locally.

1. `$ brew install postgresql` to install postgres.  
2. `$ brew services start postgresql` to start up postgres.  
3. `$ ./install.sh` to install dependencies and set up local development database with default settings and .env template files.  
If you want to customize your database connection use optional arguments:  
`$ ./install.sh <dbUserName> <dbPassword> <dbName>`

**Twilio**  
Set up a free trial twilio account and create a phone number. Add your Twilio phone number, account SID and auth token to the .env file in /server.

**ngrok**  
ngrok is required to use the Twilio webhook locally. Follow instructions here to set it up: https://ngrok.com/download

Once ngrok is running copy the address http://localhost:4000 is being forwarded to and paste it into Twilio as your SMS handler for HTTP POST. (example: https://f409-611-972-206-84.ngrok.io/sms)

<img src="/twilio-sms-config.png" width=40% height=40%>



**Development**
`$ yarn run devStart`  
`$ yarn run ngrok` (ngrok doesnt like to run via concurrently, not sure why, I just run it in it's own tab.)

**Tech Stuff**  
Client is React using Next.js, server is Express, DB is Postgres.  
In prod client is deployed with Vercel, server is hosted by Heroku and DB is Heroku Postgres.
