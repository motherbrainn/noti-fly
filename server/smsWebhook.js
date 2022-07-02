const express = require("express");
const router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const { activateRecordForPhoneNumber } = require("./queries");
const dotenv = require("dotenv");
dotenv.config();
const { sendTextMessage } = require("./utilities");

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
  sendTextMessage,
};
