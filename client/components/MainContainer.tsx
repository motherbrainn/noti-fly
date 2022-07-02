import { useState } from "react";
import QRCode from "react-qr-code";
import Form from "./Form";

const MainContainer = () => {
  const [qrCodeKey, setQrCodeKey] = useState();

  return (
    <div>
      <Form setKey={setQrCodeKey} />
      {qrCodeKey && (
        <div>
          <div>
            YOUR QR CODE IS NOT ACTIVE UNTIL YOU CONFIRM VIA TEXT.. CHECK YOUR
            PHONE
          </div>
          <QRCode
            title="qr code"
            value={`http://localhost:3000/qr-code-landing-page?qrkey=${qrCodeKey}`}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            size={256}
          />
        </div>
      )}
    </div>
  );
};

export default MainContainer;
