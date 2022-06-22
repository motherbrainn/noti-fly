const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV;

const app = express();

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
      body: "Hello from Node",
      to: process.env.TEST_PHONE_NUMBER, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

  res.send({ res: "send message" });
});

app.listen(PORT, (error) => {
  if (!error) console.log("App listening on port: " + PORT);
  else console.log("Error occurred: ", error);
});
