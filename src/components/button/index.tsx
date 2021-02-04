import React from "react";
import { Loading } from "../index";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "./styles";

interface PropsButton {
  title: string;
  handleClick?: () => void;
}

export default ({ title, handleClick }: PropsButton) => {
  const isLoading = useSelector<RootState>((state) => state.user.isLoading);

  if (handleClick && typeof handleClick === "function") {
    return (
      <Button onClick={handleClick} type="button">
        {title}
      </Button>
    );
  } else {
    return (
      <>{isLoading ? <Loading /> : <Button type="submit">{title}</Button>}</>
    );
  }
};
