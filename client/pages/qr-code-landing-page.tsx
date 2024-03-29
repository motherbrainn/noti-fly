import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { SubmitButton, CssTextField } from "../common";
import {
  retrieveQrCodeRecord,
  sendNotification,
} from "../service/httpRequests";
import useMediaQuery from "@mui/material/useMediaQuery";

interface QrCodeLandingPagePropsType {
  qrkey: string;
  errorCode: null | number;
}
interface InitialPropsType {
  query: QrCodeLandingPagePropsType;
}

const QrCodeLandingPage = (props: QrCodeLandingPagePropsType) => {
  //when mobile is true, min width is phone width
  const mobile = useMediaQuery("(max-device-width: 480px)");
  const inputWidth = mobile ? "width: 400" : "width: 200";

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

  const handleMemoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMemoText(e.target.value);
  };

  return (
    <div className="container">
      <Head>
        <title>Noti-Fly</title>
        <meta name="description" content="Noti-Fly App" />
      </Head>
      {(props.errorCode || qrCodeNotFound) && <Error statusCode={404} />}
      {notificationData && qrCodeActive === true && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ ...(mobile && { fontSize: "26px" }) }}>
            {notificationData}
          </h1>
          {allowMemo && (
            <Tooltip
              title={
                "Include a memo to send to the admin along with this notification (optional)"
              }
            >
              <CssTextField
                id="outlined-multiline-static"
                label="Memo (optional)"
                multiline
                rows={4}
                value={memoText}
                onChange={handleMemoChange}
                margin="normal"
                sx={{ inputWidth }}
              />
            </Tooltip>
          )}
          <div style={{ margin: "10px" }}>
            <SubmitButton
              size="medium"
              variant="contained"
              onClick={onClickHandler}
            >
              Send Notification
            </SubmitButton>
          </div>
        </div>
      )}
      {qrCodeActive === false && qrCodeNotFound === undefined && (
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { backgroundColor: "#1f1f1f" } }}
          >
            <DialogTitle id="alert-dialog-title">
              {"QR Code is not active."}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Check your phone to activate QR Code then refresh this page.
              </DialogContentText>
            </DialogContent>
          </Dialog>
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
