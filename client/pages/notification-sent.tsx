import { Dialog, DialogTitle } from "@mui/material";
import styles from "../styles/Home.module.css";

const NotificationSent = () => {
  return (
    <div className={styles.container}>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { backgroundColor: "aliceblue" } }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Notification successfully sent"}
        </DialogTitle>
      </Dialog>
    </div>
  );
};
export default NotificationSent;
