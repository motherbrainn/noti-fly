const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var { graphqlHTTP } = require("express-graphql");
dotenv.config();
const PORT = process.env.PORT || 4000;
const env = process.env.NODE_ENV;
const { schema, root } = require("./graphql");
const { router } = require("./smsWebhook");

const app = express();

//set cors here to allow requests from client
app.use(
  cors({
    origin: ["http://localhost:3000", "http://zzzz.herokuapp.com/"],
    credentials: true,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(router);

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

app.listen(PORT, (error) => {
  if (!error) console.log("App listening on port: " + PORT);
  else console.log("Error occurred: ", error);
});
