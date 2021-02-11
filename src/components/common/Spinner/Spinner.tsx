import React from "react";
import { Spinner as SpinnerElement, Point } from "./Spinner.styles";

export default function Spinner() {
  return (
    <SpinnerElement>
      <Point />
      <Point />
      <Point />
      <Point />
    </SpinnerElement>
  );
}
