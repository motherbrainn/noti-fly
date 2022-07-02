import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  retrieveQrCodeRecord,
  sendNotification,
} from "../service/httpRequests";

interface QueryStringPropsType {
  qrkey: string;
}
interface InitialPropsType {
  query: QueryStringPropsType;
}

const QrCodeLandingPage = (query: QueryStringPropsType) => {
  const router = useRouter();

  const [qrKey, setQrKey] = useState("");
  const [notificationData, setNotificationData] = useState();
  const [allowMemo, setAllowMemo] = useState(false);
  const [memoText, setMemoText] = useState("");

  const onClickHandler = () => {
    sendNotification(qrKey, memoText);
    setMemoText("");
    router.push("/notification-sent");
  };

  useEffect(() => {
    const fetchData = async () => {
      //set qr key for when we send notification
      setQrKey(query.qrkey);
      const qrCodeData = await retrieveQrCodeRecord(query.qrkey);
      setNotificationData(qrCodeData.data.getRecords[0].prompt_content);
      setAllowMemo(qrCodeData.data.getRecords[0].allow_memo);
    };
    fetchData();
  }, [notificationData, query.qrkey]);

  return (
    <div>
      {notificationData && <div>{notificationData}</div>}
      {allowMemo && (
        <textarea
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
        ></textarea>
      )}
      <button onClick={onClickHandler}>button</button>
    </div>
  );
};

QrCodeLandingPage.getInitialProps = async ({ query }: InitialPropsType) => {
  return query;
};

export default QrCodeLandingPage;
