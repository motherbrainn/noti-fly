import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Head from "next/head";
import router from "next/router";
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
        PaperProps={{ sx: { backgroundColor: "aliceblue" } }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ margin: "auto" }}>
          {"Notification successfully sent"}
        </DialogTitle>
        <DialogContent>
          <Button onClick={handleClick}>
            Create your own notification QR Code
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default NotificationSent;
