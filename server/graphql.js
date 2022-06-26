const { buildSchema } = require("graphql");
const { sendConfirmationMessage, getRecords } = require("./queries");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
scalar Date

type Query {
    getRecords: [User_Data]
  }

  type Mutation {
    sendConfirmation(phoneNumber: String): String
  }

  type User_Data {
    id: Int,
    key: String,
    phone_number: String,
    prompt_content: String,
    active: Boolean,
    created_at: Date,
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  sendConfirmation: ({ phoneNumber }) => {
    const response = sendConfirmationMessage(phoneNumber);
    return response;
  },
  getRecords: () => {
    const response = getRecords();
    return response;
  },
};

module.exports = {
  schema,
  root,
};
