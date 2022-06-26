const { buildSchema } = require("graphql");
const { sendConfirmationMessage } = require("./queries");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type Query {
    hello(date: String): [String],
  }

  type Mutation {
    sendConfirmation(phoneNumber: String): String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    console.log("hello");
  },
  sendConfirmation: ({ phoneNumber }) => {
    const response = sendConfirmationMessage(phoneNumber);
    return response;
  },
};

module.exports = {
  schema,
  root,
};
