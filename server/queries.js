const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const sendConfirmationMessage = (phoneNumber) => {
  //query db for all rows with this phone number
  //delete any entry for phone number where active is 'false' (there can only be one unconfirmed QR code per phone number at any time)
  //create new entry for phone number
  //send confirmation message with opt out as false

  /**
 * db schema
 * {
phoneNumber: zzzzzzz
key: zzzzzz
prompt: zzzz
id: zzzzz
active: false
}
 */

  const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

  const client = new twilio(accountSid, authToken);
  const response = client.messages
    .create({
      body: "Reply with 'y' to opt in to text notifications for this QR code. Your QR code will not work until you opt in. Reply with 'stop' to unsubscribe",
      to: process.env.TEST_PHONE_NUMBER, // Text this number
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
  sendConfirmationMessage,
};
