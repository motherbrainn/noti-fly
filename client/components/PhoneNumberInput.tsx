import { ChangeEvent, FormEvent, useState } from "react";
import { sendConfirmationTextMessage as sendTextConfirmation } from "../service/httpRequests";

const PhoneNumberInput = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const phoneNumberWithCountryCode = `+1${phoneNumberInput}`;
    sendTextConfirmation(phoneNumberWithCountryCode);
    setPhoneNumberInput("");
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberInput(e.target.value);
  };

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="phone">
          Enter phone number with area code and no spaces:
        </label>
        <input
          type="text"
          id="phone-number"
          value={phoneNumberInput}
          maxLength={10}
          onChange={(e) => changeHandler(e)}
        />
      </form>
    </div>
  );
};

export default PhoneNumberInput;
