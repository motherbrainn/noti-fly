# tipster

Local Install  
You will need a local PostgreSQL server instance running to use this locally.

```$ brew install postgresql``` to install postgres.  
```$ brew services start postgresql``` to start up postgres.  
```$ ./install.sh``` to install dependencies and set up local development database with default settings.  
If you want to customize your database connection use optional arguments:  
```$ ./install.sh <dbUserName> <dbPassword> <dbName>```

Twilio  
Set up a free trial twilio account and create a phone number.

ngrok  
ngrok is required to use the twilio webhook. Follow instructions here to set it up: https://ngrok.com/download

Once ngrok is running copy the address http://localhost:4000 is being forwarded to and paste it into Twilio as your SMS handler as HTTP POST. (example: https://f409-611-972-206-84.ngrok.io/sms)

ngrok doesnt like to run via concurrently, not sure why, I just run it in it's own tab.

Development  
```$ yarn run devStart```  
```$ yarn run ngrok```
