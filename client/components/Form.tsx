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
import Input from "./Input";

interface FormPropsType {
  setKey: Dispatch<SetStateAction<undefined>>;
}

const Form = ({ setKey }: FormPropsType) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [notificationIdInput, setNotificationIdInput] = useState("");
  const [qrCodePromptInput, setQrCodePromptInput] = useState("");
  const [qrCodeNotificationInput, setQrCodeNotificationInput] = useState("");
  const [allowMemoInput, setAllowMemoInput] = useState(false);

  const submitHandler = async () => {
    const phoneNumberWithCountryCode = `+1${phoneNumberInput}`;
    const qrCodeName = notificationIdInput;
    const qrCodePrompt = qrCodePromptInput;
    const qrCodeNotificationPrompt = qrCodeNotificationInput;
    const qrCodeAllowMemoInput = allowMemoInput;

    //remove inactivated records for phone number before creating a new one
    //create new QR code record in db, then send text confirmation
    removeInactiveRecordsForPhoneNumber(phoneNumberWithCountryCode).then(() =>
      createNewQrCodeRecord(
        phoneNumberWithCountryCode,
        qrCodeName,
        qrCodePrompt,
        qrCodeNotificationPrompt,
        qrCodeAllowMemoInput
      ).then((res) => {
        setKey(res.data.createNewRecord.key);
        if (res.data.createNewRecord.key.length > 0) {
          sendTextConfirmation(phoneNumberWithCountryCode);
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

  return (
    <div>
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setPhoneNumberInput(e.target.value)
        }
        type="text"
        value={phoneNumberInput}
        id={"phone-number"}
        inputLabel={"Phone Number"}
        maxLength={10}
      />
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setNotificationIdInput(e.target.value)
        }
        type="text"
        value={notificationIdInput}
        id={"qr-code-name"}
        inputLabel={"QR Code Name"}
        maxLength={30}
      />
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setQrCodePromptInput(e.target.value)
        }
        type="text"
        value={qrCodePromptInput}
        id={"qr-code-prompt"}
        inputLabel={"QR Code Prompt"}
        maxLength={60}
      />
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setQrCodeNotificationInput(e.target.value)
        }
        type="text"
        value={qrCodeNotificationInput}
        id={"qr-code-notification-content"}
        inputLabel={"QR Code Notification Content"}
        maxLength={300}
      />
      <Input
        changeHandler={() => {
          setAllowMemoInput(!allowMemoInput);
        }}
        type="checkbox"
        checked={allowMemoInput}
        id={"qr-code-notification-content"}
        inputLabel={"Allow memo to be sent with notification?"}
      />
      <button onClick={submitHandler}>add record</button>
    </div>
  );
};

export default Form;
