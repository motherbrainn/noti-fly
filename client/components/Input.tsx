import { ChangeEvent, FormEvent } from "react";

interface InputInterface {
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  inputLabel: string;
  maxLength: number;
}

const Input = ({
  changeHandler,
  value,
  id,
  inputLabel,
  maxLength,
}: InputInterface) => {
  return (
    <div>
      <label>{inputLabel}</label>
      <input
        type="text"
        id={id}
        value={value}
        maxLength={maxLength}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

export default Input;
