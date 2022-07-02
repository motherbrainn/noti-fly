import { ChangeEvent, FormEvent } from "react";

interface InputInterface {
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value?: string;
  checked?: boolean;
  id: string;
  inputLabel: string;
  maxLength?: number;
}

const Input = ({
  changeHandler,
  type,
  value,
  checked,
  id,
  inputLabel,
  maxLength,
}: InputInterface) => {
  return (
    <div>
      <label>{inputLabel}</label>
      <input
        type={type}
        id={id}
        value={value}
        checked={checked}
        maxLength={maxLength}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

export default Input;
