const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./endpoints/graphql");
const { router } = require("./endpoints/smsWebhook");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;
const PROD_CLIENT_URL = process.env.CLIENT_URL;

const app = express();

//set cors here to allow requests from client
app.use(
  cors({
    origin: ["http://localhost:3000", PROD_CLIENT_URL],
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

app.listen(PORT, (error) => {
  if (!error) console.log("App listening on port: " + PORT);
  else console.log("Error occurred: ", error);
});
