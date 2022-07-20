const express = require("express");
const router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const {
  activateQrRecordForPhoneNumber,
  qrCodesForPhoneNumber,
  deleteQrCodeByIndex,
} = require("../queries/queries");
const { sendTextMessage } = require("../utilities");

router.post("/sms", async (req, res) => {
  const messageBody = req.body.Body.toUpperCase();
  const messageCommand = messageBody.split(/\s(.+)/)[0];
  const qrCodeId = messageBody.split(/\s(.+)/)[1];
  const fromPhoneNumber = req.body.From;
  const twiml = new MessagingResponse();
  let message = "";

  if (messageCommand === "Y") {
    const numberOfActivatedRecords = await activateQrRecordForPhoneNumber(
      fromPhoneNumber
    );
    if (numberOfActivatedRecords > 0) {
      message =
        "Your QR Code is activated! When a user scans your code you will be notified via text.";
    }
  }

  if (messageCommand === "LIST") {
    const qrCodeList = await qrCodesForPhoneNumber(fromPhoneNumber);

    const qrCodeNameAndIndex = qrCodeList.map(
      (e, i) => `${i + 1}: ${e.notification_id}`
    );

    //return ids and names as strings seperated by new lines
    if (qrCodeNameAndIndex.length > 0) {
      message = `Active QR Codes: ${"\n"} ${qrCodeNameAndIndex.join("\n")}`;
    } else {
      message =
        "This phone number does not have any active QR Codes. Go ahead and create one!";
    }
  }

  if (messageCommand === "QRHELP") {
    const commands = [
      "list: returns a list of your active QR Codes",
      "remove<id>: remove a QR Code by id number from list. Ex: remove 1",
      "qrcode<id>: retrieve QR Code by id number from list. Ex: qrcode 1",
    ];
    message = `Commands: ${"\r\n"} ${commands.join("\r\n")} `;
  }

  if (messageCommand === "REMOVE" && qrCodeId !== undefined) {
    const removedRowCount = await deleteQrCodeByIndex(
      fromPhoneNumber,
      qrCodeId
    );
    console.log(removedRowCount);
    if (removedRowCount === 1) {
      message = `QR Code successfully removed.`;
    } else {
      message = `Failed to remove QR Code, please check syntax and try again. Command should look like: remove <number>`;
    }
  }
  if (message.length > 0) {
    sendTextMessage(fromPhoneNumber, message);
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

module.exports = {
  router,
  sendTextMessage,
};
