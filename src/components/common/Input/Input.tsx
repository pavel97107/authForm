import React from "react";
import { FormGroup, Input as InputElement, Line } from "./Input.styles";

interface InputProps {
  type: string;
  name: string;
  autoComplete: string;
  placeholder: string;
  id: string;
  validate: (value: string) => string | undefined;
  propError: string | undefined;
  disabled: boolean;
}

export default function Input({
  type,
  name,
  autoComplete,
  placeholder,
  id,
  validate,
  propError,
  disabled,
  ...rest
}: InputProps) {
  return (
    <FormGroup>
      <InputElement
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        autoComplete={autoComplete}
        validate={validate}
        placeholder={placeholder}
        {...rest}
      />
      <Line className={`line`} vError={propError} />
    </FormGroup>
  );
}
