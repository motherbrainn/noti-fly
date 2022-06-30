import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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

  const submitHandler = async () => {
    const phoneNumberWithCountryCode = `+1${phoneNumberInput}`;
    const qrCodeName = notificationIdInput;
    const qrCodePrompt = qrCodePromptInput;

    //remove inactivated records for phone number before creating a new one
    //create new QR code record in db, then send text confirmation
    removeInactiveRecordsForPhoneNumber(phoneNumberWithCountryCode).then(() =>
      createNewQrCodeRecord(
        phoneNumberWithCountryCode,
        qrCodeName,
        qrCodePrompt
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
  };

  return (
    <div>
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setPhoneNumberInput(e.target.value)
        }
        value={phoneNumberInput}
        id={"phone-number"}
        inputLabel={"Phone Number"}
        maxLength={10}
      />
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setNotificationIdInput(e.target.value)
        }
        value={notificationIdInput}
        id={"qr-code-name"}
        inputLabel={"QR Code Name"}
        maxLength={30}
      />
      <Input
        changeHandler={(e: ChangeEvent<HTMLInputElement>) =>
          setQrCodePromptInput(e.target.value)
        }
        value={qrCodePromptInput}
        id={"qr-code-name"}
        inputLabel={"QR Code Prompt"}
        maxLength={30}
      />
      <button onClick={submitHandler}>add record</button>
    </div>
  );
};

export default Form;
