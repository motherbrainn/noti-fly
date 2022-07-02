const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const sendTextMessage = (phoneNumber, messageContent) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

  const client = new twilio(accountSid, authToken);
  const response = client.messages
    .create({
      body: messageContent,
      to: phoneNumber, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
      if (message.sid) {
        return "ok";
      }
    });
  return response;
};

module.exports = {
  sendTextMessage,
};
