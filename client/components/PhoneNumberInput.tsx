import { ChangeEvent, FormEvent, useState } from "react";

const PhoneNumberInput = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(phoneNumberInput);
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
