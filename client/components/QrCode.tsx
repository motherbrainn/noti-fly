import QRCode from "react-qr-code";

/**
 *
 * to generate qr code:
 * prompt for phone number
 * send phone number and unique identifier for notification (to support multiple notifications for one phone number)
 * when phone number is provided send text message to phone number asking to opt in
 * show qr code immediately, qr code will not work until phone number opts in
 * qr code should include a key as query param..
 * that key will be used by server to send notification to correct phone number with correct prompt
 */
const QrCode = () => {
  return (
    <div>
      <QRCode
        title="qr code"
        value={"https://www.google.com/"}
        bgColor={"#FFFFFF"}
        fgColor={"#000000"}
        size={256}
      />
    </div>
  );
};

export default QrCode;
