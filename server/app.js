const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV;

const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

let fakeDb = [];

//set cors here to allow requests from client
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// POST method route
app.post("/sendMessage", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

  const twilio = require("twilio");
  const client = new twilio(accountSid, authToken);
  client.messages
    .create({
      body: "Hello from Node. Reply with 'stop' to unsubscribe",
      to: process.env.TEST_PHONE_NUMBER, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

  res.send({ res: "send message" });
});

const stopKeyWords = [
  "STOP",
  "STOPALL",
  "UNSUBSCRIBE",
  "CANCEL",
  "END",
  "QUIT",
];
const startKeyWords = ["START", "YES", "UNSTOP"];

app.post("/sms", (req, res) => {
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

app.listen(PORT, (error) => {
  if (!error) console.log("App listening on port: " + PORT);
  else console.log("Error occurred: ", error);
});
