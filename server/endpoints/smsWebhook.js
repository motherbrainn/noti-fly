const express = require("express");
const router = express.Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const { activateQrRecordForPhoneNumber } = require("../queries/queries");
const { sendTextMessage } = require("../utilities");

router.post("/sms", async (req, res) => {
  const messageBody = req.body.Body.toUpperCase();
  const fromPhoneNumber = req.body.From;
  const twiml = new MessagingResponse();
  let message = "";

  if (messageBody === "Y") {
    const numberOfActivatedRecords = await activateQrRecordForPhoneNumber(
      fromPhoneNumber
    );
    console.log(numberOfActivatedRecords);
    if (numberOfActivatedRecords > 0) {
      message = "Your QR Code is activated.";
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
