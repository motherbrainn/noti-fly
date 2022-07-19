const format = require("pg-format");
const { sendTextMessage } = require("../utilities");
const { pool } = require("../dbConnection");

/**
 * get records matching one of the input params
 * @param {*} id
 * @param {*} key
 * @param {*} phone_number
 * @param {*} active
 * @returns records matching only ONE of the input params, do not try to pass in more than 1 at a time
 */
const getQrRecords = async (id, key, phone_number, active) => {
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
  }
  return res.rows;
};

/**
 * delete all inactive records for phone number
 * @param {*} phoneNumber
 * @returns number of removed inactive records
 */
const deleteInactiveQrRecords = async (phoneNumber) => {
  let res;
  res = await pool.query(
    "DELETE FROM user_data WHERE phone_number=$1 AND active=$2",
    [phoneNumber, false]
  );
  return res.rowCount;
};

/**
 * create new record with params. new records will always be created as 'inactive'
 * @param {*} key
 * @param {*} nofificationId
 * @param {*} phoneNumber
 * @param {*} promptContent
 * @param {*} notificationContent
 * @param {*} allowMemo
 * @returns newly created record
 */
const createNewQrRecord = async (
  key,
  nofificationId,
  phoneNumber,
  promptContent,
  notificationContent,
  allowMemo
) => {
  let res;
  res = await pool.query(
    "INSERT INTO user_data (key, notification_id, phone_number, prompt_content, notification_content, allow_memo, active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      key,
      nofificationId,
      phoneNumber,
      promptContent,
      notificationContent,
      allowMemo,
      false,
    ]
  );
  return res.rows[0];
};

/**
 * activate inactivated instance for phone number. functionally, there should only ever be 1 inactivated instance for a phone number
 * @param {*} phoneNumber
 * @returns number of updated rows (should always be === 1)
 */
const activateQrRecordForPhoneNumber = async (phoneNumber) => {
  let res;
  res = await pool.query(
    "UPDATE user_data SET active = $1 WHERE phone_number = $2",
    [true, phoneNumber]
  );
  return res.rowCount;
};

/**
 * send confirmation text message to phone number
 * @param {*} phoneNumber
 * @returns 'ok' string if successful
 */
const sendConfirmationMessage = async (phoneNumber) => {
  const confirmationMessage =
    "Reply with 'y' to activate this QR code and start recieving notication messages. Your QR code will not work until it is activated. Reply with 'stop' to unsubscribe from all notifications";
  const response = await sendTextMessage(phoneNumber, confirmationMessage);
  return response;
};

/**
 * send notification message to phone number defined by qr code record for key
 * @param {*} key qr code record key
 * @param {*} message message you would like to send for record
 * @returns ['ok', false] if one message is sent succesfully, ['ok', ''] if two messages are send successfully
 */
const sendNotificationMessage = async (key, message) => {
  //find phone number for key
  const record = await getQrRecords(undefined, key);
  const { phone_number, notification_content, allow_memo } = record[0];

  //send notification for qr code
  const sendNotificationResponse = await sendTextMessage(
    phone_number,
    notification_content
  );

  //if allow memo is true, send memo message from user
  const sendMemoResponse =
    allow_memo && (await sendTextMessage(phone_number, message));

  return [sendNotificationResponse, allow_memo ? sendMemoResponse : ""];
};

module.exports = {
  sendConfirmationMessage,
  getQrRecords,
  createNewQrRecord,
  deleteInactiveQrRecords,
  activateQrRecordForPhoneNumber,
  sendNotificationMessage,
};
