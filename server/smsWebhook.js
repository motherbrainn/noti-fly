const express = require("express");
const router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { activateRecordForPhoneNumber } = require("./queries");
const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

let fakeDb = [];

const stopKeyWords = [
  "STOP",
  "STOPALL",
  "UNSUBSCRIBE",
  "CANCEL",
  "END",
  "QUIT",
];
const startKeyWords = ["START", "YES", "UNSTOP"];

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

router.post("/sms", async (req, res) => {
  const messageBody = req.body.Body.toUpperCase();
  const fromPhoneNumber = req.body.From;
  const twiml = new MessagingResponse();
  let message = "";

  if (messageBody === "Y") {
    const numberOfActivatedRecords = await activateRecordForPhoneNumber(
      fromPhoneNumber
    );
    if (numberOfActivatedRecords > 0) {
      message = "Your QR Code is activated.";
    }
  }

  // //if this is a brand new user, add user to db
  // if (fakeDb.findIndex((entry) => entry.phoneNumber === fromPhoneNumber)) {
  //   console.log("adding new number");
  //   fakeDb.push({ phoneNumber: fromPhoneNumber, subscribed: true });
  // }

  // //check if we need to unsubscribe user
  // if (stopKeyWords.findIndex((word) => word === messageBody) !== -1) {
  //   console.log("add user to stop list");

  //   fakeDb = fakeDb.map((entry) => {
  //     if (entry.phoneNumber === fromPhoneNumber) {
  //       return { ...entry, subscribed: false };
  //     }
  //   });

  //   console.log({ fakeDb });
  // }

  // //check if we need to subscribe user
  // if (startKeyWords.findIndex((word) => word === messageBody) !== -1) {
  //   console.log("add user to start list");
  //   fakeDb = fakeDb.map((entry) => {
  //     if (entry.phoneNumber === fromPhoneNumber) {
  //       return { ...entry, subscribed: true };
  //     }
  //   });
  //   console.log({ fakeDb });
  // }

  if (message.length > 0) {
    sendTextMessage(fromPhoneNumber, message);
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = {
  router,
};
