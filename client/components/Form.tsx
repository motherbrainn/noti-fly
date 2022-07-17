import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  setKey: Dispatch<SetStateAction<string>>;
  setPrompt: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const CssTextField = styled(TextField)({
  // "& label.Mui-focused": {
  //   color: "green",
  // },
  // "& .MuiInput-underline:after": {
  //   borderBottomColor: "green",
  // },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#8D8A90",
    },
    // "&:hover fieldset": {
    //   borderColor: "#03DAC5",
    // },
    // "&.Mui-focused fieldset": {
    //   borderColor: "#03DAC5",
    // },
  },
});

const Form = ({ setKey, setPrompt, setIsLoading }: FormPropsType) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<
    E164Number | undefined
  >("");
  const [notificationNameInput, setNotificationIdInput] = useState("");
  const [qrCodePromptInput, setQrCodePromptInput] = useState("");
  const [qrCodeNotificationInput, setQrCodeNotificationInput] = useState("");
  const [allowMemoInput, setAllowMemoInput] = useState(false);

  const [validations, setValidations] = useState({
    invalidPhoneNumber: false,
    invalidName: false,
    invalidPrompt: false,
    invalidNotification: false,
  });

  const [allowSumbit, setAllowSubmit] = useState(false);

  useEffect(() => {
    if (
      notificationNameInput.length > 0 &&
      qrCodePromptInput.length > 0 &&
      qrCodeNotificationInput.length > 0 &&
      phoneNumberInput &&
      phoneNumberInput.length > 0
    ) {
      setAllowSubmit(true);
    } else setAllowSubmit(false);
  }, [
    notificationNameInput.length,
    phoneNumberInput,
    qrCodeNotificationInput,
    qrCodePromptInput,
  ]);

  const submitHandler = async () => {
    //guard againsts undefined phoneNumberInput
    if (phoneNumberInput === undefined) {
      return;
    }
    //show error if not valid phone number
    if (isValidPhoneNumber(phoneNumberInput) !== true) {
      setValidations((prevState) => ({
        ...prevState,
        invalidPhoneNumber: true,
      }));
      return;
    }

    const qrCodeName = sanitizer(notificationNameInput);
    const qrCodePrompt = sanitizer(qrCodePromptInput);
    const qrCodeNotificationPrompt = sanitizer(qrCodeNotificationInput);
    const qrCodeAllowMemoInput = allowMemoInput;
    const qrCodePhoneNumber = sanitizer(phoneNumberInput);

    if (
      qrCodeName.length === 0 ||
      qrCodePrompt.length === 0 ||
      qrCodeNotificationPrompt.length === 0
    ) {
      qrCodeName.length === 0 &&
        setValidations((prevState) => ({ ...prevState, invalidName: true }));
      qrCodePrompt.length === 0 &&
        setValidations((prevState) => ({ ...prevState, invalidPrompt: true }));
      qrCodeNotificationPrompt.length === 0 &&
        setValidations((prevState) => ({
          ...prevState,
          invalidNotification: true,
        }));
      return;
    }
    setIsLoading(true);
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
        //probably should set prompt with return from createNewQrCodeRecord for consistency.. not sure if I care enough to change the return though
        setPrompt(qrCodePrompt);
        if (res.data.createNewRecord.key.length > 0) {
          sendTextConfirmation(qrCodePhoneNumber);

          //clear prompts
          setPhoneNumberInput("");
          setNotificationIdInput("");
          setQrCodePromptInput("");
          setQrCodeNotificationInput("");
          setAllowMemoInput(false);

          setIsLoading(false);
        }
      })
    );
  };

  const invalidPhoneNumber = (
    <Alert severity="error">Enter valid 10 digit phone number.</Alert>
  );
  const invalidName = <Alert severity="error">Enter valid name.</Alert>;
  const invalidPrompt = (
    <Alert severity="error">Enter valid notification prompt.</Alert>
  );
  const invalidNotification = (
    <Alert severity="error">Enter valid notification message.</Alert>
  );

  const phoneNumberChangeHandler = (e: E164Number | undefined) => {
    if (validations.invalidPhoneNumber === true) {
      setValidations((prevState) => ({
        ...prevState,
        invalidPhoneNumber: false,
      }));
    }
    setPhoneNumberInput(e);
  };

  const qrCodeNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (validations.invalidName === true) {
      setValidations((prevState) => ({
        ...prevState,
        invalidName: false,
      }));
    }
    setNotificationIdInput(e.target.value);
  };

  const qrCodePromptChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (validations.invalidPrompt === true) {
      setValidations((prevState) => ({
        ...prevState,
        invalidPrompt: false,
      }));
    }
    setQrCodePromptInput(e.target.value);
  };

  const qrCodeNotificationChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (validations.invalidNotification === true) {
      setValidations((prevState) => ({
        ...prevState,
        invalidNotification: false,
      }));
    }
    setQrCodeNotificationInput(e.target.value);
  };

  const allowMemoInputChangeHandler = () => {
    setAllowMemoInput(!allowMemoInput);
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Tooltip title={"Number that will be notified when QR Code is scanned."}>
        <Input
          maxLength="14"
          placeholder="Phone Number"
          value={phoneNumberInput}
          onChange={phoneNumberChangeHandler}
          country="US"
          className="phone-input"
          autoComplete="off"
        />
      </Tooltip>
      <Collapse in={validations.invalidPhoneNumber}>
        {invalidPhoneNumber}
      </Collapse>
      <Tooltip title={"This is used to differentiate QR Codes."}>
        <CssTextField
          autoComplete="off"
          fullWidth
          margin="normal"
          id="qr-code-name"
          label="QR Code Name"
          value={notificationNameInput}
          onChange={qrCodeNameChangeHandler}
        />
      </Tooltip>
      <Collapse in={validations.invalidName}>{invalidName}</Collapse>
      <Tooltip title={"The message shown when QR Code is scanned."}>
        <CssTextField
          autoComplete="off"
          fullWidth
          multiline
          margin="normal"
          id="qr-code-prompt"
          label="User Prompt"
          value={qrCodePromptInput}
          onChange={qrCodePromptChangeHandler}
        />
      </Tooltip>
      <Collapse in={validations.invalidPrompt}>{invalidPrompt}</Collapse>
      <Tooltip
        title={
          "This message is sent to the phone number when QR Code is scanned."
        }
      >
        <CssTextField
          autoComplete="off"
          fullWidth
          multiline
          margin="normal"
          id="qr-code-notification-content"
          label="Notification Message"
          value={qrCodeNotificationInput}
          onChange={qrCodeNotificationChangeHandler}
        />
      </Tooltip>
      <Collapse in={validations.invalidNotification}>
        {invalidNotification}
      </Collapse>
      <Tooltip
        title={
          "When checked, users will be able to include custom text message with notification."
        }
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={allowMemoInput}
              onChange={allowMemoInputChangeHandler}
              inputProps={{ id: "allow-memo" }}
            />
          }
          label="Allow Notification Memo"
        />
      </Tooltip>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <Button
          size="large"
          disabled={!allowSumbit}
          variant="contained"
          onClick={submitHandler}
          sx={{ marginBottom: "10px" }}
        >
          ADD RECORD
        </Button>
      </div>
    </div>
  );
};

export default Form;
