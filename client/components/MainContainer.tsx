import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ModalButton } from "../common";
import Form from "./Form";
import useMediaQuery from "@mui/material/useMediaQuery";

const env = process.env.NODE_ENV;
const PROD_CLIENT_URL = process.env.NEXT_PUBLIC_PROD_CLIENT_URL;

const clientUrl = env === "production" ? PROD_CLIENT_URL : "localhost:3000";

const MainContainer = () => {
  const mobile = useMediaQuery("(max-device-width: 480px)");
  const qrCodeSize = mobile ? 140 : 256;

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
        PaperProps={{ sx: { backgroundColor: "#1f1f1f" } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="hide-when-printing"
          sx={{ textAlign: "center", width: "fit-content" }}
        >
          YOUR QR CODE IS NOT ACTIVE UNTIL YOU ACTIVATE VIA TEXT.. CHECK YOUR
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
            sx={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              fontStyle: "italic",
            }}
          >
            {qrCodePrompt}
          </DialogContentText>
          <QRCode
            title="qr code"
            value={`${clientUrl}/qr-code-landing-page?qrkey=${qrCodeKey}`}
            bgColor={"#1f1f1f"}
            fgColor={"white"}
            size={qrCodeSize}
            style={{ marginTop: "16px" }}
          />
          <DialogContentText
            sx={{ display: "none", marginTop: "16px" }}
            className="show-when-printing"
          >
            {"https://tipster-prime.vercel.app/"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ModalButton
            onClick={handlePrint}
            className="hide-when-printing"
            autoFocus
          >
            Print Notification QR Code
          </ModalButton>
          <ModalButton onClick={handleClose} className="hide-when-printing">
            Close
          </ModalButton>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default MainContainer;
