import React from "react";
import {
  FormGroup,
  IconEmail,
  Input,
  Label,
  Line,
  IconPassword,
} from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface InputProps {
  type: string;
  name: string;
  autoComplete: string;
  placeholder: string;
  id: string;
  validate: (value: string) => string | undefined;
  propError: string | undefined;
}

export default ({
  type,
  name,
  autoComplete,
  placeholder,
  id,
  validate,
  propError,
}: InputProps) => {
  const loading = useSelector<RootState>((state) => state.user.loading);
  return (
    <FormGroup>
      <Label htmlFor={id}>
        {type === "email" && <IconEmail />}
        {type === "password" && <IconPassword />}
      </Label>
      <Input
        id={id}
        name={name}
        disabled={loading}
        autoComplete={autoComplete}
        validate={validate}
        placeholder={placeholder}
      />
      <Line
        className={`line`}
        vError={typeof propError === "string" ? propError : undefined}
      />
    </FormGroup>
  );
};
