const { buildSchema } = require("graphql");
const { sendConfirmationMessage } = require("./queries");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    sendConfirmation(phoneNumber: String): String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  sendConfirmation: ({ phoneNumber }) => {
    const response = sendConfirmationMessage(phoneNumber);
    return response;
  },
};

module.exports = {
  schema,
  root,
};
