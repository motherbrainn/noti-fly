const { buildSchema } = require("graphql");
const {
  sendConfirmationMessage,
  getRecords,
  createNewRecord,
  deleteInactiveRecords,
  activateRecordForPhoneNumber,
  sendNotificationMessage,
} = require("./queries");

const crypto = require("crypto");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  scalar Date

  type Query {
      getRecords(id: String, key: String, phone_number: String, notification_content: String, allow_memo: Boolean active: Boolean): [User_Data],
    }

  type Mutation {
    sendConfirmation(phoneNumber: String): String,
    createNewRecord(key: String, notification_id: String, phone_number: String, prompt_content: String, notification_content: String, allow_memo: Boolean): User_Data,
    deleteInactiveRecords(phone_number: String): String,
    activateRecordForPhoneNumber(phone_number: String): String,
    sendNotification(key: String, message: String): String,
  }

  type User_Data {
    id: Int,
    key: String,
    notification_id: String,
    phone_number: String,
    prompt_content: String,
    notification_content: String, 
    allow_memo: Boolean,
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
  sendNotification: ({ key, message }) => {
    const response = sendNotificationMessage(key, message);
    return response;
  },
  //can pass only one of: id, key, phone_number, active (or pass nothing to get all)
  getRecords: ({ id, key, phone_number, active }) => {
    const response = getRecords(id, key, phone_number, active);
    return response;
  },
  createNewRecord: ({
    phone_number,
    notification_id,
    prompt_content,
    notification_content,
    allow_memo,
  }) => {
    const key = crypto.randomBytes(20).toString("hex");
    const response = createNewRecord(
      key,
      notification_id,
      phone_number,
      prompt_content,
      notification_content,
      allow_memo
    );
    return response;
  },
  deleteInactiveRecords: ({ phone_number }) => {
    const response = deleteInactiveRecords(phone_number);
    return response;
  },
  activateRecordForPhoneNumber: ({ phone_number }) => {
    const response = activateRecordForPhoneNumber(phone_number);
    return response;
  },
};

module.exports = {
  schema,
  root,
};
