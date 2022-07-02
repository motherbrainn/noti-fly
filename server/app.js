const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var { graphqlHTTP } = require("express-graphql");
dotenv.config();
const PORT = process.env.PORT || 4000;
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

app.listen(PORT, (error) => {
  if (!error) console.log("App listening on port: " + PORT);
  else console.log("Error occurred: ", error);
});
