const { buildSchema } = require("graphql");
const { sendConfirmationMessage } = require("./queries");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    sendConfirmation: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    console.log("hi");
    return "Hello world!";
  },
  sendConfirmation: () => {
    console.log("hi");
    sendConfirmationMessage();
    return "z";
  },
};

module.exports = {
  schema,
  root,
};
