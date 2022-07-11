import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import Form from "./Form";

const env = process.env.NODE_ENV;
const PROD_CLIENT_URL = process.env.NEXT_PUBLIC_PROD_CLIENT_URL;

const clientUrl = env === "production" ? PROD_CLIENT_URL : "localhost:3000";

const MainContainer = () => {
  const [qrCodeKey, setQrCodeKey] = useState("");
  const [qrCodePrompt, setQrCodePrompt] = useState("");
  const [loading, setIsLoading] = useState(false);

  const handleClose = () => {
    setQrCodeKey("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Form
        setKey={setQrCodeKey}
        setPrompt={setQrCodePrompt}
        setIsLoading={setIsLoading}
      />
      <Dialog
        open={qrCodeKey.length > 0 && true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="hide-when-printing"
          sx={{ textAlign: "center", width: "fit-content" }}
        >
          YOUR QR CODE IS NOT ACTIVE UNTIL YOU CONFIRM VIA TEXT.. CHECK YOUR
          PHONE
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{ wordBreak: "break-all", whiteSpace: "normal" }}
          >
            {qrCodePrompt}
          </DialogContentText>
          <QRCode
            title="qr code"
            value={`${clientUrl}/qr-code-landing-page?qrkey=${qrCodeKey}`}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
            size={256}
            style={{ margin: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePrint}
            className="hide-when-printing"
            autoFocus
          >
            Print Notification QR Code
          </Button>
          <Button onClick={handleClose} className="hide-when-printing">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainContainer;
