import { Alert, Checkbox, Collapse, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import {
  createNewQrCodeRecord,
  removeInactiveRecordsForPhoneNumber,
} from "../service/httpRequests";
import { sendConfirmationTextMessage as sendTextConfirmation } from "../service/httpRequests";
import { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Input from "react-phone-number-input/input";
import { E164Number } from "libphonenumber-js/core";
import DOMPurify from "dompurify";

const sanitizer = DOMPurify.sanitize;

interface FormPropsType {
  setKey: Dispatch<SetStateAction<undefined>>;
}

const Form = ({ setKey }: FormPropsType) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<
    E164Number | undefined
  >("");
  const [notificationNameInput, setNotificationIdInput] = useState("");
  const [qrCodePromptInput, setQrCodePromptInput] = useState("");
  const [qrCodeNotificationInput, setQrCodeNotificationInput] = useState("");
  const [allowMemoInput, setAllowMemoInput] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const submitHandler = async () => {
    //guard againsts undefined phoneNumberInput
    if (phoneNumberInput === undefined) {
      return;
    }
    //show error if not valid phone number
    if (isValidPhoneNumber(phoneNumberInput) !== true) {
      setErrorState(true);
      return;
    }

    const qrCodeName = sanitizer(notificationNameInput);
    const qrCodePrompt = sanitizer(qrCodePromptInput);
    const qrCodeNotificationPrompt = sanitizer(qrCodeNotificationInput);
    const qrCodeAllowMemoInput = allowMemoInput;
    const qrCodePhoneNumber = sanitizer(phoneNumberInput);

    //remove inactivated records for phone number before creating a new one
    //create new QR code record in db, then send text confirmation
    removeInactiveRecordsForPhoneNumber(qrCodePhoneNumber).then(() =>
      createNewQrCodeRecord(
        qrCodePhoneNumber,
        qrCodeName,
        qrCodePrompt,
        qrCodeNotificationPrompt,
        qrCodeAllowMemoInput
      ).then((res) => {
        setKey(res.data.createNewRecord.key);
        if (res.data.createNewRecord.key.length > 0) {
          sendTextConfirmation(qrCodePhoneNumber);
        }
      })
    );

    //clear prompts
    setPhoneNumberInput("");
    setNotificationIdInput("");
    setQrCodePromptInput("");
    setQrCodeNotificationInput("");
    setAllowMemoInput(false);
  };

  const errorAlert = (
    <Alert severity="error">Enter valid 10 digit phone number. </Alert>
  );

  const phoneNumberChangeHandler = (e: E164Number | undefined) => {
    if (errorState === true) {
      setErrorState(false);
    }
    setPhoneNumberInput(e);
  };

  const qrCodeNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNotificationIdInput(e.target.value);
  };

  const qrCodePromptChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQrCodePromptInput(e.target.value);
  };

  const qrCodeNotificationChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setQrCodeNotificationInput(e.target.value);
  };

  const allowMemoInputChangeHandler = () => {
    setAllowMemoInput(!allowMemoInput);
  };

  return (
    <div>
      <Input
        maxLength="14"
        placeholder="Phone number to send notifications"
        value={phoneNumberInput}
        onChange={phoneNumberChangeHandler}
        country="US"
      />
      <Collapse in={errorState}>{errorAlert}</Collapse>
      <TextField
        id="qr-code-name"
        label="Name for this notification record.. this is just for you"
        value={notificationNameInput}
        onChange={qrCodeNameChangeHandler}
      />
      <TextField
        id="qr-code-prompt"
        label="What should users see when they scan your QR code?"
        value={qrCodePromptInput}
        onChange={qrCodePromptChangeHandler}
      />
      <TextField
        id="qr-code-notification-content"
        label="Notification message you will receive when a user scans your QR code"
        value={qrCodeNotificationInput}
        onChange={qrCodeNotificationChangeHandler}
      />
      <Checkbox
        checked={allowMemoInput}
        onChange={allowMemoInputChangeHandler}
        inputProps={{ id: "allow-memo" }}
      />
      <button onClick={submitHandler}>add record</button>
    </div>
  );
};

export default Form;
