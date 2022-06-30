const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const format = require("pg-format");

const env = process.env.NODE_ENV;

const pool =
  env === "production"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        user: process.env.DB_USER,
        host: "localhost",
        database: process.env.DB_NAME,
        password: process.env.DB_USER_PASSWORD,
        port: process.env.DB_PORT,
      });

const getRecords = async (id, key, phone_number, active) => {
  let res;

  const args = [{ id }, { key }, { phone_number }, { active }];
  const queryParam = args.filter((arg) => Object.values(arg)[0] !== undefined);

  //need to use pg-format here to parameterize identifier
  if (queryParam.length > 0) {
    const formattedQuery = format(
      "SELECT * FROM user_data WHERE %I='%s' ORDER BY id DESC",
      Object.keys(queryParam[0])[0],
      Object.values(queryParam[0])[0]
    );
    res = await pool.query(formattedQuery);
  } else {
    res = await pool.query("SELECT * FROM user_data ORDER BY id DESC");
  }
  return res.rows;
};

//return number of removed records
const deleteInactiveRecords = async (phone_number) => {
  let res;
  res = await pool.query(
    "DELETE FROM user_data WHERE phone_number=$1 AND active=$2",
    [phone_number, false]
  );
  return res.rowCount;
};

//new record will always be created with active: false
const createNewRecord = async (
  key,
  notification_id,
  phone_number,
  prompt_content
) => {
  let res;
  res = await pool.query(
    "INSERT INTO user_data (key, notification_id, phone_number, prompt_content, active) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [key, notification_id, phone_number, prompt_content, false]
  );
  return res.rows[0];
};

//activate inactivated instance for phone number. functionally, there should only ever be 1 inactivated instance for a phone number
const activateRecordForPhoneNumber = async (phone_number) => {
  let res;
  res = await pool.query(
    "UPDATE user_data SET active = $1 WHERE phone_number = $2",
    [true, phone_number]
  );
  return res.rowCount;
};

const sendConfirmationMessage = (phoneNumber) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

  const client = new twilio(accountSid, authToken);
  const response = client.messages
    .create({
      body: "Reply with 'y' to opt in to text notifications for this QR code. Your QR code will not work until you opt in. Reply with 'stop' to unsubscribe",
      to: process.env.TEST_PHONE_NUMBER, // Text this number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
      if (message.sid) {
        return "ok";
      }
    });
  return response;
};

module.exports = {
  sendConfirmationMessage,
  getRecords,
  createNewRecord,
  deleteInactiveRecords,
  activateRecordForPhoneNumber,
};
