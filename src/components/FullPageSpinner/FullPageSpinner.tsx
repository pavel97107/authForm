import React from "react";
import { FullPageWrapper, Spinner, Point } from "./FullPageSpinner.styles";

export default function FullPageSpinner() {
  return (
    <FullPageWrapper>
      <Spinner>
        <Point />
        <Point />
        <Point />
        <Point />
      </Spinner>
    </FullPageWrapper>
  );
}
