import React from "react";
import { Button as ButtonElement } from "./Button.styles";

interface PropsButton {
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export default function Button({
  title,
  onClick,
  type = "submit",
}: PropsButton) {
  return (
    <ButtonElement onClick={onClick} type={type}>
      {title}
    </ButtonElement>
  );
}
