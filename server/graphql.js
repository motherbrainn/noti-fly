const { buildSchema } = require("graphql");
const { sendConfirmationMessage, getRecords } = require("./queries");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  scalar Date

  type Query {
      getRecords(id: String, key: String, phone_number: String, active: Boolean): [User_Data],
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
  //can pass only one of: id, key, phone_number, active (or pass nothing to get all)
  getRecords: ({ id, key, phone_number, active }) => {
    const response = getRecords(id, key, phone_number, active);
    return response;
  },
};

module.exports = {
  schema,
  root,
};
