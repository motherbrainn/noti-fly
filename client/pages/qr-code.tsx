import {
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  DialogContentText,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Head from "next/head";
import router from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { ModalButton } from "../common";
import { retrieveQrCodeRecord } from "../service/httpRequests";
import { clientUrl } from "../utilities";

interface QrCodeLandingPagePropsType {
  qrkey: string;
  errorCode: null | number;
}

interface InitialPropsType {
  query: QrCodeLandingPagePropsType;
}

const QrCode = (props: QrCodeLandingPagePropsType) => {
  const [qrKey, setQrKey] = useState("");
  const [qrCodeActive, setQrCodeActive] = useState(false);
  const [notificationData, setNotificationData] = useState();
  const [fetchStatus, setFetchStatus] =
    useState<SetStateAction<undefined | number>>();
  const [loading, setIsLoading] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  const mobile = useMediaQuery("(max-device-width: 480px)");
  const qrCodeSize = mobile ? 140 : 256;

  useEffect(() => {
    const fetchData = async () => {
      //set qr key for when we send notification
      setQrKey(props.qrkey);
      const qrCodeData = await retrieveQrCodeRecord(props.qrkey);
      if (qrCodeData.data.getRecords.length !== 0) {
        setQrCodeActive(qrCodeData.data.getRecords[0].active);
        setNotificationData(qrCodeData.data.getRecords[0].prompt_content);
        setFetchStatus(200);
      } else setFetchStatus(404);
    };
    if (props.qrkey) {
      fetchData();
      setIsLoading(false);
    }
  }, [notificationData, props, props.qrkey]);

  const createNewQrCode = () => {
    router.push("/");
  };

  return (
    <div className="container">
      <Head>
        <title>Noti-Fly</title>
        <meta name="description" content="Noti-Fly App" />
      </Head>
      {!loading && fetchStatus === 200 && qrCodeActive === true && (
        <div>
          <Dialog
            open={true}
            aria-labelledby="qr-code"
            aria-describedby="qr-code"
            PaperProps={{ sx: { backgroundColor: "#1F1F1F" } }}
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                fontStyle: "italic",
                marginTop: "16px",
              }}
            >
              {notificationData}
            </DialogContentText>
            <DialogContent>
              <QRCode
                title="qr-code"
                value={`${clientUrl}/qr-code-landing-page?qrkey=${qrKey}`}
                bgColor={"#1f1f1f"}
                fgColor={"white"}
                size={qrCodeSize}
                style={{ marginBottom: "16px" }}
              />
              <ModalButton
                onClick={handlePrint}
                className="hide-when-printing"
                autoFocus
                sx={{ ...(mobile && { fontSize: "12px" }) }}
              >
                Print Notification QR Code
              </ModalButton>
              <ModalButton
                onClick={createNewQrCode}
                className="hide-when-printing"
              >
                Create new QR Code
              </ModalButton>
              <DialogContentText
                sx={{ display: "none", marginTop: "16px" }}
                className="show-when-printing"
              >
                {"https://noti-fly.vercel.app/"}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {!loading && fetchStatus === 404 && (
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { backgroundColor: "#1f1f1f" } }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Invalid QR Code
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

QrCode.getInitialProps = async ({ query }: InitialPropsType) => {
  return query.qrkey
    ? { ...query, errorCode: null }
    : { qrkey: null, errorCode: 404 };
};

export default QrCode;
