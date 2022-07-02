import Error from "next/error";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import {
  retrieveQrCodeRecord,
  sendNotification,
} from "../service/httpRequests";

interface QrCodeLandingPagePropsType {
  qrkey: string;
  errorCode: null | number;
}
interface InitialPropsType {
  query: QrCodeLandingPagePropsType;
}

const QrCodeLandingPage = (props: QrCodeLandingPagePropsType) => {
  const router = useRouter();

  const [qrKey, setQrKey] = useState("");
  const [notificationData, setNotificationData] = useState();
  const [allowMemo, setAllowMemo] = useState(false);
  const [qrCodeActive, setQrCodeActive] = useState(false);
  const [memoText, setMemoText] = useState("");
  const [qrCodeNotFound, setQrCodeNotFound] =
    useState<SetStateAction<undefined | number>>();

  const onClickHandler = () => {
    //send notification, reset memo text, send user to confirmation page
    sendNotification(qrKey, memoText);
    setMemoText("");
    router.push("/notification-sent");
  };

  useEffect(() => {
    const fetchData = async () => {
      //set qr key for when we send notification
      setQrKey(props.qrkey);
      const qrCodeData = await retrieveQrCodeRecord(props.qrkey);

      if (qrCodeData.data.getRecords.length !== 0) {
        setQrCodeActive(qrCodeData.data.getRecords[0].active);
        setNotificationData(qrCodeData.data.getRecords[0].prompt_content);
        setAllowMemo(qrCodeData.data.getRecords[0].allow_memo);
      } else setQrCodeNotFound(404);
    };
    if (props.qrkey) {
      fetchData();
    }
  }, [notificationData, props, props.qrkey]);

  return (
    <div>
      {(props.errorCode || qrCodeNotFound) && <Error statusCode={404} />}
      {notificationData && qrCodeActive === true && (
        <div>
          <div>{notificationData}</div>
          {allowMemo && (
            <textarea
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
            ></textarea>
          )}
          <button onClick={onClickHandler}>submit</button>
        </div>
      )}
      {qrCodeActive === false && (
        <div>
          QR Code is not active. Check your phone to activate and try again.
        </div>
      )}
    </div>
  );
};

QrCodeLandingPage.getInitialProps = async ({ query }: InitialPropsType) => {
  return query.qrkey
    ? { ...query, errorCode: null }
    : { qrkey: null, errorCode: 404 };
};

export default QrCodeLandingPage;
