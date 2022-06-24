const express = require("express");
const router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

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

router.post("/sms", (req, res) => {
  console.log("hi");
  const messageBody = req.body.Body.toUpperCase();
  const fromPhoneNumber = req.body.From;

  //if this is a brand new user, add user to db
  if (fakeDb.findIndex((entry) => entry.phoneNumber === fromPhoneNumber)) {
    console.log("adding new number");
    fakeDb.push({ phoneNumber: fromPhoneNumber, subscribed: true });
  }

  //check if we need to unsubscribe user
  if (stopKeyWords.findIndex((word) => word === messageBody) !== -1) {
    console.log("add user to stop list");

    fakeDb = fakeDb.map((entry) => {
      if (entry.phoneNumber === fromPhoneNumber) {
        return { ...entry, subscribed: false };
      }
    });

    console.log({ fakeDb });
  }

  //check if we need to subscribe user
  if (startKeyWords.findIndex((word) => word === messageBody) !== -1) {
    console.log("add user to start list");
    fakeDb = fakeDb.map((entry) => {
      if (entry.phoneNumber === fromPhoneNumber) {
        return { ...entry, subscribed: true };
      }
    });
    console.log({ fakeDb });
  }

  const twiml = new MessagingResponse();

  twiml.message("hello");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = {
  router,
};
