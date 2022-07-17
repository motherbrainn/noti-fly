import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Head from "next/head";
import router from "next/router";
import { ModalButton } from "../common";
import styles from "../styles/Home.module.css";

const handleClick = () => {
  router.push("/");
};

const NotificationSent = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tipster</title>
        <meta name="description" content="Tipster App" />
      </Head>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { backgroundColor: "#1F1F1F" } }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ margin: "auto" }}>
          {"Notification successfully sent"}
        </DialogTitle>
        <DialogContent>
          <ModalButton onClick={handleClick} autoFocus>
            Create your own notification QR Code
          </ModalButton>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default NotificationSent;
